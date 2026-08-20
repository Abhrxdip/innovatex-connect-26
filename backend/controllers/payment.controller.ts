import { InferSchemaType, ObjectId } from "mongoose";
import { Payment } from "../models/payment";
import { PAYMENT_STATUSES, ROLES, TICKET_STATUS } from "../config/constants";
import Ticket from "../models/Ticket";
import { generateQRCodeDataURL } from "../services/qr.service";
import { sendTicketConfirmedMail } from "../services/mail.service";
import Notification from "../models/Notification";
import Referral from "../models/Referral";

async function findPaymentByOrderId(order_id: string) {
    const payment = await Payment.findOne({ order_id: order_id }).lean()
    if (!payment) {
        const error = new PaymentNotFoundError()
        throw error
    }
    return payment
}

export async function updatePaymentAndUpdateTicket(event: "order.paid" | "payment.failed", payload: PaymentCallbackData) {
    console.error("Payment: " + payload.payment)
    if (!payload.payment.entity) {
        return
    }

    try {
        const payment = await findPaymentByOrderId(payload.payment.entity.order_id)
        if (event === "order.paid") {
            await Payment.findOneAndUpdate(payment._id, {
                $set: {
                    amount: payload.payment.entity.amount,
                    completed_at: new Date(payload.payment.entity.created_at),
                    payload: payload,
                    status: PAYMENT_STATUSES.SUCCESS,
                    payment_method: payload.payment.entity.method,
                    updatedAt: new Date(),
                }
            })
        } else {
            if (payment.status !== PAYMENT_STATUSES.SUCCESS || payment.status !== PAYMENT_STATUSES.FAILED) {
                await Payment.findOneAndUpdate(payment._id, {
                    $set: {
                        amount: payload.payment.entity.amount,
                        completed_at: new Date(payload.payment.entity.created_at),
                        payload: payload,
                        status: PAYMENT_STATUSES.FAILED,
                        payment_method: payload.payment.entity.method,
                        updatedAt: new Date(),
                    }
                })
                const ticket = await Ticket.findById(payment.ticketId).populate<{ userId: PopulatedUser }>("userId", "name email college company role phone github linkedin foodPreference bringingLaptop")
                if (!ticket) {
                    throw new TicketNotFoundError()
                }

                //TODO: Implement in payment callback this generateQR
                const qrCodeDataUrl = await generateQRCodeDataURL(ticket.ticketNumber);
                await Ticket.findByIdAndUpdate(payment.ticketId, { $set: { status: TICKET_STATUS.APPROVED, qrCode: qrCodeDataUrl } })
                await Referral.findOneAndUpdate({
                    referredUser: ticket.userId._id
                }, {
                    status: TICKET_STATUS.PAYMENT_REQUIRED
                });
                await Notification.create({
                    userId: ticket.userId._id,
                    title: "Ticket Approved 🎉",
                    message: `Your event ticket (${ticket.ticketNumber}) has been approved! Check your dashboard for your QR code.`,
                });

                await sendTicketConfirmedMail({
                    name: ticket.userId.name,
                    attendee_type: ticket.userId.role,
                    email: ticket.userId.email,
                    organization: (ticket.userId.role === ROLES.STUDENT || ticket.userId.role === ROLES.WORKING_PROFESSIONAL ? ticket.userId.college : ticket.userId.role === "Community Partner" ? ticket.userId.name! : ticket.userId.company) ?? ticket.userId.college!,
                    qr_code: qrCodeDataUrl.split(',')[1],
                    ticket_number: ticket.ticketNumber,
                    foodPreference: ticket.userId.foodPreference,
                })
            }
        }
    } catch (e) {
        console.error(payload.payment.entity)
        if (e instanceof PaymentNotFoundError) {
            const error = Error("This Payment doesn't exist, please contact the organizers for this issue") as Error & { statusCode: number }
            error.statusCode = 500
            throw error
        }
        if (e instanceof TicketNotFoundError) {
            const error = new Error("This Ticket doesn't exist, please contact the organizers for this issue") as Error & { statusCode: number }
            error.statusCode = 500
            throw error
        }
        await Payment.create({ amount: payload.payment.entity.amount, completed_at: new Date(payload.payment.entity.created_at), order_id: payload.payment.entity.order_id ?? 'Not Found', payload: payload })
        return e
    }


}

class PaymentNotFoundError extends Error { }
class TicketNotFoundError extends Error { }

type PopulatedUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
    college?: string;
    company?: string;
    foodPreference: string;
};
export type PaymentCallbackData = { payment: { entity: { order_id: string, amount: number, currency: string, method: string, created_at: number } } }
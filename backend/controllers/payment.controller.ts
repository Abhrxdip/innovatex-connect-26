import { InferSchemaType, ObjectId } from "mongoose";
import { Payment } from "../models/payment";
import { PAYMENT_STATUSES, TICKET_STATUS } from "../config/constants";
import Ticket from "../models/Ticket";
import { generateQRCodeDataURL } from "../services/qr.service";

async function findPaymentByOrderId(order_id: string) {
    const payment = await Payment.findOne({ order_id: order_id }).lean()
    if (!payment) {
        const error = new Error("This Payment doesn't exist, please contact the organizers for this issue") as Error & { statusCode: number }
        error.statusCode = 500
        throw error
    }
    return payment
}

export async function updatePaymentAndUpdateTicket(event: "SUCCESS" | "FAILED", payload: PaymentCallbackData) {
    try {
        const payment = await findPaymentByOrderId(payload.payment.entity.order_id)
        if (event === "SUCCESS") {
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
            if (payment.status !== "SUCCESS") {
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
                const ticket = await Ticket.findById(payment.ticketId)
                if (!ticket) {
                    const error = new Error("This Ticket doesn't exist, please contact the organizers for this issue") as Error & { statusCode: number }
                    error.statusCode = 500
                    throw error
                }

                //TODO: Implement in payment callback this generateQR
                const qrCodeDataUrl = await generateQRCodeDataURL(ticket.ticketNumber);
                await Ticket.findByIdAndUpdate(payment._id, { $set: { status: TICKET_STATUS.APPROVED, qrCode: qrCodeDataUrl } })
            }
        }
    } catch (e) {
        await Payment.create({ amount: payload.payment.entity.amount, completed_at: new Date(payload.payment.entity.created_at), order_id: payload.payment.entity.order_id ?? 'Not Found', payload: payload })
        return e
    }


}

export type PaymentCallbackData = { payment: { entity: { order_id: string, amount: number, currency: string, method: string, created_at: number } } }
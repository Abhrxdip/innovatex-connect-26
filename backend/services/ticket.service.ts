import Ticket from "../models/Ticket";
import User from "../models/User";
import Notification from "../models/Notification";
import {
  PAYMENT_STATUSES,
  TICKET_STATUS,
  TWENTY_FOUR_HOURS_IN_MS
} from "../config/constants.js";
import { number } from "zod/v4";
import { RazorPayApi } from "../config/payment_config";
import { InferSchemaType, Model, ObjectId } from "mongoose";
import { Orders } from "razorpay/dist/types/orders";
import Payment from "../models/payment"

export async function requestTicketService({
  userId,
  attendeeType
}: {
  userId: string,
  attendeeType: string,
}) {
  const existingTicket = await Ticket.findOne({
    userId
  });
  if (existingTicket) {
    const error = new Error("You have already submitted a ticket request") as Error & { statusCode: number };
    error.statusCode = 400;
    throw error;
  }


  const randomCode = Math.floor(100000 + Math.random() * 900000);
  let ticketNumber = `TICK-${randomCode}`;
  while (true) {
    if (!(await Ticket.findOne({
      ticketNumber: ticketNumber
    }))) {
      ticketNumber = `TICK-${Math.floor(100000 + Math.random() * 900000)}`
      break;
    }
  }


  const ticket = await Ticket.create({
    userId,
    ticketNumber,
    status: TICKET_STATUS.PENDING,
    attendeeType,
  });

  await Notification.create({
    userId,
    title: "Ticket Requested",
    message: `Your ticket (${ticketNumber}) has been requested and is pending admin approval.`,
  });

  return ticket;
}

export async function getUserTicketService(userId: string) {
  let ticket = await Ticket.findOne({
    userId
  }).populate("userId", "name email role avatar");
  if (!ticket) {
    return ticket
  }
  if (ticket.status === TICKET_STATUS.PAYMENT_REQUIRED && hasExceed24Hours(ticket?.approvedAt)) {
    ticket = await Ticket.findByIdAndUpdate(ticket?._id, { $set: { status: TICKET_STATUS.INVITATION_EXPIRED } })
  }
  return ticket
}


const ticketPriceInINR = (Number(process.env.TICKET_PRICE_IN_INR) || 100) * 100

export async function createOrderService(user: Omit<InferSchemaType<typeof User.schema> & { _id: ObjectId }, "password">): Promise<Orders.RazorpayOrder> {
  const existingTicket = await Ticket.findOne({
    userId: String(user._id)
  })

  if (!existingTicket) {
    const error = Error("Ticket not found, did you request a ticket") as Error & { statusCode: number }
    error.statusCode = 404
    throw error
  }

  if (existingTicket.status != TICKET_STATUS.PAYMENT_REQUIRED) {
    const error = Error(`Your ticket is in ${existingTicket.status} status`) as Error & { statusCode: number }
    error.statusCode = 400
    throw error
  }

  if (hasExceed24Hours(existingTicket.approvedAt)) {
    const error = Error(`Invitation expired as 24 hours exceeded`) as Error & { statusCode: number }
    error.statusCode = 401
    throw error
  }

  // const paymentLink = await RazorPayApi.paymentLink.create({
  //   amount: ticketPriceInINR,
  //   currency: "INR",
  //   accept_partial: false,
  //   customer: {
  //     contact: `+91${user.phone}`,
  //     email: user.email,
  //     name: user.name,
  //   },

  //   notes: {
  //     ticket_id: existingTicket.id!,
  //   },
  //   //TODO: Navigate to payment page
  //   callback_url: process.env.NODE_ENV === "production" ? new URL("/dashboard", process.env.SITE_URL).toString() : "http://localhost:3000/dashboard",
  //   callback_method: "get",
  // })

  const order = await RazorPayApi.orders.create({
    amount: ticketPriceInINR,
    currency: "INR",
    receipt: `ticket_${String(existingTicket.ticketNumber)}`,
  })

  await Payment.create({ ticketId: existingTicket._id, initiated_at: new Date(), status: PAYMENT_STATUSES.PENDING, order_id: order.id })

  return order
}

export function hasExceed24Hours(time: Date | undefined | null) {
  return (new Date()).getTime() - (time || new Date()).getTime() > TWENTY_FOUR_HOURS_IN_MS
}
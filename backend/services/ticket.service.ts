import Ticket from "../models/Ticket";
import User from "../models/User";
import Notification from "../models/Notification";
import {
  TICKET_STATUS,
  TWENTY_FOUR_HOURS_IN_MS
} from "../config/constants.js";
import { number } from "zod/v4";
import { RazorPayApi } from "../config/payment_config";
import { InferSchemaType, Model, ObjectId } from "mongoose";

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
  return await Ticket.findOne({
    userId
  }).populate("userId", "name email role avatar");
}


const ticketPriceInINR = (Number(process.env.TICKET_PRICE_IN_INR) || 100) * 100

export async function generatePaymentLinkService(user: Omit<InferSchemaType<typeof User.schema> & { _id: ObjectId }, "password">) {
  try {
    console.log(String(user._id))
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
    const hasExceed24Hours = (new Date()).getTime() - (existingTicket.approvedAt ?? new Date()).getTime() > TWENTY_FOUR_HOURS_IN_MS

    if (hasExceed24Hours) {
      const error = Error(`Invitation expired as 24 hours exceeded`) as Error & { statusCode: number }
      error.statusCode = 400
      throw error
    }

    const paymentLink = await RazorPayApi.paymentLink.create({
      amount: ticketPriceInINR,
      currency: "INR",
      accept_partial: false,
      customer: {
        contact: user.phone,
        email: user.email,
        name: user.name,
      },
      notes: {
        ticket_id: existingTicket.id!,
      },
      notify: {
        email: true
      },
      //TODO: Navigate to payment page
      callback_url: process.env.NODE_ENV === "production" ? new URL("/dashboard", process.env.SITE_URL).toString() : "http://localhost:3000/dashboard",
      callback_method: "get",
    })
    return paymentLink.short_url
  } catch (e) {
    return e
  }
}
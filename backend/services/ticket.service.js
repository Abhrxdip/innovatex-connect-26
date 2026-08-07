import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import {
  TICKET_STATUS
} from "../config/constants.js";

export async function bookTicketService({
  userId,
  attendeeType
}) {
  const existingTicket = await Ticket.findOne({
    userId
  });
  if (existingTicket) {
    const error = new Error("You have already submitted a ticket request");
    error.statusCode = 400;
    throw error;
  }


  const randomCode = Math.floor(100000 + Math.random() * 900000);
  const ticketNumber = `TICK-${randomCode}`;

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

export async function getUserTicketService(userId) {
  return await Ticket.findOne({
    userId
  }).populate("userId", "name email role avatar");
}
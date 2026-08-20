import Ticket from "../models/Ticket";
import Attendance from "../models/Attendance";
import FoodScan from "../models/FoodScan";
import Notification from "../models/Notification";
import { TICKET_STATUS } from "../config/constants.js";

export async function scanGateAttendance({ ticketNumber, adminId, gate = "Main Gate" }) {
  const ticket = await Ticket.findOne({ ticketNumber }).populate("userId", "name email");
  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  if (ticket.status !== TICKET_STATUS.APPROVED) {
    const error = new Error(`Ticket is not approved. Current status: ${ticket.status}`);
    error.statusCode = 400;
    throw error;
  }

  if (ticket.checkedIn) {
    const error = new Error("Attendee has already checked in");
    error.statusCode = 400;
    throw error;
  }

  ticket.checkedIn = true;
  await ticket.save();

  const attendance = await Attendance.create({
    userId: ticket.userId._id,
    adminId,
    gate,
    scanTime: new Date(),
  });

  await Notification.create({
    userId: ticket.userId._id,
    title: "Event Check-in Complete",
    message: `Welcome to InnovateX Connect '26! Your check-in was recorded at ${gate}.`,
  });

  return { ticket, attendance };
}

export async function scanFoodCollection({ ticketNumber, adminId, counter = "Food Counter 1" }) {
  const ticket = await Ticket.findOne({ ticketNumber }).populate("userId", "name email");
  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  if (ticket.status !== TICKET_STATUS.APPROVED) {
    const error = new Error(`Ticket is not approved. Current status: ${ticket.status}`);
    error.statusCode = 400;
    throw error;
  }

  if (ticket.foodCollected) {
    const error = new Error("Food coupon has already been claimed for this ticket");
    error.statusCode = 400;
    throw error;
  }

  ticket.foodCollected = true;
  await ticket.save();

  const foodScan = await FoodScan.create({
    userId: ticket.userId._id,
    adminId,
    counter,
    scanTime: new Date(),
  });

  await Notification.create({
    userId: ticket.userId._id,
    title: "Food Coupon Redeemed",
    message: `Your food coupon was successfully scanned at ${counter}. Enjoy your meal!`,
  });

  return { ticket, foodScan };
}

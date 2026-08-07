import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import Referral from "../models/Referral.js";
import Notification from "../models/Notification.js";
import { TICKET_STATUS } from "../config/constants.js";
import { generateQRCodeDataURL } from "../services/qr.service.js";

export async function getAdminDashboardController() {
  const totalUsers = await User.countDocuments();
  const totalTickets = await Ticket.countDocuments();
  const pendingTickets = await Ticket.countDocuments({ status: TICKET_STATUS.PENDING });
  const approvedTickets = await Ticket.countDocuments({ status: TICKET_STATUS.APPROVED });
  const rejectedTickets = await Ticket.countDocuments({ status: TICKET_STATUS.REJECTED });
  const checkedInCount = await Ticket.countDocuments({ checkedIn: true });
  const foodCollectedCount = await Ticket.countDocuments({ foodCollected: true });

  return {
    analytics: {
      totalUsers,
      totalTickets,
      pendingTickets,
      approvedTickets,
      rejectedTickets,
      checkedInCount,
      foodCollectedCount,
    },
  };
}

export async function listTicketsController(status) {
  const query = status ? { status } : {};
  return await Ticket.find(query).populate("userId", "name email college company role phone").sort({ createdAt: -1 });
}

export async function approveTicketController(ticketId, adminId) {
  const ticket = await Ticket.findById(ticketId).populate("userId");
  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  const qrPayload = {
    ticketNumber: ticket.ticketNumber,
    userId: ticket.userId._id,
  };
  const qrCodeDataUrl = await generateQRCodeDataURL(qrPayload);

  ticket.status = TICKET_STATUS.APPROVED;
  ticket.qrCode = qrCodeDataUrl;
  ticket.approvedBy = adminId;
  ticket.approvedAt = new Date();
  await ticket.save();

  await Referral.findOneAndUpdate(
    { referredUser: ticket.userId._id },
    { status: TICKET_STATUS.APPROVED }
  );

  await Notification.create({
    userId: ticket.userId._id,
    title: "Ticket Approved 🎉",
    message: `Your event ticket (${ticket.ticketNumber}) has been approved! Check your dashboard for your QR code.`,
  });

  const emailHtml = `
    <h2>Your Event Ticket is Ready! 🎉</h2>
    <p>Hi ${ticket.userId.name},</p>
    <p>Your ticket request for InnovateX Connect '26 has been approved.</p>
    <p><b>Ticket Number:</b> ${ticket.ticketNumber}</p>
    <img src="${qrCodeDataUrl}" alt="QR Ticket" width="200" height="200"/>
  `;

/*
  await sendEmail({
    to: ticket.userId.email,
    subject: "Ticket Approved - InnovateX Connect '26",
    html: emailHtml,
  });
*/

  return ticket;
}

export async function rejectTicketController(ticketId, adminId) {
  const ticket = await Ticket.findById(ticketId).populate("userId");
  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  ticket.status = TICKET_STATUS.REJECTED;
  ticket.approvedBy = adminId;
  ticket.approvedAt = new Date();
  await ticket.save();

  await Referral.findOneAndUpdate(
    { referredUser: ticket.userId._id },
    { status: TICKET_STATUS.REJECTED }
  );

  await Notification.create({
    userId: ticket.userId._id,
    title: "Ticket Status Update",
    message: `Your ticket request (${ticket.ticketNumber}) could not be approved at this time.`,
  });

  return ticket;
}

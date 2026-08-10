import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import Referral from "../models/Referral.js";
import Notification from "../models/Notification.js";
import {
  TICKET_STATUS
} from "../config/constants.js";
import {
  generateQRCodeDataURL
} from "../services/qr.service.js";
import {
  sendTicketConfirmedMail
} from "../services/mail.service"

export async function getAdminDashboardController() {
  const totalUsers = await User.countDocuments();
  const totalTickets = await Ticket.countDocuments();
  const pendingTickets = await Ticket.countDocuments({
    status: TICKET_STATUS.PENDING
  });
  const approvedTickets = await Ticket.countDocuments({
    status: TICKET_STATUS.APPROVED
  });
  const rejectedTickets = await Ticket.countDocuments({
    status: TICKET_STATUS.REJECTED
  });
  const checkedInCount = await Ticket.countDocuments({
    checkedIn: true
  });
  const foodCollectedCount = await Ticket.countDocuments({
    foodCollected: true
  });

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
  const query = status ? {
    status
  } : {};
  const tickets = await Ticket.find(query).populate("userId", "name email college company role phone github linkedin foodPreference bringingLaptop").populate({
    path: "referralData",
    populate: {
      path: "partnerId",
      select: "name email college company"
    }
  }).sort({
    createdAt: -1
  });
  return tickets
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

  await Referral.findOneAndUpdate({
    referredUser: ticket.userId._id
  }, {
    status: TICKET_STATUS.APPROVED
  });

  await Notification.create({
    userId: ticket.userId._id,
    title: "Ticket Approved 🎉",
    message: `Your event ticket (${ticket.ticketNumber}) has been approved! Check your dashboard for your QR code.`,
  });

  console.log(qrCodeDataUrl)

  await sendTicketConfirmedMail({
    name: ticket.userId.name,
    attendee_type: ticket.userId.role,
    email: ticket.userId.email,
    organization: ticket.userId.role === "Student" ? ticket.userId.college : ticket.userId.role === "Community Partner" ? ticket.userId.name : ticket.userId.company ?? ticket.userId.college,
    qr_code: qrCodeDataUrl.split(',')[1],
    ticket_number: ticket.ticketNumber
  })

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

  await Referral.findOneAndUpdate({
    referredUser: ticket.userId._id
  }, {
    status: TICKET_STATUS.REJECTED
  });

  await Notification.create({
    userId: ticket.userId._id,
    title: "Ticket Status Update",
    message: `Your ticket request (${ticket.ticketNumber}) could not be approved at this time.`,
  });

  return ticket;
}
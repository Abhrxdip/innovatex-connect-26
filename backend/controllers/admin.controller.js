import User from "../models/User";
import Ticket from "../models/Ticket";
import Referral from "../models/Referral";
import Notification from "../models/Notification";
import {
  TICKET_STATUS
} from "../config/constants.js";
import {
  sendPaymentMail
} from "../services/mail.service"
import {
  hasExceed24Hours
} from "../services/ticket.service";

export async function getAdminDashboardController() {
  const totalUsers = await User.countDocuments();
  const totalTickets = await Ticket.countDocuments();
  const pendingTickets = await Ticket.countDocuments({
    status: TICKET_STATUS.PENDING
  });
  const approvedTickets = await Ticket.countDocuments({
    status: TICKET_STATUS.APPROVED
  });
  const pendingPaymentTickets = await Ticket.countDocuments({
    status: TICKET_STATUS.PAYMENT_REQUIRED
  })
  const expiredTickets = await Ticket.countDocuments({
    status: TICKET_STATUS.INVITATION_EXPIRED
  })
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
      expiredTickets,
      pendingPaymentTickets,
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
      select: "name email college company foodPreference bringingLaptop"
    }
  }).sort({
    createdAt: -1
  });
  if (status === TICKET_STATUS.PAYMENT_REQUIRED) {
    const expiredTickets = tickets.filter((ticket) => {
      return hasExceed24Hours(ticket.approvedAt)
    })
    if (expiredTickets.length !== 0) {
      await Ticket.updateMany({
        _id: {
          $in: expiredTickets.map(ticket => ticket._id)
        }
      }, {
        $set: {
          status: TICKET_STATUS.INVITATION_EXPIRED
        }
      })
    }
  }
  return tickets
}

export async function approveTicketController(ticketId, adminId) {
  const ticket = await Ticket.findById(ticketId).populate("userId");
  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  ticket.status = TICKET_STATUS.PAYMENT_REQUIRED;
  ticket.approvedBy = adminId;
  ticket.approvedAt = new Date();
  await ticket.save();

  await Referral.findOneAndUpdate({
    referredUser: ticket.userId._id
  }, {
    status: TICKET_STATUS.PAYMENT_REQUIRED
  });

  await Notification.create({
    userId: ticket.userId._id,
    title: "Ticket Approved 🎉",
    message: `Your event ticket (${ticket.ticketNumber}) has been approved! Check your dashboard for next steps.`,
  });

  //TODO: Send Ticket Payment Asking mail

  await sendPaymentMail({
    email: ticket.userId.email,
    name: ticket.userId.name
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
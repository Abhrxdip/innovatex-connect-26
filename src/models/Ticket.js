import mongoose from "mongoose";
import { TICKET_STATUS, ATTENDEE_TYPES } from "../config/constants.js";

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: Object.values(TICKET_STATUS),
      default: TICKET_STATUS.PENDING,
    },
    attendeeType: {
      type: String,
      enum: Object.values(ATTENDEE_TYPES),
      required: true,
    },
    qrCode: {
      type: String,
      default: "",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    checkedIn: {
      type: Boolean,
      default: false,
    },
    foodCollected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;

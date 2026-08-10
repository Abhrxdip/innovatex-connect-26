import mongoose from "mongoose";
import {
  TICKET_STATUS,
  ATTENDEE_TYPES
} from "../config/constants.js";

const ticketSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});
//? ticket contains userId which referral schema contains referredUser which on match generate full referral which contains referredBy
ticketSchema.virtual('referralData', {
  ref: 'Referral',
  localField: 'userId',
  foreignField: 'referredUser',
  justOne: true
});

//? show in populate save functions
ticketSchema.set('toObject', {
  virtuals: true
});
//? toJSON for json stringify to inclde virtuals
ticketSchema.set('toJSON', {
  virtuals: true
});

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
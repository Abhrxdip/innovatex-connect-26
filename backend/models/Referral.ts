import mongoose, { InferSchemaType, Model } from "mongoose";
import {
  TICKET_STATUS
} from "../config/constants.js";

const referralSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  referredUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  referralCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(TICKET_STATUS),
    default: TICKET_STATUS.PENDING,
  },
}, {
  timestamps: true,
});

export type ReferralType = InferSchemaType<typeof referralSchema>;


const Referral = mongoose.models.Referral as Model<ReferralType> || mongoose.model("Referral", referralSchema);

export default Referral;
import mongoose, { InferSchemaType, Model } from "mongoose";
import { PAYMENT_STATUSES } from "../config/constants";

const paymentSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(PAYMENT_STATUSES),
        default: PAYMENT_STATUSES.PENDING,
        index: true,
    },
    amount: {
        type: Number,
        default: null,
    },
    initiated_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
    completed_at: {
        type: Date,
        default: null,
    },
    payment_method: {
        type: String,
        default: null,
    },
    payload: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    order_id: {
        type: String,
        required: true,
        index: true,
    }
}, { timestamps: true })

type PaymentType = InferSchemaType<typeof paymentSchema>

export const Payment = mongoose.models.payment as Model<PaymentType> || mongoose.model("payment", paymentSchema)
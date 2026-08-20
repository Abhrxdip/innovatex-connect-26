import mongoose, { InferSchemaType, Model } from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

type NotificationType = InferSchemaType<typeof notificationSchema>

const Notification = mongoose.models.Notification as Model<NotificationType> || mongoose.model("Notification", notificationSchema);

export default Notification;

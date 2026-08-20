import mongoose, { InferSchemaType, Model } from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scanTime: {
      type: Date,
      default: Date.now,
    },
    gate: {
      type: String,
      default: "Main Gate",
    },
  },
  {
    timestamps: true,
  }
);

type AttendanceType = InferSchemaType<typeof attendanceSchema>

const Attendance = mongoose.models.Attendance as Model<AttendanceType> || mongoose.model("Attendance", attendanceSchema);

export default Attendance;

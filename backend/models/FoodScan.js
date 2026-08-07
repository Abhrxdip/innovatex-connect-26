import mongoose from "mongoose";

const foodScanSchema = new mongoose.Schema(
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
    counter: {
      type: String,
      default: "Food Counter 1",
    },
  },
  {
    timestamps: true,
  }
);

const FoodScan = mongoose.models.FoodScan || mongoose.model("FoodScan", foodScanSchema);

export default FoodScan;

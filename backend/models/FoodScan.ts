import mongoose, { InferSchemaType, Model } from "mongoose";

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
type FoodScanType = InferSchemaType<typeof foodScanSchema>

const FoodScan = mongoose.models.FoodScan as Model<FoodScanType> || mongoose.model("FoodScan", foodScanSchema);

export default FoodScan;

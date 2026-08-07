import { asyncHandler } from "@/backend/utils/asyncHandler.js";
import { sendResponse } from "@/backend/utils/sendResponse.js";
import { getLeaderboardController } from "@/backend/controllers/leaderboard.controller.js";

export const GET = asyncHandler(async () => {
  const leaderboard = await getLeaderboardController();

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Community partner leaderboard retrieved successfully",
    data: leaderboard,
  });
});

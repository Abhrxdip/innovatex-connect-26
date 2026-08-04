import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { getLeaderboardController } from "@/src/controllers/leaderboard.controller.js";

export const GET = asyncHandler(async () => {
  const leaderboard = await getLeaderboardController();

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Community partner leaderboard retrieved successfully",
    data: leaderboard,
  });
});

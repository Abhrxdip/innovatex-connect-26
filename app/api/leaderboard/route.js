import {
  asyncDbHandler
} from "@/backend/utils/asyncDbHandler.js";
import {
  sendResponse
} from "@/backend/utils/sendResponse.js";
import {
  getLeaderboardController
} from "@/backend/controllers/leaderboard.controller.js";

export const GET = asyncDbHandler(async (req) => {
  const url = new URL(req.url);
  const isAdmin = url.searchParams.get("admin") === "true";

  const leaderboard = await getLeaderboardController(isAdmin);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Community partner leaderboard retrieved successfully",
    data: leaderboard,
  });
});
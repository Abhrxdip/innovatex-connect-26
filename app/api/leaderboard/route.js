import {
  asyncDbHandler
} from "@/backend/utils/asyncDbHandler.js";
import {
  sendResponse
} from "@/backend/utils/sendResponse.js";
import {
  getLeaderboardController
} from "@/backend/controllers/leaderboard.controller.js";
import {
  authorize
} from "../../../backend/middlewares/role.middleware";
import {
  ROLES
} from "../../../backend/config/constants";
import {
  authenticate
} from "@/backend/middlewares/auth.middleware.js";

export const GET = asyncDbHandler(async (req) => {
  const authRes = await authenticate(req)
  if (!authRes.authenticated) {
    return authRes.response
  }
  const roleCheck = authorize(ROLES.ADMIN)(authRes.user)
  if (!roleCheck.authorized) {
    return roleCheck.response
  }
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
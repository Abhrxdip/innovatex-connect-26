import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { authenticate } from "@/src/middlewares/auth.middleware.js";
import { getUserDashboardController } from "@/src/controllers/user.controller.js";

export const GET = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const dashboardData = await getUserDashboardController(authResult.user._id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Dashboard data retrieved successfully",
    data: dashboardData,
  });
});

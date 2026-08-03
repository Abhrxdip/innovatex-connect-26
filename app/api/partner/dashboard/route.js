import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { authenticate } from "@/src/middlewares/auth.middleware.js";
import { authorize } from "@/src/middlewares/role.middleware.js";
import { ROLES } from "@/src/config/constants.js";
import { getPartnerDashboardController } from "@/src/controllers/partner.controller.js";

export const GET = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const roleCheck = authorize(ROLES.COMMUNITY_PARTNER, ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return roleCheck.response;
  }

  const dashboardData = await getPartnerDashboardController(authResult.user._id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Partner dashboard statistics retrieved successfully",
    data: dashboardData,
  });
});

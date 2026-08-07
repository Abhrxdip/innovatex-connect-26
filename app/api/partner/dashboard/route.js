import {
  asyncHandler
} from "@/src/utils/asyncHandler.js";
import {
  sendResponse
} from "@/src/utils/sendResponse.js";
import {
  authenticate
} from "@/src/middlewares/auth.middleware.js";
import {
  authorize
} from "@/src/middlewares/role.middleware.js";
import {
  ROLES
} from "@/src/config/constants.js";
import {
  getPartnerDashboardController
} from "@/src/controllers/partner.controller.js";
import {
  NextResponse
} from "next/server";

export const GET = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const roleCheck = authorize(ROLES.COMMUNITY_PARTNER, ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const dashboardData = await getPartnerDashboardController(authResult.user._id);
  if (!dashboardData.partner.role && dashboardData.partner.email) {
    const options = {
      email: dashboardData.partner.email,
      name: dashboardData.partner.name,
      provider: 'google',
    }
    const paramsUrl = new URLSearchParams(options)
    const redirectToRegister = `${redirectHost}/register?${paramsUrl.toString()}`;
    return NextResponse.redirect(redirectToRegister)
  }

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Partner dashboard statistics retrieved successfully",
    data: dashboardData,
  });
});
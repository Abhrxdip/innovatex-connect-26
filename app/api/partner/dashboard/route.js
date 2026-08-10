import {
  asyncDbHandler
} from "@/backend/utils/asyncDbHandler.js";
import {
  sendResponse
} from "@/backend/utils/sendResponse.js";
import {
  authenticate
} from "@/backend/middlewares/auth.middleware.js";
import {
  authorize
} from "@/backend/middlewares/role.middleware.js";
import {
  ROLES
} from "../../../../backend/config/constants";
import {
  getPartnerDashboardController
} from "@/backend/controllers/partner.controller.js";
import {
  NextResponse
} from "next/server";

export const GET = asyncDbHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const roleCheck = authorize(ROLES.COMMUNITY_PARTNER, ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const dashboardData = await getPartnerDashboardController(authResult.user._id);
  if (!dashboardData.partner.role || dashboardData.partner.role === ROLES.UNDEFINED) {
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
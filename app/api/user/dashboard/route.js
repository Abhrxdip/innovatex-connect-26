import {
  asyncHandler
} from "@/backend/utils/asyncHandler.js";
import {
  sendResponse
} from "@/backend/utils/sendResponse.js";
import {
  authenticate
} from "@/backend/middlewares/auth.middleware.js";
import {
  getUserDashboardController
} from "@/backend/controllers/user.controller.js";
import {
  NextResponse
} from "next/server";

const isProd = process.env.NODE_ENV === "production";
const redirectHost = isProd ? process.env.SITE_URL : "http://localhost:3000"


export const GET = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return NextResponse.redirect(new URL(`/login`, req.url))
  }

  const dashboardData = await getUserDashboardController(authResult.user._id);
  if (!dashboardData.user.role) {
    const options = {
      email: dashboardData.user.email,
      name: dashboardData.user.name,
      provider: 'google',
    }
    const paramsUrl = new URLSearchParams(options)
    const redirectToRegister = `${redirectHost}/register?${paramsUrl.toString()}`;
    return NextResponse.redirect(redirectToRegister)
  }

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Dashboard data retrieved successfully",
    data: dashboardData,
  });
});
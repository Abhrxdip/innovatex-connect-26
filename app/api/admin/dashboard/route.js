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
} from "@/backend/config/constants.js";
import {
  getAdminDashboardController
} from "@/backend/controllers/admin.controller.js";
import {
  NextResponse
} from "next/server";

export const GET = asyncDbHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return NextResponse.redirect(new URL(`/login`, req.url))
  }

  const roleCheck = authorize(ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const dashboardData = await getAdminDashboardController();

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Admin dashboard statistics retrieved successfully",
    data: dashboardData,
  });
});
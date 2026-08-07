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
  authorize
} from "@/backend/middlewares/role.middleware.js";
import {
  ROLES
} from "@/backend/config/constants.js";
import {
  listTicketsController
} from "@/backend/controllers/admin.controller.js";

export const GET = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const roleCheck = authorize(ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return roleCheck.response;
  }

  const {
    searchParams
  } = new URL(req.url);
  const status = searchParams.get("status");

  const tickets = await listTicketsController(status);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Tickets retrieved successfully",
    data: tickets,
  });
});
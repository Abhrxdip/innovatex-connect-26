import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { authenticate } from "@/src/middlewares/auth.middleware.js";
import { authorize } from "@/src/middlewares/role.middleware.js";
import { ROLES } from "@/src/config/constants.js";
import { listTicketsController } from "@/src/controllers/admin.controller.js";

export const GET = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const roleCheck = authorize(ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return roleCheck.response;
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const tickets = await listTicketsController(status);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Tickets retrieved successfully",
    data: tickets,
  });
});

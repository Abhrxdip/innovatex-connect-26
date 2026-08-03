import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { authenticate } from "@/src/middlewares/auth.middleware.js";
import { authorize } from "@/src/middlewares/role.middleware.js";
import { ROLES } from "@/src/config/constants.js";
import { approveTicketController } from "@/src/controllers/admin.controller.js";

export const POST = asyncHandler(async (req, context) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const roleCheck = authorize(ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return roleCheck.response;
  }

  const { id } = await context.params;
  const ticket = await approveTicketController(id, authResult.user._id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Ticket approved successfully and QR code generated",
    data: ticket,
  });
});

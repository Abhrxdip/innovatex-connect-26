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
  rejectTicketController
} from "@/backend/controllers/admin.controller.js";

export const POST = asyncDbHandler(async (req, context) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const roleCheck = authorize(ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return roleCheck.response;
  }

  const {
    id
  } = await context.params;
  const ticket = await rejectTicketController(id, authResult.user._id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Ticket rejected",
    data: ticket,
  });
});
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
  getMyTicketController
} from "@/backend/controllers/ticket.controller.js";

export const GET = asyncDbHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const ticket = await getMyTicketController(authResult.user._id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Ticket details retrieved successfully",
    data: ticket,
  });
});
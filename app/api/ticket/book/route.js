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
  validate
} from "@/backend/middlewares/validate.middleware.js";
import {
  bookTicketSchema
} from "@/backend/validators/ticket.validator.js";
import {
  bookTicketController
} from "@/backend/controllers/ticket.controller.js";

export const POST = asyncDbHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const ticket = await bookTicketController(authResult.user._id, {
    attendeeType: authResult.user.role ?? 'Student'
  });

  return sendResponse({
    success: true,
    statusCode: 201,
    message: "Free ticket request submitted successfully",
    data: ticket,
  });
});
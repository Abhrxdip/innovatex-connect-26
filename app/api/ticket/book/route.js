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
  validate
} from "@/src/middlewares/validate.middleware.js";
import {
  bookTicketSchema
} from "@/src/validators/ticket.validator.js";
import {
  bookTicketController
} from "@/src/controllers/ticket.controller.js";

export const POST = asyncHandler(async (req) => {
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
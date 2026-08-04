import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { authenticate } from "@/src/middlewares/auth.middleware.js";
import { getMyTicketController } from "@/src/controllers/ticket.controller.js";

export const GET = asyncHandler(async (req) => {
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

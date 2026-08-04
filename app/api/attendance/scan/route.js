import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { authenticate } from "@/src/middlewares/auth.middleware.js";
import { authorize } from "@/src/middlewares/role.middleware.js";
import { ROLES } from "@/src/config/constants.js";
import { scanGateController } from "@/src/controllers/attendance.controller.js";

export const POST = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const roleCheck = authorize(ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return roleCheck.response;
  }

  const { ticketNumber, gate } = await req.json();
  if (!ticketNumber) {
    return sendResponse({
      success: false,
      statusCode: 400,
      message: "Ticket number is required",
    });
  }

  const result = await scanGateController({
    ticketNumber,
    adminId: authResult.user._id,
    gate: gate || "Main Gate",
  });

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Attendee check-in successful",
    data: result,
  });
});

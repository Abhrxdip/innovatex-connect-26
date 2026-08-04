import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { authenticate } from "@/src/middlewares/auth.middleware.js";
import { authorize } from "@/src/middlewares/role.middleware.js";
import { ROLES } from "@/src/config/constants.js";
import { scanFoodController } from "@/src/controllers/attendance.controller.js";

export const POST = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const roleCheck = authorize(ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return roleCheck.response;
  }

  const { ticketNumber, counter } = await req.json();
  if (!ticketNumber) {
    return sendResponse({
      success: false,
      statusCode: 400,
      message: "Ticket number is required",
    });
  }

  const result = await scanFoodController({
    ticketNumber,
    adminId: authResult.user._id,
    counter: counter || "Food Counter 1",
  });

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Food coupon redeemed successfully",
    data: result,
  });
});

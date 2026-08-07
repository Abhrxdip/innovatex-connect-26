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
  scanFoodController
} from "@/backend/controllers/attendance.controller.js";

export const POST = asyncDbHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const roleCheck = authorize(ROLES.ADMIN)(authResult.user);
  if (!roleCheck.authorized) {
    return roleCheck.response;
  }

  const {
    ticketNumber,
    counter
  } = await req.json();
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
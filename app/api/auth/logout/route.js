import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";

export const POST = asyncHandler(async () => {
  const response = sendResponse({
    success: true,
    statusCode: 200,
    message: "Logged out successfully",
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
});

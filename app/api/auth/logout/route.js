import {
  asyncDbHandler
} from "@/backend/utils/asyncDbHandler.js";
import {
  sendResponse
} from "@/backend/utils/sendResponse.js";

export const POST = asyncDbHandler(async () => {
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
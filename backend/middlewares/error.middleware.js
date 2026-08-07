import { sendResponse } from "../utils/sendResponse.js";

export function errorHandler(error) {
  const statusCode = error.statusCode || error.status || 500;
  const message = error.message || "Internal Server Error";

  return sendResponse({
    success: false,
    statusCode,
    message,
    errors: process.env.NODE_ENV === "development" ? error.stack : null,
  });
}

import {
  sendResponse
} from "./sendResponse.js";
import connectDb from "../config/db.js";

export function asyncDbHandler(handler) {
  return async (req, context) => {
    try {
      await connectDb();
      return await handler(req, context);
    } catch (error) {
      const statusCode = error.statusCode || error.status || 500;
      const message = error.message || "Internal Server Error";
      console.error("Unable to connect to db" + String(error))
      return sendResponse({
        success: false,
        statusCode,
        message,
        errors: process.env.NODE_ENV === "development" ? error.stack : null,
      });
    }
  };
}
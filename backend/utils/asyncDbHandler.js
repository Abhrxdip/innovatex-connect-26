import {
  sendResponse
} from "./sendResponse.js";
import connectDb from "../config/db.js";
import {
  MongooseError
} from "mongoose";

export function asyncDbHandler(handler) {
  return async (req, context) => {
    try {
      await connectDb();
      return await handler(req, context);
    } catch (error) {
      if (error instanceof MongooseError) {
        console.error("Unable to connect to db" + String(error))
        return sendResponse({
          success: false,
          statusCode: 500,
          errors: "Internal Server Error",
          message: "Something went wrong, please try again"
        })
      }
      const statusCode = error.statusCode || error.status || 500;
      const message = error.message || "Internal Server Error";
      console.error(error)
      return sendResponse({
        success: false,
        statusCode,
        message,
        errors: process.env.NODE_ENV === "development" ? error.stack : null,
      });
    }
  };
}
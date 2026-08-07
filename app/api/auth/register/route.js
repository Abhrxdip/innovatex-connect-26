import {
  NextResponse
} from "next/server";
import {
  asyncHandler
} from "@/backend/utils/asyncHandler.js";
import {
  sendResponse
} from "@/backend/utils/sendResponse.js";
import {
  validate
} from "@/backend/middlewares/validate.middleware.js";
import {
  registerSchema
} from "@/backend/validators/auth.validator.js";
import {
  registerController
} from "@/backend/controllers/auth.controller.js";

export const POST = asyncHandler(async (req) => {
  const validationResult = await validate(registerSchema)(req);
  if (!validationResult.success) {
    return validationResult.response;
  }
  const {
    user,
    token
  } = await registerController(validationResult.data);

  const response = sendResponse({
    success: true,
    statusCode: 201,
    message: "Registration successful",
    data: {
      user,
      token
    },
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return response;
});
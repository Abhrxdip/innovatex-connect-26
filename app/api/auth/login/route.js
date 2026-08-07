import {
  asyncDbHandler
} from "@/backend/utils/asyncDbHandler.js";
import {
  asyncCacheHandler
} from "@/backend/utils/asyncCacheHandler";
import {
  sendResponse
} from "@/backend/utils/sendResponse.js";
import {
  validate
} from "@/backend/middlewares/validate.middleware.js";
import {
  loginSchema
} from "@/backend/validators/auth.validator.js";
import {
  loginController
} from "@/backend/controllers/auth.controller.js";


export const POST = asyncCacheHandler(
  asyncDbHandler(async (req) => {
    const validationResult = await validate(loginSchema)(req);
    if (!validationResult.success) {
      return validationResult.response;
    }
    const { user, token } = await loginController(validationResult.data);
    const response = sendResponse({
      success: true,
      statusCode: 200,
      message: "Login successful",
      data: { user, token },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  })
);
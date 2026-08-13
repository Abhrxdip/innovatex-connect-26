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

import {
  redirectToCorrectDashboard
} from "../../common/redirect_to_correct_dashboard"


export const POST = asyncCacheHandler(
  asyncDbHandler(async (req) => {
    const validationResult = await validate(loginSchema)(req);
    if (!validationResult.success) {
      return validationResult.response;
    }
    const {
      user,
      token
    } = await loginController(validationResult.data);
    const response = redirectToCorrectDashboard(user.role, req)

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2592000,
      path: "/",
    });

    return response
  })
);
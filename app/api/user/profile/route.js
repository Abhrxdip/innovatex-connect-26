import { asyncHandler } from "@/src/utils/asyncHandler.js";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { authenticate } from "@/src/middlewares/auth.middleware.js";
import { validate } from "@/src/middlewares/validate.middleware.js";
import { updateProfileSchema } from "@/src/validators/user.validator.js";
import { getProfileController, updateProfileController } from "@/src/controllers/user.controller.js";

export const GET = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const profile = await getProfileController(authResult.user._id);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Profile retrieved successfully",
    data: profile,
  });
});

export const PUT = asyncHandler(async (req) => {
  const authResult = await authenticate(req);
  if (!authResult.authenticated) {
    return authResult.response;
  }

  const validationResult = await validate(updateProfileSchema)(req);
  if (!validationResult.success) {
    return validationResult.response;
  }

  const updatedProfile = await updateProfileController(authResult.user._id, validationResult.data);

  return sendResponse({
    success: true,
    statusCode: 200,
    message: "Profile updated successfully",
    data: updatedProfile,
  });
});

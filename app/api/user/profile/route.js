import {
  asyncHandler
} from "@/src/utils/asyncHandler.js";
import {
  sendResponse
} from "@/src/utils/sendResponse.js";
import {
  authenticate
} from "@/src/middlewares/auth.middleware.js";
import {
  validate
} from "@/src/middlewares/validate.middleware.js";
import {
  updateProfileSchema
} from "@/src/validators/user.validator.js";
import {
  getProfileController,
  //// updateProfileController
} from "@/src/controllers/user.controller.js";
import {
  NextResponse
} from "next/server";
import {
  email
} from "zod/v4";


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

//? Srayash aka @ishu17077 talk to him before adding this block
//! Very dangerous as this method allows user to change anything about themselves, needs to be limited to specific field update only, not expose entire fields
//// export const PUT = asyncHandler(async (req) => {
////   const authResult = await authenticate(req);
////   if (!authResult.authenticated) {
////     return authResult.response;
////   }

////   const validationResult = await validate(updateProfileSchema)(req);
////   if (!validationResult.success) {
////     return validationResult.response;
////   }

////   const updatedProfile = await updateProfileController(authResult.user._id, validationResult.data);

////   return sendResponse({
////     success: true,
////     statusCode: 200,
////     message: "Profile updated successfully",
////     data: updatedProfile,
////   });
//// });
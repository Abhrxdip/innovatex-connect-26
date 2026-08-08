import {
  asyncDbHandler
} from "@/backend/utils/asyncDbHandler.js";
import {
  sendResponse
} from "@/backend/utils/sendResponse.js";
import {
  authenticate
} from "@/backend/middlewares/auth.middleware.js";
import {
  validate
} from "@/backend/middlewares/validate.middleware.js";
import {
  // updateProfileSchema
} from "@/backend/validators/user.validator.js";
import {
  getProfileController,
  //// updateProfileController
} from "@/backend/controllers/user.controller.js";
import {
  // NextResponse
} from "next/server";
import {
  // email
} from "zod/v4";


export const GET = asyncDbHandler(async (req) => {
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
//// export const PUT = asyncDbHandler(async (req) => {
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
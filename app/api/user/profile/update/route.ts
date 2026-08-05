import { NextRequest } from "next/server";
import { sendResponse } from "@/src/utils/sendResponse.js";
import { authenticate } from "@/src/middlewares/auth.middleware.js";
import { validate } from "@/src/middlewares/validate.middleware.js";
import { updateProfileSchema } from "@/src/validators/user.validator.js";
import { getProfileController } from "@/src/controllers/user.controller.js";
import { updateUserDetails } from "@/src/services/auth.service";


export async function POST(req: NextRequest) {
    const authResult = await authenticate(req)
    if (!authResult.authenticated) {
        return authResult.response
    }
    const clone = req.clone()

    const validationResult = await validate(updateProfileSchema)(req);
    if (!validationResult.success) {
        return validationResult.response;
    }

    const updatedProfile = await updateUserDetails({
        _id: authResult.user._id,
        role: (await clone.json())["role"],
        college: validationResult.data.college,
        company: validationResult.data.company,
        phone: validationResult.data.phone
    })

    return sendResponse({
        success: true,
        statusCode: 200,
        message: "Profile updated successfully",
        data: updatedProfile,
    });
}
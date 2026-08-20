import { NextRequest } from "next/server";
import { sendResponse } from "@/backend/utils/sendResponse.js";
import { authenticate } from "@/backend/middlewares/auth.middleware.js";
import { validate } from "@/backend/middlewares/validate.middleware.js";
import { updateProfileSchema } from "@/backend/validators/user.validator.js";
import { getProfileController } from "@/backend/controllers/user.controller.js";
import { updateUserDetails } from "@/backend/services/auth.service";
import { errorHandler } from "@/backend/middlewares/error.middleware.js"
import {
    asyncDbHandler
} from "@/backend/utils/asyncDbHandler";
import { redirectToCorrectDashboard } from "@/app/api/common/redirect_to_correct_dashboard";
import { ROLES } from "@/backend/config/constants";

export async function POST(req: NextRequest) {
    return asyncDbHandler(async (req: NextRequest) => {
        try {
            const authResult = await authenticate(req)
            if (!authResult.authenticated || !authResult.user) {
                return authResult.response
            }
            const clone = req.clone()

            const validationResult = await validate(updateProfileSchema)(req);
            if (!validationResult.success) {
                return validationResult.response;
            }

            const updatedUser = (await clone.json());
            const updatedProfile = await updateUserDetails({
                _id: authResult.user._id,
                role: updatedUser.role,
                foodPreference: validationResult.data.foodPreference,
                linkedin: validationResult.data.linkedin,
                github: validationResult.data.github,
                college: validationResult.data.college,
                company: validationResult.data.company,
                phone: validationResult.data.phone
            })
            if (!updatedProfile) {
                throw Error("User not found")
            }

            return redirectToCorrectDashboard(updatedProfile.role, req)
        } catch (e) {
            return errorHandler(e)
        }
    })(req)
}
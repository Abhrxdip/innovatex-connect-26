import { NextRequest } from "next/server";
import {
    validate
} from "@/backend/middlewares/validate.middleware.js";
import {
    forgetPassAndtwoFARegSchema
} from "@/backend/validators/auth.validator.js";

import {
    generateOTPForRegisteredUsers
} from "@/backend/services/otp.service"



import { asyncDbHandler } from "@/backend/utils/asyncDbHandler";
import { sendResponse } from "@/backend/utils/sendResponse";

export async function POST(req: NextRequest) {
    return asyncDbHandler(async (req: NextRequest) => {
        const validation = await validate(forgetPassAndtwoFARegSchema)(req)
        if (!validation.success) {
            return validation.response
        }
        const { email } = validation.data
        const otp = await generateOTPForRegisteredUsers({ email: email })

        

        return sendResponse({
            success: true,
            message: `OTP sent to ${email}`,
            data: null,
            statusCode: 200,
        })
    })(req)
} 
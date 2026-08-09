import { NextRequest } from "next/server";
import {
    validate
} from "@/backend/middlewares/validate.middleware.js";
import {
    twoFARegSchema
} from "@/backend/validators/auth.validator.js";

import {
    generateOTPForRegisteredUsers
} from "@/backend/services/otp.service"



import { asyncDbHandler } from "@/backend/utils/asyncDbHandler";
import { sendResponse } from "@/backend/utils/sendResponse";
import { asyncCacheHandler } from "@/backend/utils/asyncCacheHandler";
import { sendOTPMail } from "@/backend/services/mail.service";

export const POST = asyncCacheHandler(asyncDbHandler(async (req: NextRequest) => {
    const validation = await validate(twoFARegSchema)(req)
    if (!validation.success) {
        return validation.response
    }
    const { email } = validation.data
    const { otp, name } = await generateOTPForRegisteredUsers({ email: email })
    await sendOTPMail({ otp, email, name })
    return sendResponse({
        success: true,
        message: `OTP sent to ${email}`,
        data: null,
        statusCode: 200,
    })
}
))

import { validate } from "@/backend/middlewares/validate.middleware";
import { asyncCacheHandler } from "@/backend/utils/asyncCacheHandler";
import { NextRequest, NextResponse } from "next/server";
import {
    forgetPassAndtwoFARegSchema
} from "@/backend/validators/auth.validator.js";
import { sendResponse } from "@/backend/utils/sendResponse";
import { generateOTPForOnboardingUsers } from "@/backend/services/otp.service";
import { sendOTPMail } from "@/backend/services/mail.service";

export async function POST(req: NextRequest) {
    return asyncCacheHandler(async (req: NextRequest, _context: unknown) => {
        const validRes = await validate(forgetPassAndtwoFARegSchema)(req)
        if (!validRes.success) {
            return validRes.response as NextResponse
        }
        const { email, name } = validRes.data
        if (!email) {
            throw Error("Email not present")
        }
        const otp = await generateOTPForOnboardingUsers({ email: email })
        await sendOTPMail({ name: name, email: email, otp: otp })
        return sendResponse({
            data: null,
            message: "OTP successfully sent to your mail",
            statusCode: 200,
            success: true
        })

    })(req, null)
}

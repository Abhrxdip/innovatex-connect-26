import { validate } from "@/backend/middlewares/validate.middleware";
import { asyncDbHandler } from "@/backend/utils/asyncDbHandler";
import { forgetPasswordSchema } from "@/backend/validators/auth.validator";
import { NextRequest } from "next/server";
import { forgetPasswordController } from "@/backend/controllers/auth.controller"
import { sendResponse } from "@/backend/utils/sendResponse";
import { asyncCacheHandler } from "@/backend/utils/asyncCacheHandler";


export const POST = asyncCacheHandler(asyncDbHandler(async (req: NextRequest) => {
    const validRes = await validate(forgetPasswordSchema)(req)
    if (!validRes.success) {
        return validRes.response
    }
    const { email, password, otp } = validRes.data

    await forgetPasswordController({ email, otp, password })

    return sendResponse({ success: true, message: "Password changed successfully", statusCode: 200 })
}))
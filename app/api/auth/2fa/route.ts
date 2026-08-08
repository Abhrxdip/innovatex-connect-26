import { NextRequest } from "next/server";
import {
    validate
} from "@/backend/middlewares/validate.middleware.js";
import {
    forgetPassAndtwoFARegSchema
} from "@/backend/validators/auth.validator.js";

import {
    generateOTP
} from "@/backend/services/otp.service"



import { asyncDbHandler } from "@/backend/utils/asyncDbHandler";

export async function POST(req: NextRequest) {
    return asyncDbHandler(async (req: NextRequest) => {
        const validation = await validate(forgetPassAndtwoFARegSchema)(req)
        if (!validation.success) {
            return validation.response
        }
        const { email } = validation.data
        const otp = await generateOTP({ email: email })
        console.log(otp)
    })(req)
} 
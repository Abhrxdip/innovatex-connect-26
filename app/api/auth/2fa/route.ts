import { NextRequest } from "next/server";
import {
    validate
} from "@/backend/middlewares/validate.middleware.js";
import {
    forgetPassAndtwoFASchema
} from "@/backend/validators/auth.validator.js";
import { asyncDbHandler } from "@/backend/utils/asyncDbHandler";

export async function POST(req: NextRequest) {
    return asyncDbHandler(async (req: NextRequest) => {
        const validation = await validate(forgetPassAndtwoFASchema)(req)
        if (!validation.success) {
            return validation.response
        }
        
    })(req)

} 
import { authenticate } from "@/backend/middlewares/auth.middleware";
import { asyncDbHandler } from "@/backend/utils/asyncDbHandler";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/backend/middlewares/role.middleware"
import { ROLES } from "@/backend/config/constants";
import { generatePaymentLink } from "@/backend/controllers/ticket.controller";


export function GET(req: NextRequest) {
    return asyncDbHandler(async (req: NextRequest) => {
        const authResult = await authenticate(req)
        if (!authResult.authenticated) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        const roleCheck = authorize(ROLES.STUDENT, ROLES.WORKING_PROFESSIONAL)(authResult.user)

        if (!roleCheck.authorized) {
            return roleCheck.response
        }

        const paymentLink = await generatePaymentLink(authResult.user)
        console.log(paymentLink)

        return NextResponse.json({ "short_url": paymentLink })
    })(req)
}
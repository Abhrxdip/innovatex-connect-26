import { authenticate } from "@/backend/middlewares/auth.middleware";
import { asyncDbHandler } from "@/backend/utils/asyncDbHandler";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/backend/middlewares/role.middleware"
import { ROLES } from "@/backend/config/constants";
import { createOrder } from "@/backend/controllers/ticket.controller";


export function POST(req: NextRequest) {
    return asyncDbHandler(async (req: NextRequest) => {
        const authResult = await authenticate(req)
        if (!authResult.authenticated || !authResult.user) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        const roleCheck = authorize(ROLES.STUDENT, ROLES.WORKING_PROFESSIONAL)(authResult.user)

        if (!roleCheck.authorized) {
            return roleCheck.response
        }
        const order = await createOrder(authResult.user)
        return NextResponse.json({ user: authResult.user, order: order })
    })(req)
}
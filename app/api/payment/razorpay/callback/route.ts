import { sendResponse } from "@/backend/utils/sendResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json()
    if (!data["payload"] || !data["event"] || !data["payload"]["order_id"]) {
        return sendResponse({ data: null, errors: "Fields not present", message: "Not a valid json response", statusCode: 400, success: false })
    }

    
}
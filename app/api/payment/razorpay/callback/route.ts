import { updatePaymentAndUpdateTicket } from "@/backend/controllers/payment.controller";
import { sendResponse } from "@/backend/utils/sendResponse";
import { NextRequest } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req: NextRequest) {
    const signature = req.headers.get("x-razorpay-signature") ?? ''
    const rawBody = await req.text()
    const data = JSON.parse(rawBody)
    if (!data["payload"] || !data["event"]) {
        return sendResponse({ data: null, errors: "Fields not present", message: "Not a valid json response", statusCode: 400, success: false })
    }
    if (!validateWebhookSignature(rawBody, signature, process.env.RAZOR_PAY_WEBHOOK_SECRET!)) {
        return sendResponse({ success: false, errors: "Invalid Signature", statusCode: 400 })
    }

    await updatePaymentAndUpdateTicket(data.event, data["payload"])
    return sendResponse({ success: true, statusCode: 200 })
}
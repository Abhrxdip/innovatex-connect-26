import RazorPay from "razorpay"


declare global {
    var razorPay: RazorPay | undefined
}

export const RazorPayApi = global.razorPay || new RazorPay({ key_id: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID!, key_secret: process.env.RAZOR_PAY_KEY_SECRET! })

if (process.env.NODE_ENV === "production") {
    global.razorPay = RazorPayApi
}
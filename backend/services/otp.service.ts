import { email, number } from "zod/v4";
import { OtpClient } from "../config/otp";


export async function generateOTP({ secret }: { secret: string }): Promise<string> {
    try {
        return await OtpClient.generate({ secret: secret })
    } catch (e) {
        console.log(`OTP Service Generation error: ${e}`)
        const error = Error("Cannot generate OTP right now")
        throw error
    }
}

export async function verifyOTP({ otp, secret }: { otp: string, secret: string }): Promise<boolean> {
    try {
        if (otp.length !== 6) {
            return false
        }
        return (await OtpClient.verify(otp, { secret: secret })).valid
    } catch (e) {
        console.log(`OTP Service Verification error: ${e}`)
        return false
    }
}
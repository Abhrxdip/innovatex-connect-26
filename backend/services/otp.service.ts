import { email, number } from "zod/v4";
import { OtpClient } from "../config/otp";
import User from "../models/User";
import { generateSecret } from "otplib";


export async function generateOTP({ email }: { email: string }): Promise<string> {
    try {

        const user = await User.findOne({ email: email })
        if (!user) {
            throw new UserNotFoundError("User not found")
        }

        if (!user.secret) {
            user.secret = generateSecret()
            await User.findByIdAndUpdate(user._id, { secret: user.secret })
        }

        return await OtpClient.generate({ secret: user.secret })
    } catch (e) {
        console.log(`OTP Service Generation error: ${e}`)
        if (e instanceof UserNotFoundError) {
            throw Error("User not found")
        }
        console.log()
        const error = Error("OTP Generation Error")
        throw error
    }
}

export async function verifyOTP({ email, otp }: { email: string, otp: string }): Promise<boolean> {
    try {
        if (otp.length !== 6) {
            return false
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            throw Error("User not found")
        }
        return (await OtpClient.verify(otp, { secret: user.secret })).valid
    } catch (e) {
        console.log(`OTP Service Verification error: ${e}`)
        return false
    }
}

class UserNotFoundError extends Error { }
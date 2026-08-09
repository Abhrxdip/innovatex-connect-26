import { email, number } from "zod/v4";
import { OtpClient } from "../config/otp";
import User from "../models/User";
import { generateSecret } from "otplib";
import { redisClient } from "../config/redis_connection";


export async function generateOTPForRegisteredUsers({ email }: { email: string }): Promise<string> {
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new UserNotFoundError("User not found")
        }
        await checkExists(email);
        if (!user.secret) {
            user.secret = generateSecret()
            await User.findByIdAndUpdate(user._id, { secret: user.secret })
        }

        return await OtpClient.generate({ secret: user.secret })
    } catch (e) {
        console.log(`OTP Service Generation error: ${e}`)
        await removeOTPExists(email).catch(() => null)
        if (e instanceof UserNotFoundError) {
            throw Error("User not found")
        }
        const error = Error("OTP Generation Error")
        throw error
    }
}

export async function generateOTPForOnboardingUsers({ email }: { email: string }): Promise<string> {
    try {
        await checkExists(email);
        const secret = generateSecret()
        await redisClient.set(`secret:${email}`, secret, { expiration: { type: "EX", value: 600 } })
        const otp = OtpClient.generate({ secret: secret })
        return otp
    } catch (e) {
        await removeOTPExists(email).catch(() => null)
        throw Error("OTP generation error, please try again")
    }
}


async function checkExists(email: string) {
    if ((await redisClient.get(`otp:${email}`)) === "1") {
        const error = new Error("OTP already sent. Please wait for 10 minutes");
        throw error;
    }

    await redisClient.set(`otp:${email}`, 1, {
        expiration: {
            type: "EX",
            value: 600,
        }
    });
}

async function removeOTPExists(email: string) {
    await redisClient.del(`otp:${email}`)
}

export async function verifyOTPForRegisteredUsers({ email, otp }: { email: string, otp: string }): Promise<boolean> {
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

export async function verifyOTPForOnboardingUsers({ email, otp }: { email: string, otp: string }): Promise<boolean> {
    try {
        const secret = await redisClient.get(`secret:${email}`)
        if (!secret) {
            throw new SecretNotFoundError("Did you generate an OTP?")
        }
        return (await OtpClient.verify(otp, { secret: secret })).valid
    } catch (e) {
        if (e instanceof SecretNotFoundError) {
            throw Error("Did you generate an OTP?")
        }
        console.log(`OTP Service Verification error: ${e}`)
        return false
    }
}

class UserNotFoundError extends Error { }
class SecretNotFoundError extends Error { }
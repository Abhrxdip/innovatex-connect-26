import { email, number } from "zod/v4";
import { OtpClient } from "../config/otp";
import User from "../models/User";
import { generateSecret } from "otplib";
import { redisClient } from "../config/redis_connection";


export async function generateOTPForRegisteredUsers({ email }: { email: string }): Promise<{ otp: string, name: string, email: string }> {
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new UserNotFoundError("User not found")
        }
        await checkOTPAlreadySent(email);
        // if (!user.secret) {
        //     user.secret = generateSecret()
        //     await User.findByIdAndUpdate(user._id, { secret: user.secret })
        // }

        const otp = `${Math.round(Math.random() * 900000 + 100000)}`;
        const redisAns = await redisClient.set(`otp_code:${email}`, `${otp}`, { expiration: { type: "EX", value: 600 } })
        if (!redisAns) {
            throw Error("Something went wrong, please try again")
        }
        return {
            email: user.email,
            name: user.name,
            otp: otp
        }
    } catch (e) {
        console.log(`OTP Service Generation error: ${e}`)
        if (e instanceof OTPAlreadySent) {
            throw Error("OTP already sent. Please wait for 10 minutes")
        }
        if (e instanceof UserNotFoundError) {
            throw Error("User not found")
        }
        await removeOTPExists(email).catch(() => null)
        const error = Error("OTP Generation Error")
        throw error
    }
}

export async function generateOTPForOnboardingUsers({ email }: { email: string }): Promise<string> {
    try {
        await checkOTPAlreadySent(email);
        // const secret = generateSecret()
        // await redisClient.set(`secret:${email}`, secret, { expiration: { type: "EX", value: 600 } })
        const otp = `${Math.round(Math.random() * 900000 + 100000)}`;
        const redisAns = await redisClient.set(`otp_code:${email}`, `${otp}`, { expiration: { type: "EX", value: 600 } })
        if (!redisAns) {
            throw Error("Something went wrong, please try again")
        }
        return otp
    } catch (e) {
        if (e instanceof OTPAlreadySent) {
            throw Error("OTP already sent. Please wait for 10 minutes")
        }
        await removeOTPExists(email).catch(() => null)
        throw Error("OTP generation error, please try again")
    }
}


async function checkOTPAlreadySent(email: string) {
    if ((await redisClient.get(`otp:${email}`)) === "1") {
        const error = new OTPAlreadySent("OTP already sent. Please wait for 10 minutes");
        console.log(error)
        throw error;
    }

    await redisClient.set(`otp:${email}`, 1, {
        expiration: {
            type: "EX",
            value: 600,
        }
    });
}

async function otpIncorrectHandler(email: string): Promise<void> {
    const attemps = await redisClient.incr(`otp_incorrect:${email}`)

    if (attemps > 3) {
        throw new OTPTriedTooManyTimes()
    }
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
            throw new UserNotFoundError()
        }

        const isValid = (await redisClient.get(`otp_code:${email}`)) === otp
        if (!isValid) {
            await otpIncorrectHandler(email)
        }
        return isValid
    } catch (e) {
        if (e instanceof OTPTriedTooManyTimes) {
            throw Error("Too many incorrect attempts. Please try again later")
        }
        if (e instanceof UserNotFoundError) {
            throw Error("User not found.")
        }
        console.log(`OTP Service Verification error: ${e}`)
        return false
    }
}

export async function verifyOTPForOnboardingUsers({ email, otp }: { email: string, otp: string }): Promise<boolean> {
    try {
        // const secret = await redisClient.get(`secret:${email}`)
        // if (!secret) {
        //     throw new SecretNotFoundError("Did you generate an OTP?")
        // }

        const isValid = (await redisClient.get(`otp_code:${email}`)) === otp
        if (!isValid) {
            await otpIncorrectHandler(email)
        }
        return isValid
    } catch (e) {
        if (e instanceof SecretNotFoundError) {
            throw Error("Did you generate an OTP?")
        }
        if (e instanceof OTPTriedTooManyTimes) {
            throw Error("Too many incorrect attempts. Please try again later")
        }
        console.log(`OTP Service Verification error: ${e}`)
        return false
    }
}



class UserNotFoundError extends Error { }
class SecretNotFoundError extends Error { }
class OTPAlreadySent extends Error { }
class OTPTriedTooManyTimes extends Error { }
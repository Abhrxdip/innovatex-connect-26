import { TOTP } from "otplib"

declare global {
    var globalOtpClient: TOTP | undefined
}

export const OtpClient = global.globalOtpClient ?? new TOTP({ issuer: "Lone Wolf Backend", period: 600, digits: 6 })

if (process.env.NODE_ENV === "production") {
    global.globalOtpClient = OtpClient
}


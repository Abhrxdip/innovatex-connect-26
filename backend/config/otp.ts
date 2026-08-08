import { TOTP } from "otplib"
import { NodeCryptoPlugin } from "@otplib/plugin-crypto-node"
import { ScureBase32Plugin } from '@otplib/plugin-base32-scure';

declare global {
    var globalOtpClient: TOTP | undefined
}

export const OtpClient = global.globalOtpClient ?? new TOTP({ issuer: "Lone Wolf Backend", period: 600, digits: 6, crypto: new NodeCryptoPlugin(), base32: new ScureBase32Plugin() })

if (process.env.NODE_ENV === "production") {
    global.globalOtpClient = OtpClient
}


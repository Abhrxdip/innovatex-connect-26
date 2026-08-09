import { BrevoClient } from "@getbrevo/brevo";

const brevoApiKey = process.env.BREVO_MAIL_API_KEY!

declare global {
    var brevo: BrevoClient | undefined
}

export const mailClient = global.brevo ?? new BrevoClient({ apiKey: brevoApiKey })

if (process.env.NODE_ENV === "production") {
    global.brevo = mailClient
}


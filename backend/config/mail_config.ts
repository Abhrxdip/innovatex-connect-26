import { BrevoClient } from "@getbrevo/brevo";

const brevoApiKey = process.env.BREVO_MAIL_API_KEY!

declare global {
    var globalBrevo: BrevoClient | undefined
}

export const mailClient = global.globalBrevo ?? new BrevoClient({ apiKey: brevoApiKey })

if (process.env.NODE_ENV === "production") {
    globalBrevo = mailClient
}


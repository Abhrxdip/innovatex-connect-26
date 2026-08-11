import { BrevoClient } from "@getbrevo/brevo";
import { MailtrapClient } from "mailtrap"

const brevoApiKey = process.env.BREVO_MAIL_API_KEY!
const mailtrapApiKey = process.env.MAILTRAP_TOKEN!

declare global {
    var brevo: BrevoClient | undefined
    var mailtrap: MailtrapClient | undefined
}

export const brevoMailClient = global.brevo ?? new BrevoClient({ apiKey: brevoApiKey })
export const mailtrapClient = global.mailtrap ?? new MailtrapClient({ token: mailtrapApiKey })


if (process.env.NODE_ENV === "production") {
    global.brevo = brevoMailClient
    global.mailtrap = mailtrapClient
}

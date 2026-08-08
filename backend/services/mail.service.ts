import { mailClient } from "../config/mail_config";


export async function sendOTPMail({ name, email, otp }: { name: string, email: string, otp: string }): Promise<void> {
    const res = await mailClient.transactionalEmails.sendTransacEmail({
        to: [{
            email: email,
            name: name,
        }],
        templateId: 1, //! Will change for different brevo accounts
        params: {
            otp: otp,
            name: name,
            email: email,
        }
    })
    console.log(`OTP mail sent. ID: ${res.messageId}`)
}

export async function sendTicketConfirmedMail({ name, email, ticket_number, attendee_type, organization, qr_code }: { name: string, email: string, ticket_number: string, attendee_type: string, organization: string, qr_code: string }): Promise<void> {
    const res = await mailClient.transactionalEmails.sendTransacEmail({
        to: [{
            email: email,
            name: name,
        }],
        templateId: 2, //! Will change for different brevo accounts
        params: {
            name: name,
            email: email,
            ticket_number: ticket_number,
            attendee_type: attendee_type,
            organization: organization,
            qr_code: qr_code,
        }
    })
    console.log(`Ticket Confirmation mail sent. ID: ${res.messageId}`)
}
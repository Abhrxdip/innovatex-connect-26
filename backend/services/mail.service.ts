import { brevoMailClient, mailtrapClient } from "../config/mail_config";

const useMailtrap = process.env.USE_MAILTRAP
export async function sendOTPMail({ name, email, otp }: { name: string, email: string, otp: string }): Promise<void> {
    if (useMailtrap) {
        const res = await mailtrapClient.send({
            from: {
                email: "connect@innovatexcom.xyz",
                name: "InnovateX Community",
            },
            to: [{ email: email, name: name }],
            template_uuid: "69251010-10ab-4ae9-97a4-cbc8be0859f8",
            template_variables: {
                "params": {
                    "name": name,
                    "email": email,
                    "otp": otp,
                }
            }
        })
        console.log(res.message_ids)
        return
    }
    const res = await brevoMailClient.transactionalEmails.sendTransacEmail({
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

export async function sendPaymentMail({ name, email }: { name: string, email: string }) {
    if (useMailtrap) {
        const res = await mailtrapClient.send({
            from: {
                email: "connect@innovatexcom.xyz",
                name: "InnovateX Community",
            },
            to: [{ email: email, name: name }],
            template_uuid: "c369c6fb-cdae-4631-a4c1-cf94a0defb50",
            template_variables: {
                "params": {
                    name: name,
                }
            }
        })
        console.log(res.message_ids)
        return
    }
    const res = await brevoMailClient.transactionalEmails.sendTransacEmail({
        to: [{
            email: email,
            name: name,
        }],
        templateId: 3, //! Will change for different brevo accounts
        params: {
            name: name,
        }
    })
    console.log(`OTP mail sent. ID: ${res.messageId}`)
}

export async function sendTicketConfirmedMail({ name, email, ticket_number, attendee_type, organization, qr_code, foodPreference }: { name: string, email: string, ticket_number: string, attendee_type: string, organization: string, qr_code: string, foodPreference: string }): Promise<void> {
    if (useMailtrap) {
        const res = await mailtrapClient.send({
            from: {
                email: "connect@innovatexcom.xyz",
                name: "InnovateX Community",
            },
            to: [{ email: email, name: name }],
            template_uuid: "b6aeeb46-49c0-48f4-ab7b-826d3c0594c2",
            template_variables: {
                "params": {
                    "name": name,
                    "ticket_number": ticket_number,
                    "attendee_type": attendee_type,
                    "organization": organization,
                    "foodPreference": foodPreference,
                }
            }
        })
        console.log(res.message_ids)
        return
    }
    const res = await brevoMailClient.transactionalEmails.sendTransacEmail({
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
            foodPreference: foodPreference,
        },
        attachment: [
            { content: qr_code, name: "ticket.png" }
        ]
    })
    console.log(`Ticket Confirmation mail sent. ID: ${res.messageId}`)
}
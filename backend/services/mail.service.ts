import path from "path";
import { brevoMailClient, mailtrapClient } from "../config/mail_config";
import fs from "fs"

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
            },

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


async function getSocialTicketImageBase64() {
    const appUrl = process.env.NODE_ENV == "production" ? process.env.SITE_URL : 'http://localhost:3000';
    const imageResponse = await fetch(`${appUrl}/connect-social-ticket.png`);
    if (!imageResponse.ok) {
        throw new Error("Failed to load logo.png from public directory");
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const socialTicketImage = Buffer.from(arrayBuffer).toString('base64');
    return socialTicketImage;
}

export async function sendTicketConfirmedMail({ name, email, ticket_number, attendee_type, organization, qr_code, foodPreference }: { name: string, email: string, ticket_number: string, attendee_type: string, organization: string, qr_code: string, foodPreference: string }): Promise<void> {
    let socialTicketImageBase64 = null
    try {
        socialTicketImageBase64 = await getSocialTicketImageBase64();
    } catch (e) {
        socialTicketImageBase64 = null
    }
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
            }, attachments: socialTicketImageBase64 ? [
                { content: qr_code, filename: "ticket.png" },
                { content: socialTicketImageBase64, filename: "InnovateX Connect-26-Ticket.png", }
            ] : [{ content: qr_code, filename: "ticket.png" },]
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
        attachment: socialTicketImageBase64 ? [
            { content: qr_code, name: "ticket.png", },
            { content: socialTicketImageBase64, name: "InnovateX Connect-26-Ticket.png" }
        ] : [{ content: qr_code, name: "ticket.png", }]
    })
    console.log(`Ticket Confirmation mail sent. ID: ${res.messageId}`)
}
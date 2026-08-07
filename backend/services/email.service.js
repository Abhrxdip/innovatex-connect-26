import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({ to, subject, html, attachments = [] }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return false;
  }

  try {
    await transporter.sendMail({
      from: `"InnovateX Connect" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    });
    return true;
  } catch (error) {
    return false;
  }
}

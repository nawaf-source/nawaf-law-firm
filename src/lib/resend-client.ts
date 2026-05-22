import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.warn("[resend] RESEND_API_KEY not set — emails will fail.");
}
export const resend = new Resend(apiKey);

export const EMAIL_FROM = process.env.RESEND_FROM || "مكتب المالكي <noreply@law-2030.com>";
export const EMAIL_TO = process.env.CONTACT_EMAIL || "nawaf@law-2030.com";

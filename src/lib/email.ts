import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  try {
    console.log("Sending email to:", to);
    const data = await resend.emails.send({
      from: "Next e-Shop <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
    console.log("Resend response:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error };
  }
};

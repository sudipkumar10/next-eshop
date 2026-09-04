import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300, // 5 minutes
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          // Send the OTP for sign in
          void sendEmail({
            to: email,
            subject: "Your Sign-In OTP",
            html: `<div><p>Your sign-in code is:</p><h1>${otp}</h1></div>`,
          });
        } else if (type === "email-verification") {
          // Send the OTP for email verification
          void sendEmail({
            to: email,
            subject: "Verify your email address",
            html: `<div><p>Your email verification code is:</p><h1>${otp}</h1></div>`,
          });
        } else {
          // Send the OTP for password reset
          void sendEmail({
            to: email,
            subject: "Reset your password",
            html: `<div><p>Your password reset code is:</p><h1>${otp}</h1></div>`,
          });
        }
      },
    }),
  ],
});

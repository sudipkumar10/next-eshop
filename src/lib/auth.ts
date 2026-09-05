import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { sendEmail } from "@/lib/email";
import db from "./db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          void sendEmail({
            to: email,
            subject: "Your Sign-In OTP",
            html: `<div><p>Your sign-in code is:</p><h1>${otp}</h1></div>`,
          });
        } else if (type === "email-verification") {
          void sendEmail({
            to: email,
            subject: "Verify your email address",
            html: `<div><p>Your email verification code is:</p><h1>${otp}</h1></div>`,
          });
        } else {
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

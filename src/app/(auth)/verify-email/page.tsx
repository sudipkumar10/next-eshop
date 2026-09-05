"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { OtpVerificationForm } from "@/components/auth/OtpVerificationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const typeParam = searchParams.get("type") || "signin";

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const targetTime = sessionStorage.getItem("otp_cooldown_target");
    if (targetTime) {
      const remaining = Math.ceil((Number(targetTime) - Date.now()) / 1000);
      if (remaining > 0) {
        setCountdown(remaining);
      } else {
        sessionStorage.removeItem("otp_cooldown_target");
      }
    } else {
      const initialTarget = Date.now() + 60 * 1000;
      sessionStorage.setItem("otp_cooldown_target", initialTarget.toString());
      setCountdown(60);
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            sessionStorage.removeItem("otp_cooldown_target");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleVerifyOtp = async (otp: string) => {
    if (!emailParam) {
      toast.error("Email is missing. Please try again.");
      router.push("/sign-in");
      return;
    }

    setIsVerifying(true);

    try {
      let error;

      if (typeParam === "signup") {
        const res = await authClient.emailOtp.verifyEmail({
          email: emailParam,
          otp,
        });
        error = res.error;
      } else {
        const res = await authClient.signIn.emailOtp({
          email: emailParam,
          otp,
        });
        error = res.error;
      }

      if (error) {
        toast.error(error.message || "Incorrect verification code provided.");
        setIsVerifying(false);
        return;
      }

      sessionStorage.removeItem("otp_cooldown_target");
      toast.success(
        typeParam === "signup"
          ? "Account verified successfully! 🎉"
          : "Device verified successfully! 🎉",
      );
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.");
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!emailParam || countdown > 0) return;

    setIsResending(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: emailParam,
        type: typeParam === "signup" ? "email-verification" : "sign-in",
      });

      setIsResending(false);

      if (error) {
        toast.error(error.message || "Failed to resend code.");
        return;
      }

      toast.success("New verification code sent to your email!");

      const target = Date.now() + 60 * 1000;
      sessionStorage.setItem("otp_cooldown_target", target.toString());
      setCountdown(60);
    } catch (err: any) {
      setIsResending(false);
      toast.error(err?.message || "Failed to resend code.");
    }
  };

  const handleBack = () => {
    sessionStorage.removeItem("otp_cooldown_target");
    router.push(typeParam === "signup" ? "/sign-up" : "/sign-in");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {typeParam === "signup"
              ? "Confirm your email"
              : "Device verification"}
          </CardTitle>
          <CardDescription>
            {emailParam
              ? `Enter the 6-digit code sent to ${emailParam}`
              : "Enter your verification code"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OtpVerificationForm
            email={emailParam}
            onVerify={handleVerifyOtp}
            onBack={handleBack}
            isVerifying={isVerifying}
          />

          <div className="text-center text-sm text-muted-foreground mt-2">
            {"Didn't get your email? "}
            {countdown > 0 ? (
              <span className="text-muted-foreground font-medium">
                Resend code in{" "}
                <span className="font-semibold text-foreground">
                  {countdown}s
                </span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-primary underline hover:text-primary/80 disabled:opacity-50"
              >
                {isResending ? "Resending..." : "Resend the code"}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

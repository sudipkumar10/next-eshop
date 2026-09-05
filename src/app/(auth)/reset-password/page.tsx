"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = yup
  .object({
    otp: yup
      .string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isVerified = sessionStorage.getItem("reset_email_verified");
    if (!isVerified || !emailParam) {
      toast.error(
        "Unauthorized access. Please request a password reset first.",
      );
      router.push("/forgot-password");
    }
  }, [emailParam, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormData) => {
    if (!emailParam) {
      toast.error(
        "Email is missing. Please restart the password reset process.",
      );
      router.push("/forgot-password");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.resetPassword({
        email: emailParam,
        otp: data.otp,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Invalid or expired OTP code.");
        setIsLoading(false);
        return;
      }

      sessionStorage.removeItem("reset_email_verified");

      setIsLoading(false);
      toast.success("Password reset successfully! Please sign in.");
      router.push("/sign-in");
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            {emailParam
              ? `Enter the 6-digit code sent to ${emailParam} and your new password.`
              : "Enter your verification code and new password."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                maxLength={6}
                placeholder="123456"
                {...register("otp")}
              />
              {errors.otp && (
                <p className="text-xs text-red-500">{errors.otp.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Resetting password..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}

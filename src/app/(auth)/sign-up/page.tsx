"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = yup
  .object({
    name: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "verify">("form");
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Step 1: Sign Up and trigger verification OTP
  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (error) {
        toast.error(error.message || "Something went wrong during signup.");
        return;
      }

      // Trigger OTP for email verification
      const { error: otpError } = await authClient.emailOTP.sendVerificationOtp(
        {
          email: data.email,
          type: "email-verification",
        },
      );

      if (otpError) {
        toast.error(otpError.message || "Failed to send verification OTP.");
        return;
      }

      setUserEmail(data.email);
      toast.success(
        "Account created! Please enter the OTP sent to your email.",
      );
      setStep("verify");
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const { error } = await authClient.emailOTP.verifyEmail({
        email: userEmail,
        otp,
      });

      if (error) {
        toast.error(error.message || "Invalid OTP");
        setIsVerifying(false);
        return;
      }

      toast.success("Email verified and signed up successfully! 🎉");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {step === "form" ? "Sign Up" : "Verify Email"}
          </CardTitle>
          <CardDescription>
            {step === "form"
              ? "Create a new account to get started"
              : `Enter the 6-digit code sent to ${userEmail}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "form" ? (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign Up & Verify"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  className="text-center tracking-widest text-lg font-mono"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify & Proceed"}
              </Button>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-xs text-center text-muted-foreground hover:text-primary mt-2"
              >
                ← Back to sign up details
              </button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          {step === "form" && (
            <p>
              {"Already have an account?"}{" "}
              <Link href="/sign-in" className="underline text-primary">
                Sign in
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

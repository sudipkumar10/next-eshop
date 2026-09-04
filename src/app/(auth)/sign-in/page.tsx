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
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function SigninPage() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "verify">("credentials");
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

  // Step 1: Normal Sign In attempt
  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: false,
      });

      if (error) {
        // Agar email unverified hone ki wajah se error aaye, toh OTP trigger kar sakte hain
        if (
          error.status === 403 ||
          error.message?.toLowerCase().includes("verify")
        ) {
          setUserEmail(data.email);

          // OTP bhejein
          const { error: otpError } =
            await authClient.emailOTP.sendVerificationOtp({
              email: data.email,
              type: "sign-in", // ya "email-verification"
            });

          if (otpError) {
            toast.error(otpError.message || "Failed to send verification OTP.");
            return;
          }

          toast.success("Please verify with the OTP sent to your email.");
          setStep("verify");
          return;
        }

        toast.error(error.message || "Something went wrong during sign in.");
        return;
      }

      toast.success("Signed in successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.");
    }
  };

  // Step 2: Verify OTP and complete Sign In
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const { error } = await authClient.signIn.emailOtp({
        email: userEmail,
        otp,
      });

      if (error) {
        toast.error(error.message || "Invalid OTP");
        setIsVerifying(false);
        return;
      }

      toast.success("Signed in successfully! 🎉");
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
            {step === "credentials" ? "Sign In" : "Verify OTP"}
          </CardTitle>
          <CardDescription>
            {step === "credentials"
              ? "Enter your credentials to access your account"
              : `Enter the 6-digit code sent to ${userEmail}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "credentials" ? (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="otp">OTP Code</Label>
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
                {isVerifying ? "Verifying..." : "Verify & Sign In"}
              </Button>

              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="text-xs text-center text-muted-foreground hover:text-primary mt-2"
              >
                ← Back to sign in credentials
              </button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          {step === "credentials" && (
            <p>
              {"Don't have an account?"}{" "}
              <Link href="/sign-up" className="underline text-primary">
                Sign up
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

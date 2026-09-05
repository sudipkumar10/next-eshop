"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const otpSchema = yup
  .object({
    otp: yup
      .string()
      .required("OTP is required")
      .length(6, "OTP must be exactly 6 digits")
      .matches(/^[0-9]+$/, "OTP must contain only numbers"),
  })
  .required();

type OtpFormData = yup.InferType<typeof otpSchema>;

interface OtpVerificationFormProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onBack: () => void;
  isVerifying: boolean;
}

export function OtpVerificationForm({
  email,
  onVerify,
  onBack,
  isVerifying,
}: OtpVerificationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpFormData) => {
    await onVerify(data.otp);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="otp">OTP Code</Label>
        <Input
          id="otp"
          type="text"
          maxLength={6}
          placeholder="123456"
          autoComplete="one-time-code"
          className="text-center tracking-widest text-lg font-mono"
          {...register("otp")}
        />
        {errors.otp && (
          <p className="text-xs text-red-500">{errors.otp.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isVerifying}>
        {isVerifying ? "Verifying..." : "Verify"}
      </Button>

      <button
        type="button"
        onClick={onBack}
        className="text-xs text-center text-muted-foreground hover:text-primary mt-2"
      >
        ← Back to sign in credentials
      </button>
    </form>
  );
}

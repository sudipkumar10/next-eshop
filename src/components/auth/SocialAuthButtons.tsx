"use client";

import { useState } from "react";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { FaGithub as GithubIcon } from "react-icons/fa";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface SocialAuthButtonsProps {
  mode?: "signin" | "signup";
}

export function SocialAuthButtons({ mode = "signin" }: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<
    "github" | "google" | null
  >(null);

  const handleSocialLogin = async (provider: "github" | "google") => {
    setLoadingProvider(provider);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || `Failed to sign in with ${provider}`);
        setLoadingProvider(null);
      }
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.");
      setLoadingProvider(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <Button
        variant="outline"
        type="button"
        disabled={loadingProvider !== null}
        onClick={() => handleSocialLogin("google")}
        className="w-full flex items-center gap-2"
      >
        <GoogleIcon className="w-4 h-4" />
        <span>{loadingProvider === "google" ? "Connecting..." : "Google"}</span>
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={loadingProvider !== null}
        onClick={() => handleSocialLogin("github")}
        className="w-full flex items-center gap-2"
      >
        <GithubIcon className="w-4 h-4" />
        <span>{loadingProvider === "github" ? "Connecting..." : "GitHub"}</span>
      </Button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
            router.refresh();
          },
        },
      });

      if (error) {
        toast.error(error.message || "Failed to sign out.");
        setIsLoading(false);
        return;
      }

      toast.success("Signed out successfully!");
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err?.message || "An unexpected error occurred.");
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleSignOut}
      className="w-full mt-2"
      disabled={isLoading}
    >
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileSettings } from "@/components/dashboard/ProfileSettings";
import { ChangePassword } from "@/components/dashboard/ChangePassword";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col p-6 bg-muted/40">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <div className="space-y-6">
        <ProfileSettings user={session.user} />
        <ChangePassword />
      </div>
    </div>
  );
}

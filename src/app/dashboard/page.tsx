import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings, UserCircle } from "lucide-react";

export default async function DashboardPage() {
  // Absolute secure server-side session validation
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 bg-muted/40">
      <Card className="w-full max-w-md shadow-sm border">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
            <UserCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardDescription>
            Welcome back,{" "}
            <span className="font-medium text-foreground">
              {session.user.name}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Account Details
            </p>
            <p className="font-medium text-foreground truncate">
              {session.user.email}
            </p>
          </div>

          {/* Navigation to Settings */}
          <Button variant="outline" className="w-full justify-start gap-2">
            <Link href="/dashboard/settings">
              <Settings className="w-4 h-4" />
              Account Settings
            </Link>
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-0">
          <SignOutButton />
        </CardFooter>
      </Card>
    </div>
  );
}

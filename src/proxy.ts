import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected and auth paths
  const isProtectedPath = path.startsWith("/dashboard");
  const isAuthPath =
    path.startsWith("/sign-in") ||
    path.startsWith("/sign-up") ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/reset-password");

  // Retrieve Better Auth session cookie securely
  const sessionCookie = getSessionCookie(request);

  // If trying to access protected route without a session
  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If trying to access auth pages while already logged in
  if (isAuthPath && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/dashboard/:path*",
  ],
};

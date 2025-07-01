import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for the session token cookie (JWT strategy)
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // If no token, redirect to sign-in
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Optionally, specify which paths to protect
export const config = {
  matcher: ["/protected/:path*", "/dashboard/:path*"], // Update as needed
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mock Auth Middleware for MVP
// In production, implement Clerk/Supabase validation here
export function middleware(request: NextRequest) {
  // 1. Check for session token
  const token = request.cookies.get("session_token");

  // 2. Define protected routes
  const protectedPaths = ["/dashboard", "/admin", "/api/generate"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // Redirect to login if unauthenticated
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. (Optional) Check roles for specific paths like /admin
  // const userRole = decode(token).role; ...

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

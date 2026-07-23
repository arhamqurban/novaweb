// ============================================================
// Nova Webs — Auth Middleware
// Protects admin routes and API endpoints
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/admin/login",
  "/api/admin/auth/login",
  "/api/admin/auth/logout",
  "/api/admin/auth/debug",
  "/api/admin/setup",
  "/_next",
  "/favicon",
  "/images",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Protect admin routes — check cookie exists (no JWT verify on Edge)
  // Full JWT verification happens in route handlers & layout (Node.js runtime)
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("nova-auth-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // Protect API routes
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("nova-auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};

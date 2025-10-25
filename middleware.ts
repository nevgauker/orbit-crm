import { NextRequest, NextResponse } from "next/server";

// Public API routes that do not require auth
const PUBLIC_API = [
  /^\/api\/auth\//,
  /^\/api\/invite(\/.*)?$/,
  /^\/api\/dev$/,
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard API routes
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow public API endpoints
  const isPublic = PUBLIC_API.some((re) => re.test(pathname));
  if (isPublic) return NextResponse.next();

  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Forward the token to the route handler for server-side verification
  const token = authHeader.split(" ")[1];
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-access-token", token);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: "/api/:path*",
};


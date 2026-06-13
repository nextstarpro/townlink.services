import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [
  "https://ios.townlink.app",
  "capacitor://localhost",
  "http://localhost:3001",
  "https://townlinkmobile.vercel.app",
];

export function middleware(request: NextRequest) {
  // Retrieve the Origin header from the request
  const origin = request.headers.get("origin") ?? "";

  // If the origin is in our allowed list, use it.
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const allowOrigin = isAllowedOrigin ? origin : null;

  // Handle preflight OPTIONS requests
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    if (allowOrigin) {
      response.headers.set("Access-Control-Allow-Origin", allowOrigin);
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      response.headers.set("Access-Control-Max-Age", "86400");
    }
    return response;
  }

  // Handle actual requests
  const response = NextResponse.next();
  if (allowOrigin) {
    response.headers.set("Access-Control-Allow-Origin", allowOrigin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  return response;
}

// Only run this middleware on API routes
export const config = {
  matcher: ["/api/:path*", "/.netlify/functions/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Site } from "./constants/enums";
import { stytch } from "./lib/stytch";

export async function middleware(req: NextRequest) {
  const session_token = req.cookies.get(Site.TOKEN)?.value;
  const pathname = req.nextUrl.pathname;

  // If user has a valid session and tries to access /login, redirect to /dashboard
  if (pathname === "/login" && session_token) {
    try {
      await stytch.sessions.authenticate({ session_token });
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch (err) {
      // Invalid token, fall through to show login page
    }
  }

  // Protect /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!session_token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await stytch.sessions.authenticate({ session_token });
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

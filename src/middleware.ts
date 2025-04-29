import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Site } from "./constants/enums";
import { stytch } from "./lib/stytch";

export async function middleware(req: NextRequest) {
  const session_token = req.cookies.get(Site.TOKEN)?.value;

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

export const config = {
  matcher: ["/dashboard/:path*"],
};

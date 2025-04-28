import { Site } from "@/constants/enums";
import { stytch } from "@/lib/stytch";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("🔥 Middleware is running...");

  return NextResponse.redirect(new URL("/login", req.url));

  //   const session_token = req.cookies.get(Site.TOKEN)?.value;

  //   if (!session_token) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  //   try {
  //     await stytch.sessions.authenticate({ session_token });
  //     return NextResponse.next();
  //   } catch (err) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

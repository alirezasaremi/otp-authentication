
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect on all routes
  }
  
  export const config = {
    matcher: ["/dashboard/:path*"], 
  };
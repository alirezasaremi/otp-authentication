
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    console.log("🔥 Middleware is running...");
    console.log("Request URL:", req.url);  // See which URL is triggering
  
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect on all routes
  }
  
  export const config = {
    matcher: ["/*"],  // Match any route for testing
  };
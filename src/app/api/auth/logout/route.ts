import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stytch } from "@/lib/stytch";
import { Site } from "@/constants/enums";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session_token = cookieStore.get(Site.TOKEN)?.value;

  if (session_token) {
    try {
      // Tell Stytch to revoke the session
      await stytch.sessions.revoke({ session_token });
    } catch (error) {
      console.error("Error revoking session at Stytch:", error);
      // Even if Stytch revoke fails, continue to clear cookie
    }
  }

  // Clear the session cookie locally
  (await cookies()).set(Site.TOKEN, "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  return NextResponse.json({ success: true });
}

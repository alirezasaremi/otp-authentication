
import { createCookie } from "@/lib/server/session";
import { stytch } from "@/lib/stytch";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, method_id } = await req.json();

  console.log(code, method_id);

  try {
    const response = await stytch.otps.authenticate({
      method_id,
      code,
      session_duration_minutes: 60,
    });

    createCookie(response.session_token);

    return NextResponse.json({
      success: true,
      session_token: response.session_token,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 401 });
  }
}

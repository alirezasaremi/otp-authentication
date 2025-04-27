import { Site } from "@/constants/enums";
import { stytch } from "@/lib/stytch";
import { cookies } from "next/headers";
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

    (await cookies()).set(Site.TOKEN, response.session_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

    return NextResponse.json({
      success: true,
      session_token: response.session_token,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 401 });
  }
}

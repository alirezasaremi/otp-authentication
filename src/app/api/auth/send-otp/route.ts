import { stytch } from "@/lib/stytch";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone } = await req.json();

  try {
    const otp = await stytch.otps.email.loginOrCreate({
      email: "saremi.alireza@gmail.com",
    });
    return NextResponse.json({
      success: true,
      data: { phone: phone, otp: otp },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

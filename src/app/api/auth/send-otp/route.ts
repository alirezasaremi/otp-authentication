import { OtpMethod } from "@/constants/enums";
import { stytch } from "@/lib/stytch";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { sender, type } = await req.json();

  try {
    let otp;
    if (type === OtpMethod.EMAIL) {
      otp = await stytch.otps.email.loginOrCreate({
        email: sender,
      });
    } else if (type === OtpMethod.MOBILE) {
      otp = await stytch.otps.sms.loginOrCreate({
        phone_number: sender,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid type",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { sender: sender, otp: otp },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

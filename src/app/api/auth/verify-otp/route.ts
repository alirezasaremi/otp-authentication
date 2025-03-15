import { NextResponse } from "next/server";
import { db } from "@/db";
import { z } from "zod";

const verifyOTPSchema = z.object({
  otpCode: z.string().regex(/^\d{6}$/, {
    message: "OTP must be at least 4 characters",
  }),
});

export async function POST(req: Request) {
  try {
    const { otpCode } = await req.json();

    const result = verifyOTPSchema.safeParse({
      otpCode: otpCode,
    });

    // validation
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: otpCode }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

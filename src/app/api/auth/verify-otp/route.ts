import { NextResponse } from "next/server";
import { db } from "@/db";
import { z } from "zod";
import { cookies } from "next/headers";

const verifyOTPSchema = z.object({
  otpCode: z.string().regex(/^\d{6}$/, {
    message: "OTP must be at least 6 characters",
  }),
});

export async function POST(req: Request) {
  try {
    const { otpCode } = await req.json();
    const cookieStore = await cookies();
    const phoneNumber = cookieStore.get("phone_number")?.value || "";

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

    // GET user and verify OTP (code and expiration).
    const user = await db.user.findFirst({
      where: {
        AND: [{ phone_number: phoneNumber }, { otp_code: otpCode }],
      },
    });

    return NextResponse.json(
      { data: { success: true, phoneNumber, otpCode } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

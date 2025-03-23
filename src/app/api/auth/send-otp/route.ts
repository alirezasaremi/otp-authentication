import { NextResponse } from "next/server";
import { db } from "@/db";
import { z } from "zod";

const sendOTPSchema = z.object({
  phoneNumber: z.string().regex(/^09\d{9}$/, {
    message: "Phone number must be exactly 11 digits and start with 09",
  }),
});

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();

    const result = sendOTPSchema.safeParse({
      phoneNumber: phoneNumber,
    });

    // validation
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // generate 6-digit otp
    const otpNumber = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("otpNumber", otpNumber);

    // insert phone number, otp and expire time to database
    try {
      // check if user exists
      const user = await db.user.findFirst({
        where: { phone_number: result.data.phoneNumber },
      });
      if (user) {
        // user exists, update user
        await db.user.update({
          where: { id: user.id },
          data: {
            otp_code: otpNumber,
            otp_expires: new Date(Date.now() + 1 * 60000), // 1 minutes from now
          },
        });
      } else {
        // user does not exist, create new user
        await db.user.create({
          data: {
            phone_number: result.data.phoneNumber,
            otp_code: otpNumber,
            otp_expires: new Date(Date.now() + 1 * 60000), // 1 minutes from now
          },
        });
      }
      const response = NextResponse.json(
        { data: { success: true } },
        { status: 200 }
      );

      // Store phone number in httpOnly cookie in bak-end to use it in verify-number page
      response.headers.set(
        "Set-Cookie",
        `phone_number=${result.data.phoneNumber}; HttpOnly; Secure; Path=/; Max-Age=300`
      ); //5 mins

      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      } else {
        return NextResponse.json(
          { error: "Something went wrong!" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

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
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
      // return NextResponse.json(
      //   { error: result.error.flatten().fieldErrors },
      //   { status: 400 }
      // );
    }

    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

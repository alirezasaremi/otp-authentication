import { db } from "@/db";
import { randomInt } from "crypto";

export async function POST(req: Request) {
  const { phone } = await req.json();

  const otp = randomInt(100000, 999999).toString(); // 6-digit OTP
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

  // Create user if not exist, or update if exists
  const user = await db.user.upsert({
    where: { phone_number: phone },
    update: {
      phone_number: phone,
    },
    create: {
      phone_number: phone,
    },
  });

  // Now that the user exists, create OTP
  const otpRecord = await db.oTP.create({
    data: {
      phone,
      code: otp,
      expiresAt,
    },
  });

  //   await sendSMS(phone, `Your OTP code is: ${otp}`);
  console.log(`Your OTP code is: ${otp}`);

  return Response.json({ success: true });
}

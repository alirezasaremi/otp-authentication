import { stytch } from "@/lib/stytch";
import { cookies } from "next/headers";
import { Site } from "@/constants/enums";
import { db } from "@/db";
import { createCookie } from "@/lib/server/session";

export async function POST(req: Request) {
  const { phone, code } = await req.json();

  const record = await db.oTP.findFirst({
    where: { phone },
    orderBy: { createdAt: "desc" },
  });

  if (!record || record.expiresAt < new Date() || record.code !== code) {
    return Response.json(
      { success: false, error: "Invalid or expired code" },
      { status: 401 }
    );
  }

  // Optionally: delete or expire the OTP
  await db.oTP.delete({ where: { id: record.id } });

  // Create or fetch user in Stytch
  const userCreateRes = await stytch.users.create({
    phone_number: phone,
    external_id: "alireza-external-id"
  });



  console.log(' ----> ', userCreateRes);

  // Create session manually
  //   const { session_token } = await stytch.sessions.create({
  //     user_id,
  //     session_duration_minutes: 60 * 24 * 7, // 7 days
  //   });

  const response = await stytch.sessions.authenticate({});

  console.log("---->", response);

  createCookie(response.session_token);

  return Response.json({ success: true });
}

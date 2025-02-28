"use server";

import { db } from "@/db";
import { z } from "zod";

const verifyOTPSchema = z.object({
  otpCode: z.string().regex(/^\d{6}$/, {
    message: "OTP must be at least 4 characters",
  }),
  phoneNumber: z.string().regex(/^09\d{9}$/, {
    message: "Phone number must be exactly 11 digits and start with 09",
  }),
});

interface VerifyOTPFormState {
  errors: {
    otpCode?: string[];
    _form?: string[];
  };
}

export async function verifyOTP(
  formState: VerifyOTPFormState,
  formData: FormData
): Promise<VerifyOTPFormState> {
  const result = verifyOTPSchema.safeParse({
    otpCode: formData.get("otpCode"),
    phoneNumber: formData.get("phoneNumber"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    // TODO: GET user and verify OTP (code and expiration).
    console.log(result.data.phoneNumber, result.data.otpCode);
    const user = await db.user.findFirst({
      where: {
        phone_number: result.data.phoneNumber,
      },
      //   where: {
      //     AND: [
      //       { phone_number: result.data.phoneNumber },
      //       { otp_code: result.data.otpCode },
      //     ],
      //   },
    });
    console.log(user);

    // TODO: Save JWT token.

    // TODO: Redirect to dashboard

    console.log("OTP Verified. Save token and Redirect to dashboard");
    return {
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: ["Failed to verify OTP"],
      },
    };
  }
}

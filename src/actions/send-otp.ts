"use server";

import { db } from "@/db";
import { z } from "zod";

const sendOTPSchema = z.object({
  phoneNumber: z.string().regex(/^09\d{9}$/, {
    message: "Phone number must be exactly 11 digits and start with 09",
  }),
});

interface SendOTPFormState {
  errors: {
    phoneNumber?: string[];
    _form?: string[];
  };
  success?: boolean;
  phoneNumber: string;
}

export async function sendOTP(
  formState: SendOTPFormState,
  formData: FormData
): Promise<SendOTPFormState> {
  const result = sendOTPSchema.safeParse({
    phoneNumber: formData.get("phoneNumber"),
  });

  // validation
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
      phoneNumber: "",
    };
  }

  // generate 6-digit otp
  const otpNumber = Math.floor(100000 + Math.random() * 900000).toString();

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
    console.log(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
        success: false,
        phoneNumber: "",
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong!"],
        },
        success: false,
        phoneNumber: "",
      };
    }
  }

  // TODO: send otp to phone number via sms

  return { errors: {}, success: true, phoneNumber: result.data.phoneNumber };
}

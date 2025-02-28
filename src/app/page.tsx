"use client";

import { useActionState } from "react";
import { sendOTP } from "@/actions/send-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyOTP } from "@/actions/verify-otp";
import PhoneNumberForm from "@/components/auth/PhoneNumberForm";
import OTPCodeForm from "@/components/auth/OTPCodeForm";

export default function Home() {
  const [phoneFormState, phoneAction] = useActionState(sendOTP, {
    errors: {},
    success: false,
    phoneNumber: "",
  });

  const [otpFormState, otpAction] = useActionState(verifyOTP, {
    errors: {},
  });

  return (
    <div className="container bg-slate-100">
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 min-h-48 mx-auto bg-white shadow-lg rounded-md p-4">
          {!phoneFormState.success ? (
            <PhoneNumberForm
              action={phoneAction}
              errors={phoneFormState.errors}
            />
          ) : (
            <OTPCodeForm
              action={otpAction}
              errors={otpFormState.errors}
              phoneNumber={phoneFormState.phoneNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useActionState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOTP } from "@/actions/verify-otp";
import { Button } from "@/components/ui/button";

const VerifyNumber = () => {
  const [formState, action] = useActionState(verifyOTP, {
    errors: {},
  });

  return (
    <div className="container bg-slate-100">
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 min-h-48 mx-auto bg-white shadow-lg rounded-md p-4">
          <h6 className="font-bold text-stone-700 mb-6 text-center">
            Enter verification code
          </h6>
          <form
            action={action}
            className="w-full flex flex-col items-center justify-center gap-3"
          >
            <InputOTP maxLength={6} name="otpCode">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {formState.errors.otpCode && (
              <p className="text-rose-500 text-xs text-left mt-1 w-full">
                {formState.errors.otpCode.join(", ")}
              </p>
            )}

            {formState.errors._form && (
              <p className="text-rose-500 text-xs text-left mt-1 w-full">
                {formState.errors._form.join(", ")}
              </p>
            )}

            <Button type="submit" className="mt-2 w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyNumber;

"use client";

import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const VerifyNumber = () => {
  const handleConfirmOTP = () => {
    console.log("handleConfirmOTP");
  };

  return (
    <div className="container bg-slate-100">
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 min-h-48 mx-auto bg-white shadow-lg rounded-md p-4">
          <h6 className="font-bold text-stone-700 mb-6 text-center">
            Enter verification code
          </h6>
          <form
            onSubmit={handleConfirmOTP}
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

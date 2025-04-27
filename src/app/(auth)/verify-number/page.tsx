"use client";

import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import useVerifyNumber from "@/hooks/api/useVerifyNumber";
import WaitingButton from "@/components/common/WaitingButton";
import Link from "next/link";

const VerifyNumber = () => {
  const [otpCode, setOTPCode] = useState("");
  const { isLoading, result, verifyNumber } = useVerifyNumber();

  const handleConfirmOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpCode && otpCode.length === 6) {
      verifyNumber(otpCode);
    }
  };

  useEffect(() => {
    if(result){
      console.log(result);
    }
  }, [result]);

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
            <InputOTP
              maxLength={6}
              name="otpCode"
              onChangeCapture={(e) => setOTPCode(e.currentTarget.value)}
            >
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
              <WaitingButton isLoading={isLoading} label="Login" />
            </Button>

            <Link href="/login" className="text-sky-600 text-sm mt-4">
              Change Number
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyNumber;

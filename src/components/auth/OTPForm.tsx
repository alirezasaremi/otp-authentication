import React, { useState } from "react";
import { Button } from "../ui/button";
import WaitingButton from "../common/WaitingButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { useAuthStore } from "@/store/useAuthStore";
import useVerifyOTP from "@/hooks/api/useVerifyOTP";

const OTPForm = () => {
  const { mobile, methodId } = useAuthStore((state) => state);
  const [otpCode, setOtpCode] = useState("");

  const { isLoading, response, verifyOTP } = useVerifyOTP();

  const handleSendOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpCode && otpCode.length === 6 && methodId) {
      verifyOTP(otpCode, methodId);
    }
  };

  return (
    <>
      <h6 className="font-semibold text-stone-600 mb-6 text-center">
        Enter verification code was sent to <br />
        <span className="font-bold text-black">{mobile}</span>
      </h6>
      <form
        className="w-full flex flex-col items-center justify-center gap-4"
        onSubmit={handleSendOTP}
      >
        <InputOTP
          maxLength={6}
          name="otpCode"
          onChangeCapture={(e) => setOtpCode(e.currentTarget.value)}
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
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !otpCode || otpCode.length !== 6}
        >
          <WaitingButton isLoading={isLoading} label="Login" />
        </Button>
      </form>
    </>
  );
};

export default OTPForm;

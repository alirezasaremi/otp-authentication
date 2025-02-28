import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";

interface OTPCodeFormProps {
  action: (FormData: FormData) => void;
  errors: {
    otpCode?: string[];
    _form?: string[];
  };
  phoneNumber: string;
}

const OTPCodeForm = ({ action, errors, phoneNumber }: OTPCodeFormProps) => {
  return (
    <>
      <h6 className="font-bold text-stone-700 mb-6 text-center">
        Enter verification code
      </h6>
      <p className="text-sm text-gray-600 mb-4 text-center">
        We sent a code to {phoneNumber}
      </p>
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

        <input type="hidden" name="phoneNumber" value={phoneNumber} />

        {errors.otpCode && (
          <p className="text-rose-500 text-xs text-left mt-1 w-full">
            {errors.otpCode.join(", ")}
          </p>
        )}

        {errors._form && (
          <p className="text-rose-500 text-xs text-left mt-1 w-full">
            {errors._form.join(", ")}
          </p>
        )}

        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>
    </>
  );
};

export default OTPCodeForm;

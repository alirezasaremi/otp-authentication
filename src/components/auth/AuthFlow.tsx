"use client";

import { useCallback, useState } from "react";
import { useActionState } from "react";
import { verifyOTP } from "@/actions/verify-otp";
import PhoneNumberForm from "./PhoneNumberForm";
import OTPCodeForm from "./OTPCodeForm";
import { sendOTP, SendOTPFormState } from "@/actions/send-otp";

const AuthFlow = () => {
  // Store the generated OTP data in component state
  const [otpData, setOtpData] = useState<{
    phoneNumber: string;
    timestamp: number;
  } | null>(null);

  // Wrap the sendOTP action to store the OTP data
  const handleSendOTP = useCallback(
    async (formState: SendOTPFormState, formData: FormData) => {
      const result = await sendOTP(formState, formData);
      if (result.success) {
        setOtpData({
          phoneNumber: result.phoneNumber,
          timestamp: Date.now(),
        });
      }
      return result;
    },
    []
  );

  const [phoneFormState, phoneAction] = useActionState(handleSendOTP, {
    errors: {},
    success: false,
    phoneNumber: "",
  });

  const [otpFormState, otpAction] = useActionState(verifyOTP, {
    errors: {},
  });

  return (
    <div className="w-96 min-h-48 mx-auto bg-white shadow-lg rounded-md p-4">
      {!otpData ? (
        <PhoneNumberForm action={phoneAction} errors={phoneFormState.errors} />
      ) : (
        <OTPCodeForm
          action={otpAction}
          errors={otpFormState.errors}
          phoneNumber={otpData.phoneNumber}
        />
      )}
    </div>
  );
};

export default AuthFlow;

"use client";

import React from "react";
import OTPForm from "@/components/auth/OTPForm";
import { useAuthStore } from "@/store/useAuthStore";
import { OtpMethod, OtpState } from "@/constants/enums";
import EmailForm from "@/components/auth/EmailForm";
import MobileCustomSMSForm from "@/components/auth/MobileCustomSMSForm";
import MobileSMSForm from "@/components/auth/MobileSMSForm";

const Login = () => {
  const { step, defaultMethod } = useAuthStore((state) => state);
  return (
    <div className="bg-slate-100">
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 min-h-48 mx-auto bg-white shadow-lg rounded-md p-4">
          {step === OtpState.SEND && (
            <>
              {defaultMethod === OtpMethod.EMAIL && <EmailForm />}
              {defaultMethod === OtpMethod.SMS && <MobileSMSForm />}
              {defaultMethod === OtpMethod.CUSTOM_SMS && (
                <MobileCustomSMSForm />
              )}
            </>
          )}
          {step === OtpState.VERIFY && <OTPForm />}
        </div>
      </div>
    </div>
  );
};

export default Login;

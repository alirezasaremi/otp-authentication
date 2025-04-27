"use client";

import React from "react";
import OTPForm from "@/components/auth/OTPForm";
import { useAuthStore } from "@/store/useAuthStore";
import { OtpState } from "@/constants/enums";
import EmailForm from "@/components/auth/EmilForm";

const Login = () => {
  const { step } = useAuthStore((state) => state);
  return (
    <div className="bg-slate-100">
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 min-h-48 mx-auto bg-white shadow-lg rounded-md p-4">
          {step === OtpState.SEND && (
            <EmailForm />
          )}
          {step === OtpState.VERIFY && <OTPForm />}
        </div>
      </div>
    </div>
  );
};

export default Login;

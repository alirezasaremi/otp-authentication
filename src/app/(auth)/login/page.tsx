"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import WaitingButton from "@/components/common/WaitingButton";
import MobileForm from "@/components/auth/MobileForm";
import OTPForm from "@/components/auth/OTPForm";
import { useAuthStore } from "@/store/useAuthStore";
import { OtpState } from "@/constants/enums";

const Login = () => {
  const { step } = useAuthStore((state) => state);
  return (
    <div className="bg-slate-100">
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 min-h-48 mx-auto bg-white shadow-lg rounded-md p-4">
          {step === OtpState.SEND && (
            <MobileForm />
          )}
          {step === OtpState.VERIFY && <OTPForm />}
        </div>
      </div>
    </div>
  );
};

export default Login;

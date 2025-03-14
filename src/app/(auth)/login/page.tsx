"use client";

import React, { useActionState, useState } from "react";
import { sendOTP } from "@/actions/send-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSendOTP from "@/hooks/api/useSendOTP";
import WaitingButton from "@/components/common/WaitingButton";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const { isLoading, sendOTP } = useSendOTP();

  const handleSendOTPSendOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phoneNumber) {
      sendOTP(phoneNumber);
    }
  };

  return (
    <div className="container bg-slate-100">
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 min-h-48 mx-auto bg-white shadow-lg rounded-md p-4">
          <h6 className="font-bold text-stone-700 mb-6 text-center">
            Enter your phone number to continue
          </h6>
          <form
            onSubmit={handleSendOTPSendOTP}
            className="w-full flex flex-col items-center justify-center gap-3"
          >
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <Button type="submit" className="w-full">
              <WaitingButton isLoading={isLoading} label="Continue" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

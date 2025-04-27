import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import WaitingButton from "../common/WaitingButton";
import useSendOTP from "@/hooks/api/useSendOTP";
import { useAuthStore } from "@/store/useAuthStore";
import { OtpMethod, OtpState } from "@/constants/enums";
import { validateEmail } from "@/lib/validation";

const EmailForm = () => {
  const { setStep, setSender, setMethodId } = useAuthStore((state) => state);
  const [email, setEmail] = useState("");

  const { isLoading, response, sendOTP } = useSendOTP();

  const handleSendOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && validateEmail(email)) {
      setSender(email);
      sendOTP(email, OtpMethod.EMAIL);
    }
  };

  useEffect(() => {
    if (response) {
      setStep(OtpState.VERIFY);
      setMethodId(response.data.otp.email_id);
    }
  }, [response]);

  return (
    <>
      <h6 className="font-bold text-stone-700 mb-6 text-center">
        Enter your email to continue
      </h6>
      <form
        className="w-full flex flex-col items-center justify-center gap-3"
        onSubmit={handleSendOTP}
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !email || !validateEmail(email)}
        >
          <WaitingButton isLoading={isLoading} label="Continue" />
        </Button>
      </form>
    </>
  );
};

export default EmailForm;

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import WaitingButton from "../common/WaitingButton";
import { useAuthStore } from "@/store/useAuthStore";
import { OtpMethod, OtpState } from "@/constants/enums";
import useSendCustomOTP from "@/hooks/api/useSendCustomOTP";

const MobileCustomSMSForm = () => {
  const { setStep, setSender } = useAuthStore((state) => state);
  const [phoneNumber, setPhoneNumber] = useState("");

  const { isLoading, response, sendOTP } = useSendCustomOTP();

  const handleSendOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneNumber) {
      setSender(phoneNumber);
      sendOTP(phoneNumber, OtpMethod.CUSTOM_SMS);
    }
  };

  useEffect(() => {
    if (response) {
      setStep(OtpState.VERIFY);
      console.log(response);
    }
  }, [response]);

  return (
    <>
      <h6 className="font-bold text-stone-700 mb-6 text-center">
        Enter your phone number to continue
      </h6>
      <form
        className="w-full flex flex-col items-center justify-center gap-3"
        onSubmit={handleSendOTP}
      >
        <Input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !phoneNumber}
        >
          <WaitingButton isLoading={isLoading} label="Continue" />
        </Button>
      </form>
    </>
  );
};

export default MobileCustomSMSForm;

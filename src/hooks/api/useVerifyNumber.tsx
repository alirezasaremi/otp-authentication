import { signIn } from "@/auth";
import { instance } from "@/services/fetcher";
import React, { useState } from "react";
import { set } from "zod";

const useVerifyNumber = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  const verifyNumber = async (otpCode: string) => {
    setIsLoading(true);
    await instance
      .post("/auth/verify-otp", {
        otpCode,
      })
      .then((response) => {
        setResult(response.data.data);
        // const result = await signIn("credentials", {
        //   phoneNumber: response.data.data.phoneNumber,
        //   otp: response.data.data.otpCode,
        //   redirect: false,
        // });
        // if (result?.error) {
        //   console.error(result.error);
        // } else {
        //   console.log('redirect to dashboard')
        // }
      })
      .catch((error: any) => {
        if (error.response) {
          console.log("Error:", error.response.data.error.otpCode[0]);
        } else {
          console.error(error.message || "Unexpected Error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { isLoading, result, verifyNumber };
};

export default useVerifyNumber;

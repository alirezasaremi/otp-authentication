import { instance } from "@/services/fetcher";
import React, { useState } from "react";

const useVerifyNumber = () => {
  const [isLoading, setIsLoading] = useState(false);
  const verifyNumber = async (otpCode: string) => {
    setIsLoading(true);
    await instance
      .post("/auth/verify-otp", {
        otpCode,
      })
      .then((response) => {
        console.log(response.data.data.success);
      })
      .catch((error: any) => {
        if (error.response) {
            console.log(error.response.data)
        //   console.log("Error:", error.response.data.error.otpCode[0]);
        } else {
          console.error(error.message || "Unexpected Error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { isLoading, verifyNumber };
};

export default useVerifyNumber;

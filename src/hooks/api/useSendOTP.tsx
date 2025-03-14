import { useState } from "react";
import { instance } from "@/services/fetcher";

const useSendOTP = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async (phoneNumber: string) => {
    setIsLoading(true);
    await instance
      .post("/auth/send-otp", {
        phoneNumber,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { isLoading, sendOTP };
};

export default useSendOTP;

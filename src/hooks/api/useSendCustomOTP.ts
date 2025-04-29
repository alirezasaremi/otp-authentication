
import { instance } from "@/services/fetcher";
import { useState } from "react";

const useSendCustomOTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const sendOTP = async (phone: string, type: string) => {
    setIsLoading(true);
    setResponse(null);

    await instance
      .post("/auth/send-custom-otp", { phone, type })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, response, sendOTP };
};

export default useSendCustomOTP;


import { instance } from "@/services/fetcher";
import { useState } from "react";

const useSendOTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const sendOTP = async (sender: string, type: string) => {
    setIsLoading(true);
    setResponse(null);

    await instance
      .post("/auth/send-otp", { sender, type })
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

export default useSendOTP;

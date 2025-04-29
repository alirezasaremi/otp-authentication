import { instance } from "@/services/fetcher";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useVerifyCustomOTP = () => {
  const router = useRouter();
  const { sender } = useAuthStore((state) => state);
  const [loading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const verifyCustomOTP = async (code: string) => {
    setIsLoading(true);
    setResponse(null);

    await instance
      .post("/auth/verify-custom-otp", { code, phone: sender })
      .then((res) => {
        setResponse(res.data);
        router.push("/dashboard");
      })
      .catch((err) => {
        console.error(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { loading, response, verifyCustomOTP };
};

export default useVerifyCustomOTP;

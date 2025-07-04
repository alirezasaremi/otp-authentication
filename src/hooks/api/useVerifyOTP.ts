import { instance } from "@/services/fetcher";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useVerifyOTP = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const verifyOTP = async (code: string, method_id?: string) => {
    setIsLoading(true);
    setResponse(null);

    await instance
      .post("/auth/verify-otp", { code, method_id })
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

  return { isLoading, response, verifyOTP };
};

export default useVerifyOTP;

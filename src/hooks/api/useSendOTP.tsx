import { useState } from "react";
import { instance } from "@/services/fetcher";
import { useRouter  } from "next/navigation";

const useSendOTP = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async (phoneNumber: string) => {
    setIsLoading(true);
    await instance
      .post("/auth/send-otp", {
        phoneNumber,
      })
      .then((response) => {
        if(response.data.data.success){
          router.push('/verify-number')
        }
      })
      .catch((error: any) => {
        if (error.response) {
          console.log("Error:", error.response.data.error.phoneNumber[0]);
        } else {
          console.error(error.message || "Unexpected Error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { isLoading, sendOTP };
};

export default useSendOTP;

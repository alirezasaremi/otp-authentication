import { instance } from "@/services/fetcher";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const logout = async () => {
    setIsLoading(true);
    setResponse(null);

    await instance
      .post("/auth/logout", {})
      .then((res) => {
        setResponse(res.data);
        router.push("/login");
      })
      .catch((err) => {
        console.error(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, response, logout };
};

export default useLogout;

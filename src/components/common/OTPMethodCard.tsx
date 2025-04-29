"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OTPMethod } from "@/types/otp";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const OTPMethodCard = ({ method }: { method: OTPMethod }) => {
  const router = useRouter();
  const { setDefaultMethod } = useAuthStore((state) => state);

  const handleTry = () => {
    setDefaultMethod(method.method);
    router.push("/login");
  };

  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>{method.title}</CardTitle>
        <CardDescription>{method.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{method.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-4">
        <div className="w-full min-h-12 text-sm">{method.footer}</div>
        <Button className="w-full" onClick={handleTry}>
          Try
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OTPMethodCard;

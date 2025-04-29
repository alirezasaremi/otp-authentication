import OTPMethodCard from "@/components/common/OTPMethodCard";
import { OTPMethods } from "@/constants/otp";
import React from "react";


const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <div className="px-8 my-6 flex flex-col lg:flex-row gap-4">
        {
          OTPMethods.map((method) => {
            return <OTPMethodCard key={method.id} method={method} />
          })
        }
      </div>
    </div>
  );
};

export default Dashboard;

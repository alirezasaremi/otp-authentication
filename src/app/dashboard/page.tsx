"use client";

import WaitingButton from "@/components/common/WaitingButton";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/api/useLogout";
import React from "react";

const Dashboard = () => {

  const { isLoading, logout } = useLogout();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-lg">Welcome to the dashboard!</p>
      <Button
        type="button"
        variant="destructive"
        className="mt-4"
        onClick={logout}
      >
        <WaitingButton isLoading={isLoading} label="Logout" />
      </Button>
    </div>
  );
};

export default Dashboard;

'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-lg">Welcome to the dashboard!</p>
      <Button
        type="button"
        variant="destructive"
        className="mt-4"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;

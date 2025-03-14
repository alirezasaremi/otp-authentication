"use client";

import withAuth from "@/HOCs/withAuth";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default withAuth(Dashboard);

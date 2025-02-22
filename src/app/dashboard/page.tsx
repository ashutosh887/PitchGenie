"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
      <SignOutButton>
        <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/80">
          Logout
        </Button>
      </SignOutButton>
    </div>
  );
};

export default Dashboard;

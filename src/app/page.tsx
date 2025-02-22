"use client";

import { Button } from "@/components/ui/button";
import appConfig from "../config/appConfig";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    router.push(appConfig.redirectAfterSignIn || "/dashboard");
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background text-foreground px-4">
      <h1 className="text-4xl font-bold text-primary">{appConfig.appName}</h1>
      <h2 className="text-lg mt-2 text-muted-foreground">
        {appConfig.appDescription}
      </h2>
      <Button
        className="mt-6 bg-primary text-primary-foreground hover:bg-primary/80"
        onClick={() => router.push("/sign-in")}
      >
        Get Started
      </Button>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import appConfig from "../config/appConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-4 text-foreground bg-background">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-primary">
          Pitch Genie - Your AI-Powered Deal Closer
        </h1>
        <p className="text-lg mt-4 text-muted-foreground">
          Let AI find leads, craft perfect pitches, and follow up—so you can
          focus on closing deals and growing revenue.
        </p>
        <Button
          className="mt-6 bg-primary text-primary-foreground hover:bg-primary/80"
          onClick={() => router.push(appConfig.appRoutes.signIn || "/sign-in")}
        >
          Secure Your Spot—Start Closing Deals Now!
        </Button>
      </section>

      {/* Why Pitch Genie Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full h-screen items-center">
        <div className="text-left">
          <h2 className="text-3xl font-semibold text-primary">
            Why Pitch Genie?
          </h2>
          <ul className="mt-4 text-lg text-muted-foreground space-y-3">
            <li>
              ✅ Effortless Outreach – AI-driven, hyper-personalized messages
              that grab attention.
            </li>
            <li>
              ✅ Follow-Ups on Autopilot – Never let a lead slip through the
              cracks.
            </li>
            <li>
              ✅ Seamless CRM Sync – Works with HubSpot, Salesforce & more.
            </li>
            <li>
              ✅ Smart Sales Insights – AI-powered analytics to optimize
              conversions.
            </li>
          </ul>
          <Button
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary/80"
            onClick={() =>
              router.push(appConfig.appRoutes.signIn || "/sign-in")
            }
          >
            Don’t Get Left Behind—Try Pitch Genie Today!
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <img src="/pg.png" alt="AI Sales" className="w-full max-w-md" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full h-screen items-center">
        <div className="flex justify-center items-center">
          <img src="/pg.png" alt="How It Works" className="w-full max-w-md" />
        </div>
        <div className="text-left">
          <h2 className="text-3xl font-semibold text-primary">How It Works</h2>
          <ul className="mt-4 text-lg text-muted-foreground space-y-3">
            <li>
              🔍 Find Hot Leads – AI scans & qualifies top prospects instantly.
            </li>
            <li>
              ✉️ Perfect Your Pitch – AI crafts personalized, engaging outreach.
            </li>
            <li>
              🚀 Close More Deals – Smart automation keeps the conversation
              going.
            </li>
          </ul>
          <Button
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary/80"
            onClick={() =>
              router.push(appConfig.appRoutes.signIn || "/sign-in")
            }
          >
            The Future of Sales Is Here—Claim Your Access!
          </Button>
        </div>
      </section>
    </div>
  );
}

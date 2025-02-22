import { Button } from "@/components/ui/button";
import appConfig from "../config/appConfig";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background text-foreground px-4">
      <h1 className="text-4xl font-bold text-primary">{appConfig.appName}</h1>
      <h2 className="text-lg mt-2 text-muted-foreground">
        {appConfig.appDescription}
      </h2>
      <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/80">
        Get Started
      </Button>
    </div>
  );
}

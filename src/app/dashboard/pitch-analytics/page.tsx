"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from "recharts";
import { BrainIcon } from "lucide-react";
import { elevenLabsOptimizePitch } from "@/lib/elevenlabs";

const mockData = [
  { name: "Pitch 1", openRate: 70, replyRate: 30 },
  { name: "Pitch 2", openRate: 50, replyRate: 20 },
  { name: "Pitch 3", openRate: 90, replyRate: 50 },
];

const UtilityPage = () => {
  const [optimizedPitch, setOptimizedPitch] = useState("");

  const handleOptimizePitch = async () => {
    const result = await elevenLabsOptimizePitch();
    setOptimizedPitch(result);
  };

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-3xl font-bold">Pitch Analytics</h1>
      <p className="text-lg">
        Analyze and optimize your sales pitches using AI.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {/* Open & Reply Rates */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Open & Reply Rates</h2>
            <BarChart width={400} height={200} data={mockData} />
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Top Performing Pitches</h2>
            <ul>
              {mockData.map((pitch, index) => (
                <li key={index} className="mt-2">
                  {pitch.name}: {pitch.replyRate}% replies
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Optimize Pitch Button */}
      <Button onClick={handleOptimizePitch} className="mt-4 flex items-center">
        <BrainIcon className="w-5 h-5 mr-2" /> Optimize Pitch with AI
      </Button>
      {optimizedPitch && (
        <p className="mt-4">Optimized Pitch: {optimizedPitch}</p>
      )}
    </div>
  );
};

export default UtilityPage;

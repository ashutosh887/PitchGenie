"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import appConfig from "@/config/appConfig";
import {
  elevenLabsGenerateVoiceSummary,
  elevenLabsGenerateTextSummary,
  elevenLabsGenerateMultiLangSummary,
  elevenLabsGenerateEmotionSpeech,
} from "@/lib/elevenlabs";
import { useState, useEffect } from "react";

const mockData = [
  { name: "Emails Sent", value: 1200 },
  { name: "Open Rate", value: 45 },
  { name: "Reply Rate", value: 20 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [voiceSummary, setVoiceSummary] = useState<string | null>(null);
  const [textSummary, setTextSummary] = useState<string>("Loading summary...");
  const [multiLangSummary, setMultiLangSummary] = useState<string>(
    "Loading translation..."
  );
  const [emotionSpeech, setEmotionSpeech] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function fetchSummaries() {
      try {
        const text = await elevenLabsGenerateTextSummary(
          "Your sales performance summary"
        );
        setTextSummary(text || "Summary not available.");
      } catch (error) {
        console.error("Error fetching text summary:", error);
        setTextSummary("Could not generate a summary at this time.");
      }

      try {
        const voice = await elevenLabsGenerateVoiceSummary(textSummary);
        setVoiceSummary(voice);
      } catch (error) {
        console.error("Error generating voice summary:", error);
        setVoiceSummary(null);
      }

      try {
        const multiLang = await elevenLabsGenerateMultiLangSummary(
          textSummary,
          "es"
        );
        setMultiLangSummary(multiLang || "Translation unavailable.");
      } catch (error) {
        console.error("Error fetching multilingual summary:", error);
        setMultiLangSummary("Could not generate a multilingual summary.");
      }

      try {
        const emotionAudio = await elevenLabsGenerateEmotionSpeech(
          textSummary,
          "excited"
        );
        setEmotionSpeech(emotionAudio);
      } catch (error) {
        console.error("Error generating emotion-based speech:", error);
        setEmotionSpeech(null);
      }
    }

    fetchSummaries();
  }, [textSummary]);

  const handlePlayAudio = () => setIsPlaying(true);
  const handleStopAudio = () => setIsPlaying(false);

  return (
    <div className="p-6 min-h-screen text-foreground space-y-6">
      <h1 className="text-4xl font-bold text-primary">{appConfig.appName}</h1>
      <h2 className="text-lg mt-2 text-muted-foreground">
        {appConfig.appDescription}
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {mockData.map((item, index) => (
          <Card key={index}>
            <CardContent>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-2xl">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">AI-Generated Text Summary</h2>
        <p className="text-lg">{textSummary}</p>
      </div>

      {voiceSummary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">AI-Generated Voice Summary</h2>
          <audio controls onPlay={handlePlayAudio} onPause={handleStopAudio}>
            <source src={voiceSummary} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          {isPlaying && (
            <p className="text-sm text-muted-foreground">Playing summary...</p>
          )}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold">
          AI-Generated Multi-Language Summary (Spanish)
        </h2>
        <p className="text-lg">{multiLangSummary}</p>
      </div>

      {emotionSpeech && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Emotion-Based Speech Summary (Excited)
          </h2>
          <audio controls>
            <source src={emotionSpeech} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <Button
        className="mt-6 bg-primary text-primary-foreground hover:bg-primary/80"
        onClick={() => router.push(appConfig.appRoutes.signIn || "/sign-in")}
      >
        Get Started
      </Button>
    </div>
  );
}

export async function elevenLabsOptimizePitch(pitch: string): Promise<string> {
  try {
    const response = await fetch("https://api.elevenlabs.io/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ELEVEN_LABS_API_KEY}`,
      },
      body: JSON.stringify({ text: pitch }),
    });

    const data = await response.json();
    return data.optimizedText || "Optimization failed. Try again.";
  } catch (error) {
    console.error("Error optimizing pitch:", error);
    return "Error optimizing pitch.";
  }
}

export async function elevenLabsGenerateTextSummary(
  text: string
): Promise<string> {
  try {
    const response = await fetch(
      "https://api.elevenlabs.io/generate-text-summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ELEVEN_LABS_API_KEY}`,
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await response.json();
    return data.summary || "Failed to generate summary.";
  } catch (error) {
    console.error("Error generating text summary:", error);
    return "Error generating text summary.";
  }
}

export async function elevenLabsGenerateVoiceSummary(
  text: string
): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.elevenlabs.io/generate-voice-summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ELEVEN_LABS_API_KEY}`,
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await response.json();
    return data.audioUrl || null;
  } catch (error) {
    console.error("Error generating voice summary:", error);
    return null;
  }
}

export async function elevenLabsGenerateMultiLangSummary(
  text: string,
  language: string
): Promise<string> {
  try {
    const response = await fetch(
      "https://api.elevenlabs.io/generate-multi-lang-summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ELEVEN_LABS_API_KEY}`,
        },
        body: JSON.stringify({ text, language }),
      }
    );

    const data = await response.json();
    return data.summary || "Failed to generate multilingual summary.";
  } catch (error) {
    console.error("Error generating multilingual summary:", error);
    return "Error generating multilingual summary.";
  }
}

export async function elevenLabsGenerateEmotionSpeech(
  text: string,
  emotion: string
): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.elevenlabs.io/generate-emotion-speech",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ELEVEN_LABS_API_KEY}`,
        },
        body: JSON.stringify({ text, emotion }),
      }
    );

    const data = await response.json();
    return data.audioUrl || null;
  } catch (error) {
    console.error("Error generating emotion speech:", error);
    return null;
  }
}

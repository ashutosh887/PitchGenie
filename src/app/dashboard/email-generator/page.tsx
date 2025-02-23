"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Clipboard, Download, Loader2 } from "lucide-react";

const PersonalizedEmailGenerator = () => {
  const [aiGeneratedEmail, setAiGeneratedEmail] = useState(
    "Hello [Name],\n\nI hope you're doing well. I wanted to reach out regarding..."
  );
  const [manualEdit, setManualEdit] = useState(aiGeneratedEmail);
  const [subjectLine, setSubjectLine] = useState(
    "Exciting Opportunity for You"
  );
  const [alternativeSubject, setAlternativeSubject] = useState(
    "Boost Your Business with Our Solution"
  );
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Formal");
  const [emailTemplate, setEmailTemplate] = useState("Sales");

  const generateNewEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.mistral.ai/v1/agents/ag:3b5a2eb6:20250223:untitled-agent:e5f9635a/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_MISTRAL_API_KEY`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `Generate a ${tone.toLowerCase()} ${emailTemplate.toLowerCase()} email.`,
              },
            ],
            max_tokens: 150,
          }),
        }
      );
      const data = await response.json();
      const newEmail =
        data.choices?.[0]?.message?.content ||
        "Hey [Name],\n\nWe've got something special for you...";
      setAiGeneratedEmail(newEmail);
      setManualEdit(newEmail);
    } catch (error) {
      console.error("Error generating email:", error);
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiGeneratedEmail);
  };

  const downloadEmail = () => {
    const blob = new Blob([aiGeneratedEmail], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "email.txt";
    link.click();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">A/B Test Subject Lines</h2>
        <input
          className="border p-3 rounded w-full"
          value={subjectLine}
          onChange={(e) => setSubjectLine(e.target.value)}
        />
        <input
          className="border p-3 rounded w-full"
          value={alternativeSubject}
          onChange={(e) => setAlternativeSubject(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <select
          className="border p-2 rounded w-1/2"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option>Formal</option>
          <option>Casual</option>
          <option>Friendly</option>
        </select>
        <select
          className="border p-2 rounded w-1/2"
          value={emailTemplate}
          onChange={(e) => setEmailTemplate(e.target.value)}
        >
          <option>Sales</option>
          <option>Follow-up</option>
          <option>Introduction</option>
        </select>
      </div>
      <PanelGroup
        direction="horizontal"
        className="flex gap-6 border rounded-lg p-4"
      >
        <Panel defaultSize={50} className="space-y-4">
          <h2 className="text-lg font-semibold">AI-Generated Email</h2>
          <Textarea
            value={aiGeneratedEmail}
            readOnly
            className="border p-3 w-full h-48"
          />
          <div className="flex gap-2">
            <Button
              className="w-full py-2 text-lg"
              onClick={generateNewEmail}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Generate New Email"
              )}
            </Button>
            <Button className="p-2" onClick={copyToClipboard}>
              <Clipboard className="w-5 h-5" />
            </Button>
            <Button className="p-2" onClick={downloadEmail}>
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </Panel>
        <PanelResizeHandle className="w-2 bg-gray-500 cursor-col-resize" />
        <Panel defaultSize={50} className="space-y-4">
          <h2 className="text-lg font-semibold">Your Edits</h2>
          <Textarea
            value={manualEdit}
            onChange={(e) => setManualEdit(e.target.value)}
            className="border p-3 w-full h-48"
          />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default PersonalizedEmailGenerator;

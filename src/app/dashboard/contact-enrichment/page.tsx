"use client";

import { useState } from "react";
import Image from "next/image";
import appConfig from "@/config/appConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LeadProfile: React.FC = () => {
  const [lead, setLead] = useState(appConfig.mockLead);
  const [loading, setLoading] = useState(false);

  const enrichLead = async () => {
    setLead(appConfig.mockLead);
    setLoading(true);
    try {
      console.log("Enriching lead...");
      setTimeout(() => {
        setLoading(false);
        alert("Lead enriched successfully! (Mock)");
      }, 1500);
    } catch (err) {
      console.warn("Failed to enrich lead.", err);
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 text-white">
      <CardHeader>
        <div className="flex items-center gap-4">
          {lead.profilePicture && (
            <Image
              src={lead.profilePicture}
              alt={`${lead.name}'s Profile`}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full"
            />
          )}
          <div>
            <CardTitle className="text-2xl font-semibold">
              {lead.name}
            </CardTitle>
            <p className="text-gray-400">
              {lead.role} at {lead.company}
            </p>
            <p className="text-gray-400">
              {lead.location || "Location unknown"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Industry:</strong> {lead.industry}
        </p>
        <p>
          <strong>Experience:</strong> {lead.experience}
        </p>
        <p>
          <strong>Email:</strong> {lead.email}
        </p>
        <p>
          <strong>Phone:</strong> {lead.phone}
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href={lead.linkedin}
            className="text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profile
          </a>
        </p>
        <p>
          <strong>Skills:</strong> {lead.skills.join(", ")}
        </p>
        <Button onClick={enrichLead} className="mt-4 w-full">
          {loading ? "Enriching..." : "Enrich Lead"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LeadProfile;

"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import appConfig from "@/config/appConfig";

type MockLead = {
  name?: string;
  role?: string;
  company?: string;
  location?: string;
  industry?: string;
  experience?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  skills?: string[];
  leadScore?: number;
  profilePicture?: string;
};

interface LeadScoringProps {
  lead?: MockLead;
}

// Ensure a valid default lead object to avoid undefined issues
const defaultLead: MockLead = {
  name: "Unknown",
  role: "Role unknown",
  company: "Company unknown",
  location: "Location unknown",
  industry: "Not specified",
  experience: "Not available",
  email: "Not available",
  phone: "Not available",
  linkedin: "",
  skills: [],
  leadScore: 0,
  profilePicture: "",
};

const LeadScoring: React.FC<LeadScoringProps> = ({
  lead = appConfig.mockLead || defaultLead,
}) => {
  return (
    <Card className="p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 text-white flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          {lead.profilePicture ? (
            <Image
              src={lead.profilePicture}
              alt={lead.name || "Lead"}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
              📷
            </div>
          )}
          <div>
            <CardTitle className="text-2xl font-semibold">
              {lead.name}
            </CardTitle>
            <p className="text-gray-400">
              {lead.role} at {lead.company}
            </p>
            <p className="text-gray-400">{lead.location}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 flex-grow">
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
          {lead.linkedin ? (
            <a href={lead.linkedin} className="text-blue-400">
              Profile
            </a>
          ) : (
            "Not available"
          )}
        </p>
        <p>
          <strong>Skills:</strong>{" "}
          {lead.skills?.length ? lead.skills.join(", ") : "No skills listed"}
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Lead Score</h3>
          <Progress value={lead.leadScore} className="h-2 mt-2 bg-gray-700" />
          <p
            className={`mt-2 font-bold ${
              lead.leadScore >= 80
                ? "text-green-400"
                : lead.leadScore >= 50
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {lead.leadScore >= 80
              ? "🟢 Hot"
              : lead.leadScore >= 50
              ? "🟡 Warm"
              : "🔴 Cold"}
          </p>
        </div>
      </CardContent>

      <div className="px-6">
        <Button
          className="w-full"
          onClick={() => alert(`Action for ${lead.name}`)}
        >
          Take Action
        </Button>
      </div>
    </Card>
  );
};

export default LeadScoring;

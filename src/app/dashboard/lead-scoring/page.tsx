"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ILead } from "@/models/Lead";
import appConfig from "@/config/appConfig";

type LeadScoringProps = {
  lead?: ILead;
};

const LeadScoring = ({ lead = appConfig.mockLead }: LeadScoringProps) => {
  return (
    <Card className="p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 text-white flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          {lead.profilePicture && (
            <Image
              src={lead.profilePicture}
              alt={lead.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full"
            />
          )}
          <div>
            <CardTitle className="text-2xl font-semibold">
              {lead.name || "Unknown"}
            </CardTitle>
            <p className="text-gray-400">
              {lead.role ? `${lead.role} at ${lead.company}` : "Role unknown"}
            </p>
            <p className="text-gray-400">
              {lead.location || "Location unknown"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 flex-grow">
        <p>
          <strong>Industry:</strong> {lead.industry || "Not specified"}
        </p>
        <p>
          <strong>Experience:</strong> {lead.experience || "Not available"}
        </p>
        <p>
          <strong>Email:</strong> {lead.email || "Not available"}
        </p>
        <p>
          <strong>Phone:</strong> {lead.phone || "Not available"}
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
          {lead.skills?.join(", ") || "No skills listed"}
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Lead Score</h3>
          <Progress
            value={lead.leadScore || 0}
            className="h-2 mt-2 bg-gray-700"
          />
          <p
            className={`mt-2 font-bold ${
              lead.leadScore && lead.leadScore >= 80
                ? "text-green-400"
                : lead.leadScore >= 50
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {lead.leadScore
              ? lead.leadScore >= 80
                ? "🟢 Hot"
                : lead.leadScore >= 50
                ? "🟡 Warm"
                : "🔴 Cold"
              : "Not scored"}
          </p>
        </div>
      </CardContent>

      {/* Button with Consistent Spacing */}
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

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  PlusCircle,
} from "lucide-react";

const mockCampaigns = [
  { id: 1, name: "LinkedIn Outreach", status: "Sent", platform: "LinkedIn" },
  { id: 2, name: "WhatsApp Follow-up", status: "Opened", platform: "WhatsApp" },
  { id: 3, name: "Email Drip Campaign", status: "Replied", platform: "Email" },
  { id: 4, name: "Cold Outreach", status: "Scheduled", platform: "Email" },
];

const fetchCampaigns = async () => {
  try {
    const response = mockCampaigns;
    // if (!response.ok) throw new Error("Failed to fetch");
    return response;
  } catch (error) {
    console.error("API fetch failed, using mock data.", error);
    return mockCampaigns;
  }
};

const statusIcons = {
  Sent: <Send className="text-blue-400" />,
  Opened: <MessageSquare className="text-yellow-400" />,
  Replied: <CheckCircle className="text-green-400" />,
  Scheduled: <Clock className="text-gray-400" />,
};

const MultiChannelOutreach = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns().then((data) => {
      setCampaigns(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <p>A campaign dashboard listing all outreach campaigns.</p>

        <Button className="flex items-center space-x-2 px-4 py-2 rounded-lg">
          <PlusCircle className="w-5 h-5" />
          <span>Create New</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-4 flex items-center space-x-4">
                {statusIcons[campaign.status]}
                <div>
                  <h2 className="text-xl font-semibold">{campaign.name}</h2>
                  <p className="text-sm text-gray-400">
                    Platform: {campaign.platform}
                  </p>
                  <span className="text-sm text-gray-300">
                    Status: {campaign.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiChannelOutreach;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

type Lead = {
  name: string;
  role: string;
  company: string;
  profilePicture?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  location?: string;
  industry?: string;
  experience?: string;
  skills?: string[];
};

type LeadProfileProps = {
  leadId: string;
};

const LeadProfile: React.FC<LeadProfileProps> = ({ leadId }) => {
  const [lead, setLead] = useState<Lead>({
    name: "Devi Lal Singh",
    role: "Product Manager",
    company: "InnovateX",
    profilePicture: "/logo.jpeg",
    email: "devil@innovatex.com",
    phone: "+1987654321",
    linkedin: "https://linkedin.com/in/alicejohnson",
    location: "San Francisco, CA",
    industry: "Technology",
    experience: "8 years",
    skills: ["Product Management", "Agile", "Data Analysis", "UI/UX"],
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/leads/${leadId}`);
        setLead(response.data);
      } catch (err) {
        console.warn("Failed to fetch lead, using mock data.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [leadId]);

  const enrichLead = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/enrich-lead`, { leadId });
      setLead(response.data);
    } catch (err) {
      console.warn("Failed to enrich lead.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 text-white">
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
          <h2 className="text-2xl font-semibold">{lead.name}</h2>
          <p className="text-gray-400">
            {lead.role} at {lead.company}
          </p>
          <p className="text-gray-400">{lead.location || "Location unknown"}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
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
          <strong>Skills:</strong>{" "}
          {lead.skills ? lead.skills.join(", ") : "No skills listed"}
        </p>
      </div>
      <button
        onClick={enrichLead}
        className="mt-4 bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition"
      >
        Enrich Lead
      </button>
    </div>
  );
};

export default LeadProfile;

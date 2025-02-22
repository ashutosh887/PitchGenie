"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Lead {
  name: string;
  company: string;
  jobTitle: string;
  engagementScore: number;
  leadSource: string;
  email: string;
  phoneNumber: string;
}

const LeadFinder = () => {
  const { register, handleSubmit } = useForm();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false); // Track whether a search has been performed

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    setHasSearched(true); // Mark that a search has started
    try {
      const response = await axios.post(
        "/api/lead-finder/generate-leads",
        data
      );
      setLeads(response.data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Industry</label>
          <Input {...register("industry")} placeholder="e.g., Technology" />
        </div>
        <div>
          <label>Company</label>
          <Input {...register("company")} placeholder="e.g., Example Corp" />
        </div>
        <div>
          <label>Location</label>
          <Input {...register("location")} placeholder="e.g., San Francisco" />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Find Leads"}
        </Button>
      </form>

      <div className="mt-6 flex-1 overflow-y-auto">
        {hasSearched && (
          <>
            <h2 className="text-xl">Leads</h2>
            {leads.length > 0 ? (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto p-4 rounded-lg">
                {leads.map((lead, index) => (
                  <div key={index} className="border p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold">{lead.name}</h3>
                    <p>{lead.company}</p>
                    <p>{lead.jobTitle}</p>
                    <p>Score: {lead.engagementScore.toFixed(1)}</p>
                    <p>Source: {lead.leadSource}</p>
                    <p>Email: {lead.email}</p>
                    <p>Phone: {lead.phoneNumber}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No leads found. Try again with different filters.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LeadFinder;

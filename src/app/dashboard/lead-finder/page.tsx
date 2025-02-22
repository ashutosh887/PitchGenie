"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Correct import from your project

// Constants for default values, to be replaced with API data later
const LEAD_LIST = [
  { name: "John Doe", company: "TechCorp", role: "CEO", engagement: "High" },
  {
    name: "Jane Smith",
    company: "InnoTech",
    role: "Marketing Lead",
    engagement: "Medium",
  },
  { name: "Michael Brown", company: "WebSoft", role: "CTO", engagement: "Low" },
];

const FILTER_OPTIONS = {
  industries: ["Tech", "Healthcare", "Finance"],
  locations: ["USA", "Canada", "Europe"],
  companySizes: ["Small", "Medium", "Large"],
  engagementScores: ["Low", "Medium", "High"],
};

const LeadFinderPage = () => {
  const [filteredLeads, setFilteredLeads] = useState(LEAD_LIST);

  // Placeholder for the dynamic filtering logic (e.g., API fetch)
  useEffect(() => {
    // Call to fetch leads or update based on filters
    setFilteredLeads(LEAD_LIST); // Replace with actual API call
  }, []);

  return (
    <div className="p-4 text-white">
      {/* Filters Section */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Filters</h2>
        <div className="flex space-x-4">
          <Select>
            <SelectTrigger className="border border-[#27272a] text-white p-2 rounded">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Industries</SelectLabel>
                {FILTER_OPTIONS.industries.map((industry, index) => (
                  <SelectItem key={index} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="border border-[#27272a] text-white p-2 rounded">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Locations</SelectLabel>
                {FILTER_OPTIONS.locations.map((location, index) => (
                  <SelectItem key={index} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="border border-[#27272a] text-white p-2 rounded">
              <SelectValue placeholder="Select Company Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Company Sizes</SelectLabel>
                {FILTER_OPTIONS.companySizes.map((size, index) => (
                  <SelectItem key={index} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="border border-[#27272a] text-white p-2 rounded">
              <SelectValue placeholder="Select Engagement Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Engagement Scores</SelectLabel>
                {FILTER_OPTIONS.engagementScores.map((score, index) => (
                  <SelectItem key={index} value={score}>
                    {score}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Leads List Section */}
      <h2 className="text-xl font-medium mb-4">Leads List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 border-b border-[#27272a]">Name</th>
              <th className="p-2 border-b border-[#27272a]">Company</th>
              <th className="p-2 border-b border-[#27272a]">Role</th>
              <th className="p-2 border-b border-[#27272a]">
                Engagement Level
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => (
              <tr key={index} className="odd:bg-[#27272a] even:bg-[#1e1e1e]">
                <td className="p-2 border-b border-[#27272a]">{lead.name}</td>
                <td className="p-2 border-b border-[#27272a]">
                  {lead.company}
                </td>
                <td className="p-2 border-b border-[#27272a]">{lead.role}</td>
                <td className="p-2 border-b border-[#27272a]">
                  {lead.engagement}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadFinderPage;

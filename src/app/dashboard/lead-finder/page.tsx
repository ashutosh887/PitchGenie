"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");
  const { toast } = useToast();

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    setHasSearched(true);
    setIsFetching(true);
    try {
      const response = await axios.post(
        "/api/lead-finder/generate-leads",
        data
      );
      setLeads(response.data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error fetching leads",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  const saveLeads = async () => {
    if (!searchName.trim()) {
      toast({
        title: "Please enter a name for the search.",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post("/api/lead-finder/save-leads", {
        name: searchName,
        leads,
      });

      toast({
        title: "Leads saved successfully!",
        description: "You can find them later.",
        variant: "success",
      });
      setIsModalOpen(false);
      setSearchName("");
    } catch (error) {
      console.error("Error saving leads:", error);
      toast({
        title: "Failed to save leads",
        description: "Try again later.",
        variant: "destructive",
      });
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
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Find Leads"
            )}
          </Button>
          {hasSearched && leads.length > 0 && (
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Save Leads
            </Button>
          )}
        </div>
      </form>

      <div className="mt-6 flex-1 overflow-y-auto">
        {hasSearched && (
          <>
            <h2 className="text-xl">Leads</h2>
            {isFetching ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="animate-spin" size={40} />
              </div>
            ) : leads.length > 0 ? (
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

      {/* Save Leads Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Leads</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter a name for this search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveLeads}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadFinder;

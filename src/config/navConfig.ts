import { LucideIcon, Search, Mail, Users } from "lucide-react";

export type NavSection = {
  title: string;
  path?: string;
  icon?: LucideIcon | string;
  imageURL?: string;
  subSections?: { title: string; path: string }[];
};

const navConfig: NavSection[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    imageURL: "/logo.jpeg",
  },
  {
    title: "Prospect",
    icon: Search,
    subSections: [
      { title: "Lead Finder", path: "/prospect/lead-finder" },
      { title: "Contact Enrichment", path: "/prospect/contact-enrichment" },
      { title: "Lead Scoring", path: "/prospect/lead-scoring" },
      { title: "CRM Integration", path: "/prospect/crm-integration" },
    ],
  },
  {
    title: "Engage",
    icon: Mail,
    subSections: [
      { title: "Email Generator", path: "/engage/email-generator" },
      {
        title: "Multi-Channel Outreach",
        path: "/engage/multi-channel-outreach",
      },
      { title: "Follow-up Automation", path: "/engage/follow-up-automation" },
      { title: "Pitch Analytics", path: "/engage/pitch-analytics" },
    ],
  },
  {
    title: "Conversion",
    icon: Users,
    subSections: [
      { title: "Meeting Scheduler", path: "/conversion/meeting-scheduler" },
      { title: "Deal Pipeline", path: "/conversion/deal-pipeline" },
      {
        title: "Smart Recommendation",
        path: "/conversion/smart-recommendation",
      },
      { title: "Posthog Analytics", path: "/conversion/posthog-analytics" },
    ],
  },
];

export default navConfig;

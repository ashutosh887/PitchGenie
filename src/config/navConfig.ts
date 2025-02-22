import { LucideIcon, Search, Mail, Users } from "lucide-react";

export type NavSection = {
  title: string;
  path?: string;
  icon?: LucideIcon | string;
  showString?: boolean;
  subSections?: { title: string; path: string }[];
};

const navConfig: NavSection[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    showString: true,
  },
  {
    title: "Prospect",
    icon: Search,
    subSections: [
      { title: "Lead Finder", path: "/dashboard/prospect/lead-finder" },
      {
        title: "Contact Enrichment",
        path: "/dashboard/prospect/contact-enrichment",
      },
      { title: "Lead Scoring", path: "/dashboard/prospect/lead-scoring" },
      { title: "CRM Integration", path: "/dashboard/prospect/crm-integration" },
    ],
  },
  {
    title: "Engage",
    icon: Mail,
    subSections: [
      { title: "Email Generator", path: "/dashboard/engage/email-generator" },
      {
        title: "Multi-Channel Outreach",
        path: "/dashboard/engage/multi-channel-outreach",
      },
      {
        title: "Follow-up Automation",
        path: "/dashboard/engage/follow-up-automation",
      },
      { title: "Pitch Analytics", path: "/dashboard/engage/pitch-analytics" },
    ],
  },
  {
    title: "Conversion",
    icon: Users,
    subSections: [
      {
        title: "Meeting Scheduler",
        path: "/dashboard/conversion/meeting-scheduler",
      },
      { title: "Deal Pipeline", path: "/dashboard/conversion/deal-pipeline" },
      {
        title: "Smart Recommendation",
        path: "/dashboard/conversion/smart-recommendation",
      },
      {
        title: "Posthog Analytics",
        path: "/dashboard/conversion/posthog-analytics",
      },
    ],
  },
];

export default navConfig;

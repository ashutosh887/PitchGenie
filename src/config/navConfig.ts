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
      { title: "Lead Finder", path: "/dashboard/lead-finder" },
      {
        title: "Contact Enrichment",
        path: "/dashboard/contact-enrichment",
      },
      { title: "Lead Scoring", path: "/dashboard/lead-scoring" },
      { title: "CRM Integration", path: "/dashboard/crm-integration" },
    ],
  },
  {
    title: "Engage",
    icon: Mail,
    subSections: [
      { title: "Email Generator", path: "/dashboard/email-generator" },
      {
        title: "Multi-Channel Outreach",
        path: "/dashboard/multi-channel-outreach",
      },
      {
        title: "Follow-up Automation",
        path: "/dashboard/follow-up-automation",
      },
      { title: "Pitch Analytics", path: "/dashboard/pitch-analytics" },
    ],
  },
  {
    title: "Conversion",
    icon: Users,
    subSections: [
      {
        title: "Meeting Scheduler",
        path: "/dashboard/meeting-scheduler",
      },
      { title: "Deal Pipeline", path: "/dashboard/deal-pipeline" },
      {
        title: "Posthog Analytics",
        path: "/dashboard/posthog-analytics",
      },
    ],
  },
];

export default navConfig;

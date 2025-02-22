import { fal } from "@fal-ai/client";
import { NextResponse } from "next/server";
import FirecrawlApp from "@mendable/firecrawl-js";

// TODO: fix mock data generation logic
const FALLBACK_LEADS = Array.from({ length: 30 }, (_, i) => ({
  name: `Lead ${i + 1}`,
  company: "Example Corp",
  jobTitle: "Software Engineer",
  engagementScore: Math.random() * 100,
  leadSource: "Mock Data",
  email: `lead${i + 1}@example.com`,
  phoneNumber: "123-456-7890",
}));

export async function fetchLeadsUsingFireCrawl(
  industry: string,
  company: string,
  location: string
) {
  try {
    const fireCrawlApp = new FirecrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY,
    });

    const crawlResponse = await fireCrawlApp.crawlUrl("https://firecrawl.dev", {
      limit: 100,
      scrapeOptions: {
        formats: ["json"],
        includeTags: ["industry", "company", "location"],
      },
    });

    return crawlResponse;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
}

export async function fetchLeadsFromFalAPI(
  industry: string,
  company: string,
  location: string
) {
  try {
    if (!industry && !company && !location) return [];

    const result = await fal.subscribe("fal-ai/any-llm", {
      input: {
        model: "anthropic/claude-3.5-sonnet",
        prompt: `Find leads in ${industry} industry, company ${company} located in ${location}. Return realistic lead details including name, job title, company, email, and phone number.`,
      },
    });

    if (!result || !result.output) throw new Error("Failed to fetch leads");

    return (
      result.output.leads?.map((lead: any) => ({
        name: lead.name || "Unknown Lead",
        company: lead.company || company || "Unknown Company",
        jobTitle: lead.jobTitle || "Unknown Job Title",
        engagementScore: lead.engagementScore || Math.random() * 100,
        leadSource: "Fal API",
        email:
          lead.email ||
          `${lead.name?.toLowerCase().replace(/\s+/g, "")}@example.com`,
        phoneNumber: lead.phoneNumber || "123-456-7890",
      })) || []
    );
  } catch (error) {
    console.error("Error fetching leads:", error);
    return FALLBACK_LEADS;
  }
}

export async function POST(req: Request) {
  try {
    const { industry, company, location } = await req.json();
    const leads = await fetchLeadsFromFalAPI(industry, company, location);
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

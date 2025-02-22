import { NextResponse } from "next/server";
import { fetchLeadsFromFalAPI } from "../lead-helper";

export async function POST(req: Request) {
  try {
    const { industry, company, location } = await req.json();

    // Ensure at least one filter is provided
    if (!industry && !company && !location) {
      return NextResponse.json(
        {
          error:
            "Please provide at least one filter (industry, company, or location)",
        },
        { status: 400 }
      );
    }

    const leads = await fetchLeadsFromFalAPI(industry, company, location);
    return NextResponse.json(leads);
  } catch (error) {
    console.error("Error in lead generation API:", error);
    return NextResponse.json(
      { error: "Failed to generate leads. Please try again later." },
      { status: 500 }
    );
  }
}

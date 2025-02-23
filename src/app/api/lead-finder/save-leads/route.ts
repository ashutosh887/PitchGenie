import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import appConfig from "@/config/appConfig";

if (!appConfig.mongoDb.uri) {
  throw new Error("MONGO_URI is missing in environment variables");
}

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (!cachedClient) {
    cachedClient = new MongoClient(appConfig.mongoDb.uri);
    await cachedClient.connect();
  }
  return cachedClient.db(appConfig.mongoDb.dbName);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, leads } = body;

    if (!name || !Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection("leads");

    const insertData = leads.map((lead) => ({
      name,
      lead,
      createdAt: new Date(),
    }));

    await collection.insertMany(insertData);

    return NextResponse.json(
      { message: "Leads saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving leads:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

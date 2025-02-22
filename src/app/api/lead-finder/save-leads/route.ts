// /pages/api/lead-finder/save-leads.ts

import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || "your_mongodb_connection_string";
const DB_NAME = "pitchgenie";

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, leads } = req.body;
    if (!name || !Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const collection = db.collection("leads");

    await collection.insertOne({ name, leads, createdAt: new Date() });

    return res.status(200).json({ message: "Leads saved successfully!" });
  } catch (error) {
    console.error("Error saving leads:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

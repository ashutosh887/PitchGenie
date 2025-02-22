import { NextApiRequest, NextApiResponse } from "next";
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

    const db = await connectToDatabase();
    const collection = db.collection("leads");

    const insertData = leads.map((lead) => ({
      name,
      lead,
      createdAt: new Date(),
    }));

    await collection.insertMany(insertData);

    return res.status(200).json({ message: "Leads saved successfully!" });
  } catch (error) {
    console.error("Error saving leads:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

import appConfig from "@/config/appConfig";
import { MongoClient, Db } from "mongodb";

const MONGODB_URI = `mongodb://${appConfig.mongoDb.userName}:${appConfig.mongoDb.password}@${appConfig.mongoDb.host}/?ssl=true&replicaSet=atlas-f6slaf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=PitchGenie`;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(MONGODB_URI);
      await cachedClient.connect();
    }

    cachedDb = cachedClient.db("PitchGenie");
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}

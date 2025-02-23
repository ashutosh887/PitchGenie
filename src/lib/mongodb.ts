import appConfig from "@/config/appConfig";
import mongoose from "mongoose";

if (!appConfig.mongoDb.uri) {
  throw new Error("MONGODB_URI is missing");
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(appConfig.mongoDb.uri);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

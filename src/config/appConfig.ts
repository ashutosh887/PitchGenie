interface AppConfig {
  appName: string;
  appDescription: string;
  appRoutes: {
    root: string;
    signIn: string | undefined;
    dashboard: string;
    afterSignIn: string | undefined;
  };
  mongoDb: {
    userName: string | undefined;
    password: string | undefined;
    host: string | undefined;
    uri: string;
    dbName: string;
  };
}

// Extract environment variables safely
const MONGO_USERNAME = process.env.MONGODB_USERNAME;
const MONGO_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGO_HOST = process.env.MONGODB_HOST;

// Construct MongoDB URI safely
const MONGO_URI =
  MONGO_USERNAME && MONGO_PASSWORD && MONGO_HOST
    ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/?ssl=true&replicaSet=atlas-f6slaf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=PitchGenie`
    : "";

const appConfig: AppConfig = {
  appName: "PitchGenie",
  appDescription: "AI that crafts the perfect pitch and follow-up!",
  appRoutes: {
    root: "/",
    signIn: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    dashboard: "/dashboard",
    afterSignIn: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
  },
  mongoDb: {
    userName: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    host: MONGO_HOST,
    uri: MONGO_URI,
    dbName: "pitchgenie",
  },
};

export default appConfig;

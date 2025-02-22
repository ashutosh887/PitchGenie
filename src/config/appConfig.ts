interface AppRoutes {
  root: string;
  signIn?: string;
  dashboard: string;
  afterSignIn?: string;
}

interface MongoDBConfig {
  userName?: string;
  password?: string;
  host?: string;
  uri: string;
  dbName: string;
}

interface MockLead {
  name: string;
  role: string;
  company: string;
  profilePicture: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  industry: string;
  experience: string;
  leadScore: number;
  skills: string[];
  insights: string;
}

interface AppConfig {
  appName: string;
  appDescription: string;
  appRoutes: AppRoutes;
  mongoDb: MongoDBConfig;
  mockLead: MockLead;
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
  mockLead: {
    name: "Devi Lal Singh",
    role: "Product Manager",
    company: "InnovateX",
    profilePicture: "/logo.jpeg",
    email: "alice.johnson@innovatex.com",
    phone: "+1987654321",
    linkedin: "https://linkedin.com/in/alicejohnson",
    location: "San Francisco, CA",
    industry: "Technology",
    experience: "8 years",
    leadScore: 85,
    skills: ["Product Management", "Agile", "Data Analysis", "UI/UX"],
    insights: "Engaged with 2 emails, viewed website twice.",
  },
};

export default appConfig;

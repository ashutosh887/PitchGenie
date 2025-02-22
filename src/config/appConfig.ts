const appConfig = {
  appName: "PitchGenie",
  appDescription: "AI that crafts the perfect pitch and follow-up!",
  appRoutes: {
    root: "/",
    signIn: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    dashboard: "/dashboard",
    afterSignIn: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
  },
};

export default appConfig;

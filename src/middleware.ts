import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import appConfig from "./config/appConfig";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId, redirectToSignIn } = await auth();

  if (!isPublicRoute(request)) {
    if (!userId) {
      return redirectToSignIn();
    }
  }

  if (userId && request.nextUrl.pathname === "/") {
    return Response.redirect(
      new URL(appConfig.appRoutes.afterSignIn || "/dashboard", request.url)
    );
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

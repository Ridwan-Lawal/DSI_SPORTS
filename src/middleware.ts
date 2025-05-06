import { authConfig } from "@/src/auth.config";
import { authApiPrefix, authRoutes, publicRoutes } from "@/src/route";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const session = req.auth;
  const isLoggedIn = !!session;
  console.log(session, "session");

  const currentPath = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(currentPath);
  const isApiAuthRoute = currentPath.startsWith(authApiPrefix);
  const isAdminRoute = currentPath.startsWith("/admin");
  const isAuthRoute = authRoutes.includes(currentPath);

  if (isApiAuthRoute) return;
  if (!isLoggedIn && isAuthRoute) return;
  if (!isLoggedIn) {
    if (isAdminRoute || !isPublicRoute) {
      let callbackUrl = req.nextUrl.pathname;

      if (req.nextUrl.search) {
        callbackUrl += req.nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(
        new URL(
          `/auth/admin/login?callback=${encodedCallbackUrl}`,
          req.nextUrl,
        ),
      );
    }
  }

  // TODO: implement the auth when user is logged in below
  if (isLoggedIn) {
    if (isAuthRoute) {
      //  if admin, redirect to admin dashboard, else to homepage,
    }

    // if logged in and tries to access admin route, without role being admin, redirect to homepage
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

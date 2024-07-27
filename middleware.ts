import NextAuth from "next-auth";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const redirectUrl = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = nextUrl.search ? `${pathname}${nextUrl.search}` : pathname;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    const loginUrl = new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl);
    return NextResponse.redirect(loginUrl);
    // return NextResponse.redirect(new URL(`/auth/login`, nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  // matcher from clerk
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher default
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

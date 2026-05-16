/**
 * Next.js Proxy (formerly known as Middleware).
 *
 * Why this file is named `proxy.ts` and not `middleware.ts`:
 *   Next.js 16 renamed the convention from `middleware` to `proxy` to better
 *   reflect that this code runs as a network boundary in front of the app,
 *   not as Express-style request middleware.
 *   Docs: https://nextjs.org/docs/messages/middleware-to-proxy
 *   PR:   https://github.com/vercel/next.js/pull/84119
 *
 *   Migration codemod (run from the repo root):
 *     pnpm dlx @next/codemod@canary middleware-to-proxy .
 *
 * Runtime: Node.js (the default in Next 16). This means we *can* call
 * `firebase-admin` here to verify session cookies cryptographically — a
 * capability that wasn't available under the old Edge runtime.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  Intended auth flow (to be implemented alongside a /api/session route):
 *
 *    1.  Client signs in via Google popup → gets a Firebase ID token.
 *    2.  Client POSTs the ID token to `/api/session`.
 *    3.  That route calls `getAdminAuth().createSessionCookie(idToken, …)`
 *        and sets it as `__session` (httpOnly, Secure, SameSite=Lax).
 *    4.  This proxy reads `__session` and calls
 *        `getAdminAuth().verifySessionCookie(cookie, true)` — true forces
 *        revocation checks. On failure, redirect to `/admin/login`.
 *
 *  Until that flow is wired, this file performs a *presence* check only,
 *  treating an empty `__session` cookie as unauthenticated. Real verification
 *  happens client-side via `AuthProvider`. The admin allowlist still gates
 *  rendering inside the React tree, so this is a defense-in-depth layer.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "__session";
const LOGIN_PATH = "/admin/login";

/**
 * Routes this proxy applies to. The Next.js 16 docs make `matcher` required.
 *
 * `((?!login).*)` excludes `/admin/login` itself so we don't redirect-loop.
 */
export const config = {
  matcher: ["/admin/((?!login).*)", "/admin"],
};

export function proxy(request: NextRequest): NextResponse {
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // TODO(auth): replace presence check with cryptographic verification:
  //
  //   import { getAdminAuth } from "@/lib/firebase/admin";
  //   try {
  //     await getAdminAuth().verifySessionCookie(sessionCookie, true);
  //   } catch {
  //     return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  //   }
  //
  // Note: making `proxy` async is supported. firebase-admin works in the
  // Node.js runtime (the default in Next 16), so no extra runtime config
  // is required.

  return NextResponse.next();
}

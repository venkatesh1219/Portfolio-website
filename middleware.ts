import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, expectedToken, adminConfigured } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login page is always reachable.
  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const valid = adminConfigured() && token === (await expectedToken());

  if (!valid) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

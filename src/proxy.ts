import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/jwt";

// Checagem otimista: manda para o login antes de renderizar. A proteção de verdade está
// em requireCustomer()/requireAdmin() (src/lib/session.ts), chamadas junto dos dados — e,
// quando o backend existir, na API, que confere o mesmo JWT.

export async function proxy(request: NextRequest) {
  const user = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  const { pathname, search } = request.nextUrl;

  if (!user) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname + search);
    return NextResponse.redirect(login);
  }
  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/catalogue", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/catalogue/:path*", "/account/:path*", "/admin/:path*"],
};

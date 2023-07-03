import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("auth")) {
    return NextResponse.redirect(new URL("/register", request.url));
  }
}
export const config = {
  matcher: ["/"],
};

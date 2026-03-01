import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
if (!SECRET) throw new Error("JWT_SECRET is missing!"); // runtime safety

export default function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const decoded = jwt.verify(token, SECRET) as unknown as {
      id: number;
      role: string;
    };

    if (url.pathname.startsWith("/admin")) {
      if (decoded.role !== "admin") {
        url.pathname = "/user/dashboard";
        return NextResponse.redirect(url);
      }
    }

    if (url.pathname.startsWith("/user")) {
      if (decoded.role !== "user" && decoded.role !== "admin") {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

  } catch {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
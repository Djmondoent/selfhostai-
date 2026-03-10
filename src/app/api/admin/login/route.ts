import { NextResponse } from "next/server";

import { createAdminCookieValue, getAdminCookieName } from "@/lib/admin-auth";
import { getBaseUrl } from "@/lib/billing";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = String(formData.get("token") || "");
  const expected = process.env.ADMIN_ACCESS_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid-token", getBaseUrl()), 303);
  }

  const response = NextResponse.redirect(new URL("/admin", getBaseUrl()), 303);
  response.cookies.set({
    name: getAdminCookieName(),
    value: createAdminCookieValue(),
    httpOnly: true,
    secure: getBaseUrl().startsWith("https://"),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });

  return response;
}

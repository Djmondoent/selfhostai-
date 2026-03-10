import { NextResponse } from "next/server";

import { getAdminCookieName } from "@/lib/admin-auth";
import { getBaseUrl } from "@/lib/billing";

export async function POST() {
  const response = NextResponse.redirect(new URL("/admin/login", getBaseUrl()), 303);

  response.cookies.set({
    name: getAdminCookieName(),
    value: "",
    httpOnly: true,
    secure: getBaseUrl().startsWith("https://"),
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });

  return response;
}

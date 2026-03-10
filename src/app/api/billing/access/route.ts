import { NextResponse } from "next/server";

import { encodeAccessGrant, getAccessCookieName } from "@/lib/access";
import { getBaseUrl } from "@/lib/billing";
import { getPurchaseBySessionId } from "@/lib/data-store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/pricing?error=missing-session", getBaseUrl()), 303);
  }

  const purchase = await getPurchaseBySessionId(sessionId);

  if (!purchase || !purchase.fulfilled) {
    return NextResponse.redirect(new URL(`/billing/success?session_id=${sessionId}`, getBaseUrl()), 303);
  }

  const response = NextResponse.redirect(new URL(`/billing/thank-you?session_id=${sessionId}`, getBaseUrl()), 303);

  response.cookies.set({
    name: getAccessCookieName(),
    value: encodeAccessGrant({
      planKey: purchase.planKey,
      sessionId: purchase.sessionId,
      customerEmail: purchase.customerEmail,
      issuedAt: Date.now()
    }),
    httpOnly: true,
    secure: getBaseUrl().startsWith("https://"),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });

  return response;
}

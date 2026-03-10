import { NextResponse } from "next/server";

import { encodeAccessGrant, getAccessCookieName } from "@/lib/access";
import { getBaseUrl, getBillingPlan } from "@/lib/billing";
import { getStripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/pricing?error=missing-session", getBaseUrl()), 303);
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const planKey = session.metadata?.planKey || "";
  const plan = getBillingPlan(planKey);

  if (!plan || session.payment_status !== "paid") {
    return NextResponse.redirect(new URL("/pricing?error=payment-not-complete", getBaseUrl()), 303);
  }

  const response = NextResponse.redirect(new URL(`/dashboard?welcome=${plan.key}`, getBaseUrl()), 303);

  response.cookies.set({
    name: getAccessCookieName(),
    value: encodeAccessGrant({
      planKey: plan.key,
      sessionId: session.id,
      customerEmail: session.customer_details?.email ?? null,
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

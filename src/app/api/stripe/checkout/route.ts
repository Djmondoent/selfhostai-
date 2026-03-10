import { NextResponse } from "next/server";

import { getBaseUrl, getBillingPlan } from "@/lib/billing";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const formData = await request.formData();
  const planKey = String(formData.get("planKey") || "");
  const plan = getBillingPlan(planKey);

  if (!plan) {
    return NextResponse.redirect(new URL("/pricing?error=invalid-plan", getBaseUrl()), 303);
  }

  const stripe = getStripe();
  const prices = await stripe.prices.list({
    lookup_keys: [plan.lookupKey],
    active: true,
    limit: 1
  });

  const price = prices.data[0];

  if (!price) {
    return NextResponse.redirect(new URL("/pricing?error=missing-price", getBaseUrl()), 303);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: price.id,
        quantity: 1
      }
    ],
    customer_creation: "always",
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    success_url: `${getBaseUrl()}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getBaseUrl()}/billing/cancel`,
    metadata: {
      planKey: plan.key
    }
  });

  if (!session.url) {
    return NextResponse.redirect(new URL("/pricing?error=missing-checkout-url", getBaseUrl()), 303);
  }

  return NextResponse.redirect(session.url, 303);
}

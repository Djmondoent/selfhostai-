import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminCookieName, hasAdminAccess } from "@/lib/admin-auth";
import { getBaseUrl } from "@/lib/billing";
import { getWebhookEventByStripeId } from "@/lib/data-store";
import { processCheckoutSessionCompleted } from "@/lib/stripe-fulfillment";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const cookieStore = cookies();

  if (!hasAdminAccess(cookieStore.get(getAdminCookieName())?.value)) {
    return NextResponse.redirect(new URL("/admin/login?error=unauthorized", getBaseUrl()), 303);
  }

  const formData = await request.formData();
  const stripeEventId = String(formData.get("stripeEventId") || "");

  if (!stripeEventId) {
    return NextResponse.redirect(new URL("/admin?error=missing-webhook-id", getBaseUrl()), 303);
  }

  const storedEvent = await getWebhookEventByStripeId(stripeEventId);

  if (!storedEvent) {
    return NextResponse.redirect(new URL("/admin?error=webhook-not-found", getBaseUrl()), 303);
  }

  const stripe = getStripe();
  const event = await stripe.events.retrieve(stripeEventId);

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    await processCheckoutSessionCompleted(event.data.object, {
      eventId: event.id,
      eventType: event.type,
      source: "admin-retry"
    });
  }

  return NextResponse.redirect(new URL("/admin?updated=webhook-retried", getBaseUrl()), 303);
}

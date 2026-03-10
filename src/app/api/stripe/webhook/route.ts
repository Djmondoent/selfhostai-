import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { processCheckoutSessionCompleted } from "@/lib/stripe-fulfillment";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature = headers().get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing Stripe signature or webhook secret" }, { status: 400 });
  }

  const payload = await request.text();

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await processCheckoutSessionCompleted(event.data.object, {
        eventId: event.id,
        eventType: event.type,
        source: "stripe"
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Invalid webhook event"
      },
      { status: 400 }
    );
  }
}

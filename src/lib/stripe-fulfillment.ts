import type Stripe from "stripe";
import type { Prisma } from "@prisma/client";

import { getStripe } from "@/lib/stripe";
import { markWebhookEventFailed, markWebhookEventProcessed, recordCheckoutPurchase } from "@/lib/data-store";

function toPrismaJson(value: unknown) {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

async function getReceiptUrlFromSession(sessionId: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.latest_charge"]
  });

  const paymentIntent = session.payment_intent;

  if (!paymentIntent || typeof paymentIntent === "string") {
    return null;
  }

  const latestCharge = paymentIntent.latest_charge;

  if (!latestCharge || typeof latestCharge === "string") {
    return null;
  }

  return latestCharge.receipt_url ?? null;
}

export async function processCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
  context: {
    eventId: string;
    eventType: string;
    source?: string;
  }
) {
  try {
    const receiptUrl = await getReceiptUrlFromSession(session.id);
    const purchase = await recordCheckoutPurchase(session, receiptUrl);

    await markWebhookEventProcessed({
      stripeEventId: context.eventId,
      eventType: context.eventType,
      objectId: session.id,
      payload: toPrismaJson(session),
      source: context.source
    });

    return purchase;
  } catch (error) {
    await markWebhookEventFailed({
      stripeEventId: context.eventId,
      eventType: context.eventType,
      objectId: session.id,
      payload: toPrismaJson(session),
      source: context.source,
      error: error instanceof Error ? error.message : "Unknown Stripe fulfillment error"
    });

    throw error;
  }
}

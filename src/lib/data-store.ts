import type Stripe from "stripe";
import type { Prisma } from "@prisma/client";

import { getBillingPlan, type BillingPlanKey } from "@/lib/billing";
import { prisma } from "@/lib/prisma";
import type { PurchaseRecord, SupportIntakeRecord, WebhookEventRecord } from "@/types/billing";

function mapPurchase(record: {
  id: string;
  sessionId: string;
  planKey: string;
  customerEmail: string | null;
  customerName: string | null;
  amountTotal: number | null;
  currency: string | null;
  paymentStatus: string;
  fulfilled: boolean;
  supportTier: boolean;
  receiptUrl: string | null;
  createdAt: Date;
  fulfilledAt: Date | null;
}) {
  return {
    id: record.id,
    sessionId: record.sessionId,
    planKey: record.planKey as BillingPlanKey,
    customerEmail: record.customerEmail,
    customerName: record.customerName,
    amountTotal: record.amountTotal,
    currency: record.currency,
    paymentStatus: record.paymentStatus,
    fulfilled: record.fulfilled,
    supportTier: record.supportTier,
    receiptUrl: record.receiptUrl,
    createdAt: record.createdAt.toISOString(),
    fulfilledAt: record.fulfilledAt?.toISOString() ?? null
  } satisfies PurchaseRecord;
}

function mapSupportIntake(record: {
  id: string;
  purchaseId: string;
  sessionId: string;
  planKey: string;
  customerEmail: string | null;
  contactName: string;
  projectName: string;
  projectSize: string;
  repoUrl: string;
  stack: string;
  issueSummary: string;
  desiredOutcome: string;
  status: string;
  createdAt: Date;
}) {
  return {
    id: record.id,
    purchaseId: record.purchaseId,
    sessionId: record.sessionId,
    planKey: record.planKey as BillingPlanKey,
    customerEmail: record.customerEmail,
    contactName: record.contactName,
    projectName: record.projectName,
    projectSize: record.projectSize,
    repoUrl: record.repoUrl,
    stack: record.stack,
    issueSummary: record.issueSummary,
    desiredOutcome: record.desiredOutcome,
    status: record.status,
    createdAt: record.createdAt.toISOString()
  } satisfies SupportIntakeRecord;
}

function mapWebhookEvent(record: {
  id: string;
  stripeEventId: string;
  eventType: string;
  objectId: string | null;
  status: string;
  attemptCount: number;
  lastError: string | null;
  processedAt: Date | null;
  createdAt: Date;
}) {
  return {
    id: record.id,
    stripeEventId: record.stripeEventId,
    eventType: record.eventType,
    objectId: record.objectId,
    status: record.status,
    attemptCount: record.attemptCount,
    lastError: record.lastError,
    processedAt: record.processedAt?.toISOString() ?? null,
    createdAt: record.createdAt.toISOString()
  } satisfies WebhookEventRecord;
}

export async function listPurchases() {
  const purchases = await prisma.purchase.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return purchases.map(mapPurchase);
}

export async function listSupportIntakes() {
  const records = await prisma.supportIntake.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return records.map(mapSupportIntake);
}

export async function listWebhookEvents() {
  const events = await prisma.webhookEvent.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return events.map(mapWebhookEvent);
}

export async function getPurchaseBySessionId(sessionId: string) {
  const purchase = await prisma.purchase.findUnique({
    where: {
      sessionId
    }
  });

  return purchase ? mapPurchase(purchase) : null;
}

export async function getPurchaseForSupportIntake(sessionId: string) {
  const purchase = await prisma.purchase.findUnique({
    where: {
      sessionId
    }
  });

  return purchase;
}

export async function upsertWebhookEvent(params: {
  stripeEventId: string;
  eventType: string;
  objectId: string | null;
  payload: PrismaJson;
  status: string;
  source?: string;
  lastError?: string | null;
  processedAt?: Date | null;
}) {
  return prisma.webhookEvent.upsert({
    where: {
      stripeEventId: params.stripeEventId
    },
    update: {
      eventType: params.eventType,
      objectId: params.objectId,
      payload: params.payload,
      status: params.status,
      source: params.source ?? "stripe",
      lastError: params.lastError ?? null,
      processedAt: params.processedAt ?? null,
      attemptCount: {
        increment: 1
      }
    },
    create: {
      stripeEventId: params.stripeEventId,
      eventType: params.eventType,
      objectId: params.objectId,
      payload: params.payload,
      status: params.status,
      source: params.source ?? "stripe",
      lastError: params.lastError ?? null,
      processedAt: params.processedAt ?? null,
      attemptCount: 1
    }
  });
}

export async function markWebhookEventFailed(params: {
  stripeEventId: string;
  eventType: string;
  objectId: string | null;
  payload: PrismaJson;
  error: string;
  source?: string;
}) {
  await upsertWebhookEvent({
    stripeEventId: params.stripeEventId,
    eventType: params.eventType,
    objectId: params.objectId,
    payload: params.payload,
    status: "failed",
    source: params.source,
    lastError: params.error,
    processedAt: null
  });
}

export async function markWebhookEventProcessed(params: {
  stripeEventId: string;
  eventType: string;
  objectId: string | null;
  payload: PrismaJson;
  source?: string;
}) {
  await upsertWebhookEvent({
    stripeEventId: params.stripeEventId,
    eventType: params.eventType,
    objectId: params.objectId,
    payload: params.payload,
    status: "processed",
    source: params.source,
    lastError: null,
    processedAt: new Date()
  });
}

export async function getWebhookEventByStripeId(stripeEventId: string) {
  const event = await prisma.webhookEvent.findUnique({
    where: {
      stripeEventId
    }
  });

  return event ? mapWebhookEvent(event) : null;
}

export async function recordCheckoutPurchase(
  session: Stripe.Checkout.Session,
  receiptUrl?: string | null
) {
  const plan = getBillingPlan(session.metadata?.planKey || "");

  const purchase = await prisma.purchase.upsert({
    where: {
      sessionId: session.id
    },
    update: {
      planKey: plan?.key || "selfhostai_access",
      customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
      customerName: session.customer_details?.name ?? null,
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
      fulfilled: session.payment_status === "paid",
      supportTier: plan?.kind === "support",
      receiptUrl: receiptUrl ?? null,
      fulfilledAt: session.payment_status === "paid" ? new Date() : null
    },
    create: {
      sessionId: session.id,
      planKey: plan?.key || "selfhostai_access",
      customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
      customerName: session.customer_details?.name ?? null,
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
      fulfilled: session.payment_status === "paid",
      supportTier: plan?.kind === "support",
      receiptUrl: receiptUrl ?? null,
      createdAt: new Date((session.created || Math.floor(Date.now() / 1000)) * 1000),
      fulfilledAt: session.payment_status === "paid" ? new Date() : null
    }
  });

  return mapPurchase(purchase);
}

export async function createSupportIntake(record: SupportIntakeRecord) {
  const created = await prisma.supportIntake.create({
    data: {
      purchaseId: record.purchaseId!,
      sessionId: record.sessionId,
      planKey: record.planKey,
      customerEmail: record.customerEmail,
      contactName: record.contactName,
      projectName: record.projectName,
      projectSize: record.projectSize,
      repoUrl: record.repoUrl,
      stack: record.stack,
      issueSummary: record.issueSummary,
      desiredOutcome: record.desiredOutcome,
      status: record.status || "new"
    }
  });

  return mapSupportIntake(created);
}

export async function updateSupportIntakeStatus(id: string, status: string) {
  const updated = await prisma.supportIntake.update({
    where: { id },
    data: { status }
  });

  return mapSupportIntake(updated);
}
type PrismaJson = Prisma.InputJsonValue;

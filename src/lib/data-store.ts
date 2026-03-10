import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type Stripe from "stripe";

import { getBillingPlan } from "@/lib/billing";
import type { PurchaseRecord, SupportIntakeRecord } from "@/types/billing";

const dataDir = path.join(process.cwd(), "data");
const purchasesFile = path.join(dataDir, "purchases.json");
const supportIntakesFile = path.join(dataDir, "support-intakes.json");

type PurchasesState = {
  processedEventIds: string[];
  purchases: PurchaseRecord[];
};

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T) {
  await ensureDataDir();

  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await ensureDataDir();
  await writeFile(filePath, JSON.stringify(value, null, 2));
}

export async function getPurchasesState() {
  return readJsonFile<PurchasesState>(purchasesFile, {
    processedEventIds: [],
    purchases: []
  });
}

export async function savePurchasesState(state: PurchasesState) {
  await writeJsonFile(purchasesFile, state);
}

export async function getSupportIntakes() {
  return readJsonFile<SupportIntakeRecord[]>(supportIntakesFile, []);
}

export async function saveSupportIntakes(records: SupportIntakeRecord[]) {
  await writeJsonFile(supportIntakesFile, records);
}

export async function getPurchaseBySessionId(sessionId: string) {
  const state = await getPurchasesState();
  return state.purchases.find((purchase) => purchase.sessionId === sessionId) ?? null;
}

export async function hasProcessedEvent(eventId: string) {
  const state = await getPurchasesState();
  return state.processedEventIds.includes(eventId);
}

export async function recordCheckoutPurchase(session: Stripe.Checkout.Session, eventId: string) {
  const state = await getPurchasesState();

  if (state.processedEventIds.includes(eventId)) {
    return state.purchases.find((purchase) => purchase.sessionId === session.id) ?? null;
  }

  const plan = getBillingPlan(session.metadata?.planKey || "");
  const existingIndex = state.purchases.findIndex((purchase) => purchase.sessionId === session.id);

  const purchase: PurchaseRecord = {
    sessionId: session.id,
    planKey: plan?.key || "selfhostai_access",
    customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
    customerName: session.customer_details?.name ?? null,
    amountTotal: session.amount_total,
    currency: session.currency,
    paymentStatus: session.payment_status,
    fulfilled: session.payment_status === "paid",
    supportTier: plan?.kind === "support",
    createdAt: new Date((session.created || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
    fulfilledAt: session.payment_status === "paid" ? new Date().toISOString() : null
  };

  if (existingIndex >= 0) {
    state.purchases[existingIndex] = purchase;
  } else {
    state.purchases.unshift(purchase);
  }

  state.processedEventIds.push(eventId);
  await savePurchasesState(state);
  return purchase;
}

export async function createSupportIntake(record: SupportIntakeRecord) {
  const records = await getSupportIntakes();
  records.unshift(record);
  await saveSupportIntakes(records);
  return record;
}

import type { BillingPlanKey } from "@/lib/billing";

export type PurchaseRecord = {
  id?: string;
  sessionId: string;
  planKey: BillingPlanKey;
  customerEmail: string | null;
  customerName: string | null;
  amountTotal: number | null;
  currency: string | null;
  paymentStatus: string;
  fulfilled: boolean;
  supportTier: boolean;
  receiptUrl?: string | null;
  createdAt: string;
  fulfilledAt: string | null;
};

export type SupportIntakeRecord = {
  id: string;
  purchaseId?: string;
  sessionId: string;
  planKey: BillingPlanKey;
  customerEmail: string | null;
  contactName: string;
  projectName: string;
  projectSize: string;
  repoUrl: string;
  stack: string;
  issueSummary: string;
  desiredOutcome: string;
  status?: string;
  createdAt: string;
};

export type WebhookEventRecord = {
  id: string;
  stripeEventId: string;
  eventType: string;
  objectId: string | null;
  status: string;
  attemptCount: number;
  lastError: string | null;
  processedAt: string | null;
  createdAt: string;
};

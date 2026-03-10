import type { BillingPlanKey } from "@/lib/billing";

export type PurchaseRecord = {
  sessionId: string;
  planKey: BillingPlanKey;
  customerEmail: string | null;
  customerName: string | null;
  amountTotal: number | null;
  currency: string | null;
  paymentStatus: string;
  fulfilled: boolean;
  supportTier: boolean;
  createdAt: string;
  fulfilledAt: string | null;
};

export type SupportIntakeRecord = {
  id: string;
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
  createdAt: string;
};

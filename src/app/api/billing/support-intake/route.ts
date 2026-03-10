import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { getBaseUrl } from "@/lib/billing";
import type { BillingPlanKey } from "@/lib/billing";
import { createSupportIntake, getPurchaseForSupportIntake } from "@/lib/data-store";

export async function POST(request: Request) {
  const formData = await request.formData();
  const sessionId = String(formData.get("sessionId") || "");

  const purchase = await getPurchaseForSupportIntake(sessionId);

  if (!purchase || !purchase.fulfilled) {
    return NextResponse.redirect(new URL("/pricing?error=invalid-support-intake", getBaseUrl()), 303);
  }

  await createSupportIntake({
    id: randomUUID(),
    purchaseId: purchase.id,
    sessionId,
    planKey: purchase.planKey as BillingPlanKey,
    customerEmail: purchase.customerEmail,
    contactName: String(formData.get("contactName") || ""),
    projectName: String(formData.get("projectName") || ""),
    projectSize: String(formData.get("projectSize") || ""),
    repoUrl: String(formData.get("repoUrl") || ""),
    stack: String(formData.get("stack") || ""),
    issueSummary: String(formData.get("issueSummary") || ""),
    desiredOutcome: String(formData.get("desiredOutcome") || ""),
    createdAt: new Date().toISOString()
  });

  return NextResponse.redirect(new URL(`/billing/thank-you?session_id=${sessionId}&intake=saved`, getBaseUrl()), 303);
}

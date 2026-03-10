import { NextResponse } from "next/server";

import { getBillingPlan } from "@/lib/billing";
import { getPurchaseBySessionId } from "@/lib/data-store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ status: "not-found" });
  }

  const purchase = await getPurchaseBySessionId(sessionId);

  if (!purchase) {
    return NextResponse.json({ status: "not-found" });
  }

  const plan = getBillingPlan(purchase.planKey);

  return NextResponse.json({
    status: purchase.fulfilled ? "fulfilled" : "pending",
    planName: plan?.name,
    customerEmail: purchase.customerEmail,
    supportTier: purchase.supportTier,
    receiptUrl: purchase.receiptUrl ?? null
  });
}

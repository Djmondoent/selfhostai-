"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BillingStatusResponse = {
  status: "pending" | "fulfilled" | "not-found";
  planName?: string;
  customerEmail?: string | null;
  supportTier?: boolean;
};

export function BillingSuccessClient({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState<BillingStatusResponse>({
    status: "pending"
  });

  useEffect(() => {
    let active = true;

    async function checkStatus() {
      const response = await fetch(`/api/billing/status?session_id=${encodeURIComponent(sessionId)}`, {
        cache: "no-store"
      });
      const payload = (await response.json()) as BillingStatusResponse;

      if (!active) {
        return;
      }

      setStatus(payload);

      if (payload.status === "fulfilled") {
        window.location.href = `/api/billing/access?session_id=${encodeURIComponent(sessionId)}`;
      }
    }

    checkStatus();
    const timer = window.setInterval(checkStatus, 2000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [sessionId]);

  return (
    <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-black/20 p-6">
      <p className="text-sm uppercase tracking-[0.24em] text-primary">Payment status</p>
      {status.status === "pending" ? (
        <p className="text-sm leading-7 text-muted-foreground">
          Your payment succeeded, and SelfHostAI is waiting for Stripe webhook confirmation before unlocking access.
          This usually takes a few seconds.
        </p>
      ) : null}
      {status.status === "not-found" ? (
        <>
          <p className="text-sm leading-7 text-muted-foreground">
            The purchase record is not available yet. If you just paid, wait a moment and refresh.
          </p>
          <Link href="/pricing" className={cn(buttonVariants({ variant: "secondary" }), "w-full sm:w-auto")}>
            Back to pricing
          </Link>
        </>
      ) : null}
      {status.planName ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-muted-foreground">
          <p className="font-medium text-foreground">{status.planName}</p>
          <p className="mt-2">Email: {status.customerEmail || "Captured by Stripe"}</p>
        </div>
      ) : null}
    </div>
  );
}

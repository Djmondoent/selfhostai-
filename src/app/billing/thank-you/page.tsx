import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBillingPlan } from "@/lib/billing";
import { getPurchaseBySessionId } from "@/lib/data-store";

export default async function BillingThankYouPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const sessionId = typeof searchParams?.session_id === "string" ? searchParams.session_id : "";
  const intakeSaved = typeof searchParams?.intake === "string" && searchParams.intake === "saved";
  const purchase = sessionId ? await getPurchaseBySessionId(sessionId) : null;
  const plan = purchase ? getBillingPlan(purchase.planKey) : null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-primary">Thank you</p>
        <h1 className="text-4xl font-semibold tracking-tight">Your purchase is active.</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          Stripe captured your email during checkout. If receipts are enabled in your Stripe account, the receipt will
          go there automatically.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Purchase summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="font-medium text-foreground">{plan?.name || "Purchase"}</p>
              <p className="mt-2">Email: {purchase?.customerEmail || "Captured by Stripe"}</p>
              <p className="mt-1">Session: {purchase?.sessionId || sessionId}</p>
              {purchase?.receiptUrl ? (
                <p className="mt-3">
                  <a className="text-primary hover:underline" href={purchase.receiptUrl} rel="noreferrer" target="_blank">
                    Open Stripe receipt
                  </a>
                </p>
              ) : null}
            </div>
            <Link href="/dashboard" className={buttonVariants()}>
              Open dashboard
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support intake</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {purchase?.supportTier ? (
              <>
                {intakeSaved ? (
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-muted-foreground">
                    Your support intake was saved. The admin dashboard now has your project details.
                  </div>
                ) : null}
                <form action="/api/billing/support-intake" method="POST" className="space-y-4">
                  <input type="hidden" name="sessionId" value={purchase?.sessionId || ""} />
                  <input type="hidden" name="projectSize" value={plan?.projectSize || ""} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <input className="h-11 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-foreground" name="contactName" placeholder="Your name" />
                    <input className="h-11 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-foreground" name="projectName" placeholder="Project name" />
                  </div>
                  <input className="h-11 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-foreground" name="repoUrl" placeholder="Repo URL" />
                  <input className="h-11 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-foreground" name="stack" placeholder="Stack / framework details" />
                  <textarea className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground" name="issueSummary" placeholder="What is broken or blocked right now?" />
                  <textarea className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground" name="desiredOutcome" placeholder="What would a successful outcome look like?" />
                  <button className={buttonVariants({ size: "lg" })} type="submit">
                    Submit support intake
                  </button>
                </form>
              </>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-muted-foreground">
                This purchase unlocks the toolkit. If you later need hands-on help for a larger project, return to the
                pricing page and choose a support tier.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

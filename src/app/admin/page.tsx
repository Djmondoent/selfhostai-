import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { billingPlans } from "@/lib/billing";
import { getAdminCookieName, hasAdminAccess } from "@/lib/admin-auth";
import { getPurchasesState, getSupportIntakes } from "@/lib/data-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  const cookieStore = cookies();

  if (!hasAdminAccess(cookieStore.get(getAdminCookieName())?.value)) {
    redirect("/admin/login");
  }

  const purchasesState = await getPurchasesState();
  const intakes = await getSupportIntakes();
  const fulfilledPurchases = purchasesState.purchases.filter((purchase) => purchase.fulfilled);
  const revenue = fulfilledPurchases.reduce((sum, purchase) => sum + (purchase.amountTotal || 0), 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-12 lg:px-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-primary">Admin</p>
        <h1 className="text-4xl font-semibold tracking-tight">Billing and support overview</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          Purchases are recorded by the Stripe webhook, and support intake submissions appear here once customers send
          their project details.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total purchases</CardDescription>
            <CardTitle>{purchasesState.purchases.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Fulfilled purchases</CardDescription>
            <CardTitle>{fulfilledPurchases.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Support intakes</CardDescription>
            <CardTitle>{intakes.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Recorded revenue</CardDescription>
            <CardTitle>${(revenue / 100).toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan mix</CardTitle>
          <CardDescription>Which tiers customers are actually buying.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {billingPlans.map((plan) => {
            const count = fulfilledPurchases.filter((purchase) => purchase.planKey === plan.key).length;

            return (
              <div key={plan.key} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="font-medium text-foreground">{plan.name}</p>
                <p className="mt-2 text-3xl font-semibold">{count}</p>
                <p className="mt-2 text-sm text-muted-foreground">{plan.priceLabel}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent purchases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {purchasesState.purchases.length === 0 ? (
            <p className="text-sm text-muted-foreground">No purchases recorded yet.</p>
          ) : (
            purchasesState.purchases.map((purchase) => (
              <div key={purchase.sessionId} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
                <p className="font-medium text-foreground">{purchase.planKey}</p>
                <p className="mt-2 text-muted-foreground">{purchase.customerEmail || "No email returned"}</p>
                <p className="mt-1 text-muted-foreground">
                  ${(purchase.amountTotal || 0) / 100} {purchase.currency?.toUpperCase() || "USD"} ·{" "}
                  {purchase.fulfilled ? "Fulfilled" : purchase.paymentStatus}
                </p>
                <p className="mt-1 text-muted-foreground">Session: {purchase.sessionId}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support intake queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {intakes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No support intake submissions yet.</p>
          ) : (
            intakes.map((intake) => (
              <div key={intake.id} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
                <p className="font-medium text-foreground">{intake.projectName}</p>
                <p className="mt-2 text-muted-foreground">
                  {intake.contactName} · {intake.customerEmail || "No email"} · {intake.projectSize}
                </p>
                <p className="mt-2 text-muted-foreground">Repo: {intake.repoUrl || "Not provided"}</p>
                <p className="mt-2 text-muted-foreground">Stack: {intake.stack}</p>
                <p className="mt-2 text-muted-foreground">Issue: {intake.issueSummary}</p>
                <p className="mt-2 text-muted-foreground">Desired outcome: {intake.desiredOutcome}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

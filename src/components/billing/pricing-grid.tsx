import Link from "next/link";

import { CheckoutForm } from "@/components/billing/checkout-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { billingPlans } from "@/lib/billing";

export function PricingGrid({
  hasAccess = false
}: {
  hasAccess?: boolean;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-4">
      {billingPlans.map((plan) => (
        <Card
          key={plan.key}
          className={plan.highlight ? "border-primary/20 bg-primary/10 shadow-[0_18px_50px_rgba(57,211,173,0.12)]" : ""}
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>{plan.name}</CardTitle>
                <p className="mt-1 text-sm text-primary">{plan.tagline}</p>
              </div>
              {plan.highlight ? <Badge>Popular</Badge> : null}
            </div>
            <div className="pt-3 text-4xl font-semibold text-foreground">{plan.priceLabel}</div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Best for</p>
              <p className="mt-2 text-sm font-medium text-foreground">{plan.projectSize}</p>
            </div>
            <div className="space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-6 text-muted-foreground">
                  {feature}
                </div>
              ))}
            </div>
            {hasAccess ? (
              <Link
                href="/dashboard"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-foreground transition hover:bg-white/[0.08]"
              >
                Open dashboard
              </Link>
            ) : (
              <CheckoutForm planKey={plan.key} label={plan.cta} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

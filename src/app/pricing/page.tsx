import { cookies } from "next/headers";

import { PricingGrid } from "@/components/billing/pricing-grid";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hasPaidAccess, getAccessCookieName } from "@/lib/access";

export default function PricingPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const cookieStore = cookies();
  const hasAccess = hasPaidAccess(cookieStore.get(getAccessCookieName())?.value);
  const reason = typeof searchParams?.reason === "string" ? searchParams.reason : "";
  const error = typeof searchParams?.error === "string" ? searchParams.error : "";

  return (
    <div className="relative overflow-hidden">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="space-y-6">
          <Badge className="w-fit">Pricing</Badge>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              SelfHostAI access starts at $5.99.
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Buy the toolkit once to unlock the dashboard, or choose a larger help tier when the project is too messy
              for a simple self-serve deploy.
            </p>
          </div>
        </div>

        {reason === "dashboard" ? (
          <Card className="mt-8 border-primary/20 bg-primary/10">
            <CardHeader>
              <CardTitle>Dashboard access is behind the paywall</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              Purchase any plan below to unlock the deployment workspace and the guided tools.
            </CardContent>
          </Card>
        ) : null}

        {error ? (
          <Card className="mt-8 border-red-500/20 bg-red-500/10">
            <CardHeader>
              <CardTitle>Stripe checkout needs attention</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              The billing flow returned: <span className="font-mono">{error}</span>. If this keeps happening, the
              Stripe products or API scopes are probably not configured correctly yet.
            </CardContent>
          </Card>
        ) : null}

        <div className="mt-10">
          <PricingGrid hasAccess={hasAccess} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

import Link from "next/link";

import { PageHeader } from "@/components/dashboard/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingCancelPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <PageHeader
        badge="Checkout canceled"
        title="No charge was made."
        description="You can come back to pricing at any time when you are ready to unlock the dashboard or buy help for a larger project."
      />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>What to do next</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/pricing" className={buttonVariants()}>
            Back to pricing
          </Link>
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            Return home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

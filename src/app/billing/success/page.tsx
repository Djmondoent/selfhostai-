import { PageHeader } from "@/components/dashboard/page-header";
import { BillingSuccessClient } from "@/components/billing/billing-success-client";

export default function BillingSuccessPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const sessionId = typeof searchParams?.session_id === "string" ? searchParams.session_id : "";

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <PageHeader
        badge="Payment received"
        title="Finishing your access unlock."
        description="Stripe has redirected you back. SelfHostAI is now waiting for the webhook confirmation that finalizes access and any support tier benefits."
      />
      <div className="mt-8">
        <BillingSuccessClient sessionId={sessionId} />
      </div>
    </div>
  );
}

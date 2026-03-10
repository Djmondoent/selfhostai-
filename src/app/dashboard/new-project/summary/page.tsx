import { DeploymentSummaryClient } from "@/components/dashboard/deployment-summary-client";
import { PageHeader } from "@/components/dashboard/page-header";

export default function NewProjectSummaryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Deployment Summary"
        title="Your app now has a first production brief."
        description="Use this page as the handoff between an AI-built codebase and a real Ubuntu server. Everything here is meant to be easy to copy and easy to sanity-check."
      />
      <DeploymentSummaryClient />
    </div>
  );
}

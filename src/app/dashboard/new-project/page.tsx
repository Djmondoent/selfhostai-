import { PageHeader } from "@/components/dashboard/page-header";
import { ProjectForm } from "@/components/dashboard/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="New Project"
        title="Turn loose app details into a deployment plan."
        description="Enter the basics from your AI-generated app. SelfHostAI will map them into production-ready commands, Nginx setup, and SSL steps."
      />
      <ProjectForm />
    </div>
  );
}

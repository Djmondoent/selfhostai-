import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checklistTemplate } from "@/lib/mock-data";

export default function DeploymentChecklistPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Deployment Checklist"
        title="A beginner-safe sequence for going live."
        description="Follow the order below to avoid the most common self-hosting mistakes. Each step is short on purpose: you should know what to do next without reading a wall of text."
      />

      <div className="grid gap-4">
        {checklistTemplate.map((item, index) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div>
                <div className="mb-3 text-sm text-primary">Step {index + 1}</div>
                <CardTitle>{item.title}</CardTitle>
              </div>
              <Badge variant={index < 2 ? "success" : "secondary"}>{index < 2 ? "Ready" : "Pending"}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

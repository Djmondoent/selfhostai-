import { AlertTriangle } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { troubleshootingIssues } from "@/lib/mock-data";

export default function TroubleshootingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Troubleshooting"
        title="Readable fixes for the errors that usually block a first deploy."
        description="These notes avoid jargon where possible and focus on the exact checks a beginner can run on an Ubuntu VPS."
      />

      <div className="grid gap-4">
        {troubleshootingIssues.map((issue) => (
          <Card key={issue.title}>
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Common issue</span>
                </div>
                <CardTitle>{issue.title}</CardTitle>
              </div>
              <Badge variant="secondary">Help</Badge>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <p className="text-sm font-medium text-foreground">What this usually means</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{issue.reason}</p>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                <p className="text-sm font-medium text-foreground">What to try next</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{issue.fix}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

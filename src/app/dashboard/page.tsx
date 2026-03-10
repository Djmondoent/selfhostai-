import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { ToolCard } from "@/components/dashboard/tool-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { overviewMetrics, overviewTools, recentProjects } from "@/lib/mock-data";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Overview"
        title="A deployment workspace for your AI-built app."
        description="Keep your next hosting steps visible: project details, configs, SSL instructions, and the usual mistakes that break a first launch."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {overviewMetrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Recent projects</CardTitle>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Mock data for what saved projects can look like.</p>
            </div>
            <Link href="/dashboard/new-project" className={buttonVariants({ size: "sm" })}>
              New Project
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.name} className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{project.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.framework} on {project.domain}
                    </p>
                  </div>
                  <Badge variant={project.status === "Live" ? "success" : "secondary"}>{project.status}</Badge>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <span>Local port: {project.port}</span>
                  <span>Recommended stack: PM2 + Nginx + Certbot</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested next actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Generate a project summary for the first app you want online.",
              "Review the Nginx config before opening port 443.",
              "Issue SSL only after the HTTP site loads on the right server.",
              "Keep environment variables in `.env`, not hardcoded in the repo."
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                <span className="text-sm leading-6 text-muted-foreground">{item}</span>
              </div>
            ))}
            <Link href="/dashboard/troubleshooting" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              Open troubleshooting library
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {overviewTools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </div>
  );
}

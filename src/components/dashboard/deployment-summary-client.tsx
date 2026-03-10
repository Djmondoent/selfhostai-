"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CommandBlock } from "@/components/ui/command-block";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateDeploymentSummary } from "@/lib/generators";
import type { ProjectInput } from "@/types/project";

const storageKey = "selfhostai-project";

export function DeploymentSummaryClient() {
  const [project, setProject] = useState<ProjectInput | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return;
    }

    setProject(JSON.parse(raw) as ProjectInput);
  }, []);

  if (!project) {
    return (
      <EmptyState
        title="No project summary yet"
        description="Open the New Project page, fill in the basics, and SelfHostAI will generate a deployment brief here."
      />
    );
  }

  const summary = generateDeploymentSummary(project);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap gap-2">
            {summary.labels.map((label) => (
              <Badge key={label}>{label}</Badge>
            ))}
          </div>
          <div>
            <CardTitle className="text-2xl">{project.projectName}</CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This summary turns your raw app details into a first production plan for Ubuntu, PM2, Nginx, and SSL.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
            <p className="text-sm font-semibold text-foreground">Deployment checklist</p>
            <div className="space-y-3">
              {summary.checklist.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <Badge variant={item.done ? "success" : "secondary"}>{item.done ? "Ready" : "Pending"}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
              <p className="text-sm font-semibold text-foreground">Environment variables to confirm</p>
              <div className="mt-4 space-y-3">
                {summary.envVars.length > 0 ? (
                  summary.envVars.map((envVar) => (
                    <div key={envVar.key} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                      <p className="font-mono text-sm text-primary">{envVar.key}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Value example: <span className="font-mono">{envVar.value || "set this before deploy"}</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No env vars listed yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
              <p className="text-sm font-semibold text-foreground">Critical commands</p>
              <div className="mt-4 space-y-4">
                {summary.guideSteps.map((step) => (
                  <div key={step.title} className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                    <div>
                      <p className="font-medium text-foreground">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.body}</p>
                    </div>
                    {step.command ? <CommandBlock command={step.command} /> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard/nginx-config" className={buttonVariants()}>
          Open Nginx Generator
        </Link>
        <Link href="/dashboard/ssl-https" className={buttonVariants({ variant: "secondary" })}>
          Review SSL Setup
        </Link>
      </div>
    </div>
  );
}

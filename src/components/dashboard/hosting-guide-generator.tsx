"use client";

import { useState } from "react";

import { CommandBlock } from "@/components/ui/command-block";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { frameworks, type Framework, type GuideStep } from "@/types/project";

export function HostingGuideGenerator() {
  const [framework, setFramework] = useState<Framework>("Next.js");
  const [domain, setDomain] = useState("selfhostai.xyz");
  const [repoUrl, setRepoUrl] = useState("https://github.com/example/selfhostai-app");
  const [steps, setSteps] = useState<GuideStep[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const response = await fetch("/api/generate/deployment-guide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectName: "Generated Project",
        framework,
        domain,
        repoUrl
      })
    });

    const payload = (await response.json()) as { steps: GuideStep[] };
    setSteps(payload.steps);
    setLoading(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
      <Card>
        <CardHeader>
          <CardTitle>Generate a deployment guide</CardTitle>
          <CardDescription>
            Pick a framework and domain to create a copy-ready Ubuntu launch guide for your AI-built app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="framework">Framework</Label>
            <Select id="framework" value={framework} onChange={(event) => setFramework(event.target.value as Framework)}>
              {frameworks.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Input id="domain" value={domain} onChange={(event) => setDomain(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repoUrl">Repo URL</Label>
            <Input id="repoUrl" value={repoUrl} onChange={(event) => setRepoUrl(event.target.value)} />
          </div>
          <Button type="button" className="w-full" onClick={handleGenerate}>
            {loading ? "Generating..." : "Generate guide"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guide output</CardTitle>
          <CardDescription>Each step explains the goal first, then gives the exact command to run.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-black/25 p-8 text-center">
              <p className="font-medium text-foreground">No guide generated yet</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Choose the framework details on the left, then click Generate guide.
              </p>
            </div>
          ) : (
            steps.map((step) => (
              <div key={step.title} className="space-y-3 rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
                <div>
                  <p className="font-medium text-foreground">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
                </div>
                {step.command ? <CommandBlock command={step.command} /> : null}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

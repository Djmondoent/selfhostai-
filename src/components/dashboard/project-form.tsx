"use client";

import { ArrowRight, WandSparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getFrameworkDefaults } from "@/lib/generators";
import { frameworks, type Framework, type ProjectInput } from "@/types/project";

const storageKey = "selfhostai-project";

const initialState: ProjectInput = {
  projectName: "",
  domain: "selfhostai.xyz",
  framework: "Next.js",
  port: "3000",
  repoUrl: "",
  buildCommand: "npm run build",
  startCommand: "npm run start",
  environmentVariables: "DATABASE_URL=postgresql://user:password@host:5432/app\nAPP_URL=https://app.example.com"
};

export function ProjectForm() {
  const router = useRouter();
  const [form, setForm] = useState<ProjectInput>(initialState);

  function updateField<Key extends keyof ProjectInput>(key: Key, value: ProjectInput[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleFrameworkChange(framework: Framework) {
    const defaults = getFrameworkDefaults(framework);
    setForm((current) => ({
      ...current,
      framework,
      buildCommand: defaults.build,
      startCommand: defaults.start,
      port: defaults.port
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(storageKey, JSON.stringify(form));
    router.push("/dashboard/new-project/summary");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Project intake</CardTitle>
          <CardDescription>
            Fill in what you know. If the AI never gave you exact commands, start with the defaults and adjust later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project name</Label>
                <Input
                  id="projectName"
                  placeholder="Customer Portal"
                  value={form.projectName}
                  onChange={(event) => updateField("projectName", event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  placeholder="app.selfhostai.xyz"
                  value={form.domain}
                  onChange={(event) => updateField("domain", event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Select
                  id="framework"
                  value={form.framework}
                  onChange={(event) => handleFrameworkChange(event.target.value as Framework)}
                >
                  {frameworks.map((framework) => (
                    <option key={framework} value={framework}>
                      {framework}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  placeholder="3000"
                  value={form.port}
                  onChange={(event) => updateField("port", event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="repoUrl">Repo URL</Label>
              <Input
                id="repoUrl"
                placeholder="https://github.com/you/your-app"
                value={form.repoUrl}
                onChange={(event) => updateField("repoUrl", event.target.value)}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="buildCommand">Build command</Label>
                <Input
                  id="buildCommand"
                  placeholder="npm run build"
                  value={form.buildCommand}
                  onChange={(event) => updateField("buildCommand", event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startCommand">Start command</Label>
                <Input
                  id="startCommand"
                  placeholder="npm run start"
                  value={form.startCommand}
                  onChange={(event) => updateField("startCommand", event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="environmentVariables">Environment variables</Label>
              <Textarea
                id="environmentVariables"
                placeholder="DATABASE_URL=..."
                value={form.environmentVariables}
                onChange={(event) => updateField("environmentVariables", event.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" size="lg">
                Generate deployment summary
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => {
                  localStorage.setItem(storageKey, JSON.stringify(form));
                  router.push("/dashboard/hosting-guides");
                }}
              >
                Generate Hosting Guide
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <WandSparkles className="h-6 w-6" />
          </div>
          <CardTitle>Plain-English helper</CardTitle>
          <CardDescription>
            The app assumes you want a safe, reversible first deployment. It does not skip the boring parts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 text-sm leading-7 text-muted-foreground">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="font-medium text-foreground">What to put in “port”</p>
            <p>If your app runs locally at `http://localhost:3000`, then your port is `3000`.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="font-medium text-foreground">What “build command” means</p>
            <p>This is the command that prepares your app for production, usually `npm run build`.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="font-medium text-foreground">What if the repo is private?</p>
            <p>You can still use this MVP. Treat the repo field as a reminder and clone it manually on your server.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

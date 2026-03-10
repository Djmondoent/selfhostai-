"use client";

import { useState } from "react";

import { CommandBlock } from "@/components/ui/command-block";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NginxConfigGenerator() {
  const [domain, setDomain] = useState("selfhostai.xyz");
  const [wwwDomain, setWwwDomain] = useState("www.selfhostai.xyz");
  const [port, setPort] = useState("3000");
  const [projectName, setProjectName] = useState("selfhostai");
  const [config, setConfig] = useState("# Click Generate config to create your Nginx file.");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const response = await fetch("/api/generate/nginx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        domain,
        wwwDomain,
        port,
        projectName
      })
    });
    const payload = (await response.json()) as { config: string };
    setConfig(payload.config);
    setLoading(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <Card>
        <CardHeader>
          <CardTitle>Reverse proxy details</CardTitle>
          <CardDescription>
            This creates a ready-to-copy Nginx server block for a public domain pointing at a private localhost app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="domain">Root domain</Label>
            <Input id="domain" value={domain} onChange={(event) => setDomain(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wwwDomain">www domain</Label>
            <Input id="wwwDomain" value={wwwDomain} onChange={(event) => setWwwDomain(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">App port</Label>
            <Input id="port" value={port} onChange={(event) => setPort(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectName">Project slug</Label>
            <Input id="projectName" value={projectName} onChange={(event) => setProjectName(event.target.value)} />
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-muted-foreground">
            Keep the app bound to `127.0.0.1:{port}`. Nginx should be the only public-facing service.
          </div>
          <Button type="button" variant="secondary" className="w-full" onClick={handleGenerate}>
            {loading ? "Generating..." : "Generate config"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Nginx config</CardTitle>
          <CardDescription>
            Includes HTTP to HTTPS redirect, websocket headers, proxy forwarding, and comments for beginners.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <CommandBlock command={config} />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="font-medium text-foreground">Step 1</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Save the file into `sites-available`.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="font-medium text-foreground">Step 2</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Symlink it into `sites-enabled` and test with `nginx -t`.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="font-medium text-foreground">Step 3</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Reload Nginx, then issue the SSL certificate once HTTP works.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

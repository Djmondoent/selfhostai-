import { HostingGuideGenerator } from "@/components/dashboard/hosting-guide-generator";
import { CommandBlock } from "@/components/ui/command-block";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hostingGuideSummaries } from "@/lib/mock-data";

const ubuntuCommands = [
  "sudo apt update && sudo apt upgrade -y",
  "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -",
  "sudo apt install -y nodejs nginx git",
  "sudo npm install -g pm2"
];

export default function HostingGuidesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Hosting Guides"
        title="Framework-aware deployment guides for beginner operators."
        description="Start with your framework, then copy the commands for a standard Ubuntu VPS deployment. These are mock guides for the MVP, but they are production-shaped."
      />

      <HostingGuideGenerator />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Ubuntu server bootstrap</CardTitle>
            <CardDescription>Run these once on a fresh VPS before deploying your app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ubuntuCommands.map((command) => (
              <CommandBlock key={command} command={command} />
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {hostingGuideSummaries.map((guide) => (
            <Card key={guide.framework}>
              <CardHeader>
                <CardTitle>{guide.framework}</CardTitle>
                <CardDescription>{guide.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {guide.stack.map((item) => (
                    <div key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
                <CommandBlock
                  command={
                    guide.framework === "Next.js"
                      ? "git clone <repo> app && cd app && npm install && npm run build && pm2 start npm --name app -- start"
                      : guide.framework === "React"
                        ? "git clone <repo> app && cd app && npm install && npm run build"
                        : "git clone <repo> api && cd api && npm install && pm2 start server.js --name api"
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

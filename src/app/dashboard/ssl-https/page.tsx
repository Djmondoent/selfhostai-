import { CommandBlock } from "@/components/ui/command-block";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSslCommands } from "@/lib/generators";

const sslCommands = generateSslCommands("selfhostai.xyz");

export default function SslHttpsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="SSL / HTTPS Setup"
        title="Enable HTTPS with Certbot once the HTTP site works."
        description="These steps assume your DNS already points to the VPS and your Nginx server block loads correctly on port 80."
      />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle>What happens during SSL setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="font-medium text-foreground">1. Install Certbot</p>
              <p>Certbot requests the certificate and helps Nginx use it safely.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="font-medium text-foreground">2. Validate the root domain</p>
              <p>Use the single-domain command if you only want `selfhostai.xyz` to be covered.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="font-medium text-foreground">3. Add the `www` subdomain if needed</p>
              <p>Use the second command if you want both the root domain and `www.selfhostai.xyz` to work.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="font-medium text-foreground">4. Test auto-renewal</p>
              <p>Certbot can renew automatically, but a dry run helps you catch issues early.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Copy-paste SSL commands</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sslCommands.map((command) => (
              <CommandBlock key={command} command={command} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

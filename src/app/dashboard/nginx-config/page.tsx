import { NginxConfigGenerator } from "@/components/dashboard/nginx-config-generator";
import { PageHeader } from "@/components/dashboard/page-header";

export default function NginxConfigPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Nginx Config Generator"
        title="Generate a clean reverse proxy config for your domain."
        description="Use this when your app runs on a local port like 3000 and you want Nginx to expose it securely on a real domain with websocket support."
      />
      <NginxConfigGenerator />
    </div>
  );
}

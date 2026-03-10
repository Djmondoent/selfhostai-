import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 text-sm text-muted-foreground lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="space-y-2">
          <p className="font-semibold text-foreground">SelfHostAI</p>
          <p>Self-host your AI-built app without the headache.</p>
          <p>Built for beginner-friendly VPS deployments on Ubuntu, Nginx, and PM2.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/dashboard/nginx-config" className="hover:text-foreground">
            Nginx Generator
          </Link>
          <Link href="/dashboard/ssl-https" className="hover:text-foreground">
            SSL Guide
          </Link>
          <Link href="/dashboard/troubleshooting" className="hover:text-foreground">
            Troubleshooting
          </Link>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardLinks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-glow backdrop-blur-sm lg:w-72">
      <div className="mb-6 flex items-center gap-3 px-3 py-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/30">
          <span className="font-mono text-sm font-semibold">SH</span>
        </div>
        <div>
          <p className="font-semibold">SelfHostAI</p>
          <p className="text-xs text-muted-foreground">Deployment workspace</p>
        </div>
      </div>
      <nav className="space-y-1">
        {dashboardLinks.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground",
                active && "bg-primary/12 text-foreground ring-1 ring-primary/20"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 rounded-3xl border border-primary/15 bg-primary/10 p-4">
        <p className="text-sm font-semibold text-foreground">Beginner tip</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Start with one app, one domain, and one port. That makes debugging much easier.
        </p>
      </div>
    </aside>
  );
}

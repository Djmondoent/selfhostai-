import type { ReactNode } from "react";

import { SidebarNav } from "@/components/dashboard/sidebar-nav";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(57,211,173,0.12),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
        <SidebarNav />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

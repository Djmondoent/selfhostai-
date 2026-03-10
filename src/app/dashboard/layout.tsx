import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getAccessCookieName, hasPaidAccess } from "@/lib/access";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();

  if (!hasPaidAccess(cookieStore.get(getAccessCookieName())?.value)) {
    redirect("/pricing?reason=dashboard");
  }

  return <DashboardShell>{children}</DashboardShell>;
}

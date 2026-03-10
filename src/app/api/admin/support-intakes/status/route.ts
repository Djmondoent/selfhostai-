import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminCookieName, hasAdminAccess } from "@/lib/admin-auth";
import { getBaseUrl } from "@/lib/billing";
import { updateSupportIntakeStatus } from "@/lib/data-store";

export async function POST(request: Request) {
  const cookieStore = cookies();

  if (!hasAdminAccess(cookieStore.get(getAdminCookieName())?.value)) {
    return NextResponse.redirect(new URL("/admin/login?error=unauthorized", getBaseUrl()), 303);
  }

  const formData = await request.formData();
  const intakeId = String(formData.get("intakeId") || "");
  const status = String(formData.get("status") || "");

  if (!intakeId || !status) {
    return NextResponse.redirect(new URL("/admin?error=missing-intake-status", getBaseUrl()), 303);
  }

  await updateSupportIntakeStatus(intakeId, status);
  return NextResponse.redirect(new URL("/admin?updated=intake-status", getBaseUrl()), 303);
}

import { NextResponse } from "next/server";

import { generateDeploymentGuide } from "@/lib/generators";
import type { ProjectInput } from "@/types/project";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ProjectInput>;
  const steps = generateDeploymentGuide(body);

  return NextResponse.json({ steps });
}

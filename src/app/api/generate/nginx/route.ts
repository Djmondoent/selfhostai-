import { NextResponse } from "next/server";

import { generateNginxConfig } from "@/lib/generators";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    domain?: string;
    wwwDomain?: string;
    port?: string;
    projectName?: string;
  };

  const config = generateNginxConfig({
    domain: body.domain || "selfhostai.xyz",
    wwwDomain: body.wwwDomain,
    port: body.port || "3000",
    projectName: body.projectName || "selfhostai"
  });

  return NextResponse.json({ config });
}

import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Shield, Sparkles, TerminalSquare } from "lucide-react";

import { PricingGrid } from "@/components/billing/pricing-grid";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccessCookieName, hasPaidAccess } from "@/lib/access";
import {
  faqs,
  heroStats,
  howItWorks,
  pricingTiers,
  stuckReasons,
  supportedApps
} from "@/lib/mock-data";

export default function HomePage() {
  const cookieStore = cookies();
  const hasAccess = hasPaidAccess(cookieStore.get(getAccessCookieName())?.value);

  return (
    <div className="relative overflow-hidden">
      <SiteHeader />
      <main>
        <section className="relative">
          <div className="absolute inset-0 bg-hero-grid bg-[length:140px_140px] opacity-10" />
          <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-28">
            <div className="relative z-10 space-y-8">
              <Badge className="w-fit">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                From vibe-coded to live in production
              </Badge>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                  Self-host your AI-built app without the headache.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  SelfHostAI helps non-technical founders turn AI-generated apps into real deployments with step-by-step
                  hosting guides, Nginx configs, SSL setup, and plain-English troubleshooting.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href={hasAccess ? "/dashboard/new-project" : "/pricing"} className={buttonVariants({ size: "lg" })}>
                  {hasAccess ? "Open Dashboard" : "Unlock Access"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={hasAccess ? "/dashboard/hosting-guides" : "/pricing"} className={buttonVariants({ variant: "secondary", size: "lg" })}>
                  Generate Hosting Guide
                </Link>
                <Link href={hasAccess ? "/dashboard/nginx-config" : "/pricing"} className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Deploy My App
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-glow">
                    <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <Card className="overflow-hidden border-primary/15 bg-black/35">
                <CardHeader className="border-b border-white/10 bg-white/[0.02]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle>Deployment snapshot</CardTitle>
                      <CardDescription>What a beginner-friendly production plan looks like.</CardDescription>
                    </div>
                    <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary">
                      MVP Preview
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 p-6">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">Customer Portal</p>
                        <p className="text-sm text-muted-foreground">Next.js app on `app.selfhostai.xyz`</p>
                      </div>
                      <Badge variant="success">Ready to ship</Badge>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {[
                        "Clone repo and install dependencies",
                        "Build with npm run build",
                        "Start with PM2 on port 3000",
                        "Proxy public traffic through Nginx",
                        "Enable HTTPS with Certbot"
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-2xl bg-black/25 px-4 py-3">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                      <Shield className="h-5 w-5 text-primary" />
                      <p className="mt-3 font-medium text-foreground">Trustworthy by default</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Outputs are copy-paste ready and explain why each server step matters.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                      <TerminalSquare className="h-5 w-5 text-primary" />
                      <p className="mt-3 font-medium text-foreground">Practical tooling</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Build commands, PM2 process names, Nginx files, and SSL steps in one place.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="A simple path from unfinished prompt app to stable deployment."
            description="The app translates fuzzy AI-generated project details into a deployment guide a beginner can actually follow."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="pt-4">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="Why Users Get Stuck"
              title="AI can generate the app, but it usually does not generate ownership."
              description="Most people do not need more code. They need clarity around ports, domains, process managers, and production-safe defaults."
            />
            <div className="grid gap-4">
              {stuckReasons.map((reason, index) => (
                <Card key={reason.title} className="flex flex-col justify-between">
                  <CardHeader>
                    <div className="text-sm text-primary">0{index + 1}</div>
                    <CardTitle>{reason.title}</CardTitle>
                    <CardDescription>{reason.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="supported-apps" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Supported App Types"
            title="Built for the app shapes AI tools generate most often."
            description="Start with a framework-aware guide instead of generic server tutorials."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {supportedApps.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/6 text-primary ring-1 ring-white/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="pt-4">{item.title}</CardTitle>
                    <CardDescription>{item.subtitle}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Pay once to unlock SelfHostAI, then choose bigger help when the project gets bigger."
            description="The base toolkit is $5.99. Support tiers scale up when the codebase is too large or too messy for a pure DIY deployment."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {pricingTiers.map((tier) => (
              <Card key={tier.name} className={tier.highlight ? "border-primary/20 bg-primary/10" : ""}>
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="text-4xl font-semibold">{tier.price}</div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm leading-6 text-muted-foreground">
                      {feature}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12">
            <PricingGrid hasAccess={hasAccess} />
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions from people shipping their first self-hosted app."
            description="Every answer is written for someone who is comfortable copying commands, but not comfortable debugging a server from scratch."
          />
          <div className="mt-12 grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-foreground">
                  {faq.question}
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import Link from "next/link";
import { cookies } from "next/headers";

import { buttonVariants } from "@/components/ui/button";
import { getAccessCookieName, hasPaidAccess } from "@/lib/access";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Supported apps", href: "#supported-apps" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" }
];

export function SiteHeader() {
  const cookieStore = cookies();
  const hasAccess = hasPaidAccess(cookieStore.get(getAccessCookieName())?.value);

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25">
            <span className="font-mono text-sm font-semibold">SH</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">SelfHostAI</div>
            <div className="text-xs text-muted-foreground">selfhostai.xyz</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={hasAccess ? "/dashboard" : "/pricing"} className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:inline-flex")}>
            Dashboard
          </Link>
          <Link href={hasAccess ? "/dashboard/new-project" : "/pricing"} className={buttonVariants()}>
            {hasAccess ? "Open App" : "Unlock Access"}
          </Link>
        </div>
      </div>
    </header>
  );
}

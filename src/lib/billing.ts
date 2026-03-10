export type BillingPlanKey =
  | "selfhostai_access"
  | "selfhostai_small_help"
  | "selfhostai_growth_help"
  | "selfhostai_rescue_help";

export type BillingPlan = {
  key: BillingPlanKey;
  productId: string;
  lookupKey: string;
  name: string;
  tagline: string;
  priceLabel: string;
  amount: number;
  projectSize: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  kind: "access" | "support";
};

export const BILLING_COOKIE_NAME = "selfhostai_access";

export const billingPlans: BillingPlan[] = [
  {
    key: "selfhostai_access",
    productId: "selfhostai_access",
    lookupKey: "selfhostai_access_599",
    name: "SelfHostAI Access",
    tagline: "Unlock the toolkit",
    priceLabel: "$5.99",
    amount: 599,
    projectSize: "DIY builders",
    description:
      "One-time access to the deployment workspace, generators, and checklists for people who mostly need a calm path to self-hosting.",
    features: [
      "Unlock the dashboard and generators",
      "Deployment summaries and Nginx configs",
      "SSL setup and troubleshooting library",
      "Best for one small project you can mostly handle yourself"
    ],
    cta: "Unlock for $5.99",
    highlight: true,
    kind: "access"
  },
  {
    key: "selfhostai_small_help",
    productId: "selfhostai_small_help",
    lookupKey: "selfhostai_small_help_2900",
    name: "Small Project Help",
    tagline: "Single-service rescue",
    priceLabel: "$29",
    amount: 2900,
    projectSize: "Small app",
    description:
      "For a straightforward Next.js, React, Node, Flask, Laravel, or static app that mostly needs one production push and a few fixes.",
    features: [
      "Everything in SelfHostAI Access",
      "Best for one service and one domain",
      "Recommended when the issue count is small and localized",
      "Suitable for simple apps with under roughly 15 touched files"
    ],
    cta: "Buy small-project help",
    kind: "support"
  },
  {
    key: "selfhostai_growth_help",
    productId: "selfhostai_growth_help",
    lookupKey: "selfhostai_growth_help_7900",
    name: "Growth Project Help",
    tagline: "Full-stack deployment help",
    priceLabel: "$79",
    amount: 7900,
    projectSize: "Medium app",
    description:
      "For full-stack apps with auth, env vars, database wiring, or production build issues that need more than a quick fix.",
    features: [
      "Everything in SelfHostAI Access",
      "Designed for multi-step deployment cleanup",
      "Better fit for auth, database, and environment debugging",
      "Suitable for projects with roughly 15 to 50 important files"
    ],
    cta: "Buy growth-project help",
    kind: "support"
  },
  {
    key: "selfhostai_rescue_help",
    productId: "selfhostai_rescue_help",
    lookupKey: "selfhostai_rescue_help_14900",
    name: "Rescue Project Help",
    tagline: "Inherited or messy app rescue",
    priceLabel: "$149",
    amount: 14900,
    projectSize: "Large / inherited app",
    description:
      "For bigger or more chaotic codebases where the original AI build is hard to understand and the production path is risky.",
    features: [
      "Everything in SelfHostAI Access",
      "Best for inherited or partially broken projects",
      "Better fit for multi-service or heavily patched apps",
      "Recommended when the project scope is too large for a quick rescue"
    ],
    cta: "Buy rescue help",
    kind: "support"
  }
];

export function getBillingPlan(planKey: string) {
  return billingPlans.find((plan) => plan.key === planKey);
}

export function getBaseUrl() {
  return process.env.APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
}

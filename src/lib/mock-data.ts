import {
  Activity,
  BadgeCheck,
  Cable,
  FileCog,
  Globe,
  HardDriveUpload,
  LifeBuoy,
  Lock,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Wrench
} from "lucide-react";

export const heroStats = [
  { label: "Guided deploy steps", value: "6" },
  { label: "Starter frameworks", value: "6" },
  { label: "Copy-paste commands", value: "30+" }
];

export const howItWorks = [
  {
    title: "Describe your app",
    description:
      "Tell SelfHostAI what framework you used, which domain you want, and what command starts the project.",
    icon: Sparkles
  },
  {
    title: "Generate your hosting plan",
    description:
      "Get an Ubuntu, PM2, Nginx, and SSL checklist tailored to your app instead of generic docs.",
    icon: FileCog
  },
  {
    title: "Launch with confidence",
    description:
      "Copy the commands, follow the explanations, and fix common errors before they take your app offline.",
    icon: ShieldCheck
  }
];

export const stuckReasons = [
  {
    title: "The AI built it, but never explained it",
    description:
      "Generated apps often work once, then fall apart when you need environment variables, ports, or deployment commands."
  },
  {
    title: "Credits ran out mid-project",
    description:
      "You end up with a half-finished codebase and no clear path to ship it or keep it alive on your own server."
  },
  {
    title: "Production errors feel opaque",
    description:
      "Terms like reverse proxy, build output, or SSL certs can block a launch even when the app itself is fine."
  }
];

export const supportedApps = [
  {
    title: "Next.js apps",
    subtitle: "App Router, API routes, server-rendered frontends",
    icon: Globe
  },
  {
    title: "React SPAs",
    subtitle: "Vite or CRA-style frontends behind Nginx",
    icon: HardDriveUpload
  },
  {
    title: "Node services",
    subtitle: "Express, Fastify, websockets, worker processes",
    icon: Cable
  },
  {
    title: "Flask and Laravel",
    subtitle: "Basic deployment mapping even when the app was AI-generated",
    icon: Wrench
  },
  {
    title: "Static sites",
    subtitle: "Simple hosting with redirects, domains, and SSL",
    icon: BadgeCheck
  }
];

export const pricingTiers = [
  {
    name: "SelfHostAI Access",
    price: "$5.99",
    description: "One-time paywall unlock for the dashboard, generators, and deployment toolkit.",
    features: [
      "Unlock the deployment workspace",
      "Generate project summaries and guides",
      "Copy-ready Nginx, SSL, and troubleshooting tools"
    ]
  },
  {
    name: "Project Help Tiers",
    price: "$29-$149",
    description: "Support packages scaled by project size when self-serve access is not enough.",
    features: [
      "Small project help for simple apps",
      "Growth project help for full-stack deployments",
      "Rescue help for inherited or messy codebases"
    ],
    highlight: true
  }
];

export const faqs = [
  {
    question: "What does self-host your vibe-coded app mean?",
    answer:
      "It means taking an app that was mostly generated with AI and putting it on your own server so you control the code, domain, and uptime."
  },
  {
    question: "Do I need to understand DevOps first?",
    answer:
      "No. SelfHostAI explains each step in plain English and gives commands you can copy into your Ubuntu VPS."
  },
  {
    question: "Will this deploy the app automatically?",
    answer:
      "This MVP generates deployment plans, configs, and guides. It is designed to remove guesswork before full automation is added."
  },
  {
    question: "Can I use this for a non-Next.js project?",
    answer:
      "Yes. The app includes starter paths for React, Node, Flask, Laravel, and static sites."
  }
];

export const dashboardLinks = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Activity
  },
  {
    title: "New Project",
    href: "/dashboard/new-project",
    icon: Sparkles
  },
  {
    title: "Hosting Guides",
    href: "/dashboard/hosting-guides",
    icon: FileCog
  },
  {
    title: "Deployment Checklist",
    href: "/dashboard/deployment-checklist",
    icon: BadgeCheck
  },
  {
    title: "Nginx Config Generator",
    href: "/dashboard/nginx-config",
    icon: TerminalSquare
  },
  {
    title: "SSL / HTTPS Setup",
    href: "/dashboard/ssl-https",
    icon: Lock
  },
  {
    title: "Troubleshooting",
    href: "/dashboard/troubleshooting",
    icon: LifeBuoy
  }
];

export const overviewMetrics = [
  { label: "Projects ready to deploy", value: "12" },
  { label: "Open infrastructure tasks", value: "4" },
  { label: "Common issues prevented", value: "18" }
];

export const recentProjects = [
  {
    name: "Client Portal",
    framework: "Next.js",
    domain: "portal.selfhostai.xyz",
    status: "Ready for SSL",
    port: 3000
  },
  {
    name: "Feedback API",
    framework: "Node",
    domain: "api.selfhostai.xyz",
    status: "Waiting on env vars",
    port: 4000
  },
  {
    name: "Landing Mirror",
    framework: "Static Site",
    domain: "mirror.selfhostai.xyz",
    status: "Live",
    port: 8080
  }
];

export const overviewTools = [
  {
    title: "Deploy a new app",
    description:
      "Start with the project form and turn loose app details into a clear production checklist.",
    href: "/dashboard/new-project"
  },
  {
    title: "Generate an Nginx file",
    description:
      "Create a reverse proxy config with SSL redirects, websocket headers, and beginner comments.",
    href: "/dashboard/nginx-config"
  },
  {
    title: "Fix deployment errors",
    description:
      "Use readable troubleshooting notes for build issues, 502 errors, ports, DNS, and missing secrets.",
    href: "/dashboard/troubleshooting"
  }
];

export const hostingGuideSummaries = [
  {
    framework: "Next.js",
    summary: "Use `npm run build`, run with PM2, and proxy traffic from Nginx to the app port.",
    stack: ["Node 20", "PM2", "Nginx", "Certbot"]
  },
  {
    framework: "React",
    summary:
      "Build static assets, serve them behind Nginx, or run a preview server if you need app-level routing.",
    stack: ["Node 20", "Nginx", "Optional PM2"]
  },
  {
    framework: "Node",
    summary: "Run your server process with PM2 and expose it safely through Nginx.",
    stack: ["Node 20", "PM2", "Nginx"]
  }
];

export const checklistTemplate = [
  {
    id: "dns",
    title: "Confirm the domain points to your VPS",
    description: "Your `A` record should point to the public IP of the Ubuntu server."
  },
  {
    id: "runtime",
    title: "Install the runtime your app needs",
    description: "For most vibe-coded apps that means Node.js 20 and npm."
  },
  {
    id: "env",
    title: "Set environment variables before first start",
    description: "API keys, database URLs, and secrets should live in `.env`, not in the code."
  },
  {
    id: "pm2",
    title: "Run the app with PM2",
    description: "PM2 keeps the process alive after reboots or crashes."
  },
  {
    id: "nginx",
    title: "Put Nginx in front of the app",
    description: "Nginx handles the public domain, HTTPS, redirects, and websocket proxying."
  },
  {
    id: "ssl",
    title: "Issue an SSL certificate",
    description: "Use Certbot after the site responds on HTTP and DNS is correct."
  }
];

export const troubleshootingIssues = [
  {
    title: "App won’t start",
    reason:
      "The start command may be wrong, dependencies may be missing, or the build step did not finish.",
    fix: "Run the build command manually, read the terminal error, and verify the start command matches your framework."
  },
  {
    title: "Port already in use",
    reason: "Another app is already listening on the same local port.",
    fix: "Choose a free port like 3001, update PM2 and Nginx, then restart both services."
  },
  {
    title: "502 Bad Gateway",
    reason:
      "Nginx can’t reach the upstream app, usually because the process is down or the port is wrong.",
    fix: "Check `pm2 status`, confirm the local port, and review `/var/log/nginx/error.log`."
  },
  {
    title: "DNS not pointing correctly",
    reason: "The domain still points somewhere else or the record has not propagated yet.",
    fix: "Verify the `A` record, wait for propagation, and retry Certbot only after the domain resolves to your VPS."
  },
  {
    title: "SSL certificate issues",
    reason:
      "Certbot can fail if DNS is wrong, port 80 is blocked, or the Nginx server block is incomplete.",
    fix: "Test the HTTP site first, then rerun Certbot with the correct root and `www` domains."
  },
  {
    title: "Environment variables missing",
    reason: "The app expects secrets that were never added on the server.",
    fix: "Compare your local `.env` file with the server version and restart PM2 after changes."
  },
  {
    title: "Next.js build failures",
    reason: "The app may rely on invalid imports, missing env vars, or unsupported server code.",
    fix: "Run `npm run build`, fix the first real error shown, and only redeploy after the build succeeds locally."
  }
];

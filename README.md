# SelfHostAI

SelfHostAI is a polished Next.js 14 MVP for helping non-technical users self-host AI-generated apps on an Ubuntu VPS.

It includes:

- A premium landing page for `selfhostai.xyz`
- A dashboard with project intake, deployment summary, hosting guides, checklist, Nginx generator, SSL guide, and troubleshooting
- Mock data and beginner-friendly copy throughout
- Prisma setup for PostgreSQL
- Deployment artifacts for PM2, Nginx, and Certbot

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- `shadcn/ui`-style components
- Lucide icons
- Prisma ORM
- PostgreSQL-ready configuration

## Local development

1. Install dependencies:

```bash
npm install
```

2. Copy the environment example:

```bash
cp .env.example .env.local
```

3. Generate the Prisma client:

```bash
npm run prisma:generate
```

4. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Database

This MVP ships with a starter Prisma schema in [prisma/schema.prisma](/var/www/selfhostai/prisma/schema.prisma). It is configured for PostgreSQL so you can point it at Neon, Supabase, or any other Postgres instance with `DATABASE_URL`.

Useful commands:

```bash
npm run prisma:generate
npm run db:push
```

## Project structure

- `src/app`: App Router pages and API routes
- `src/components`: reusable UI, dashboard, and marketing components
- `src/lib`: generators, utilities, mock data, Prisma helper
- `src/types`: shared project types
- `prisma`: Prisma schema
- `infra`: sample Nginx and SSL deployment artifacts

## Deployment docs

- Ubuntu/PM2/Nginx deployment walkthrough: [deploy.md](/var/www/selfhostai/deploy.md)
- Sample Nginx site config: [infra/nginx/selfhostai.xyz.conf](/var/www/selfhostai/infra/nginx/selfhostai.xyz.conf)
- Certbot commands: [infra/ssl/certbot-commands.md](/var/www/selfhostai/infra/ssl/certbot-commands.md)
- PM2 ecosystem file: [ecosystem.config.js](/var/www/selfhostai/ecosystem.config.js)

## Notes

- The dashboard uses mock project data right now.
- The Nginx and deployment guide tools are production-shaped generators, not live infrastructure automation.
- DNS is assumed to already point at the correct VPS.

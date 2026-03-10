# SelfHostAI

SelfHostAI is a polished Next.js 14 MVP for helping non-technical users self-host AI-generated apps on an Ubuntu VPS.

It includes:

- A premium landing page for `selfhostai.xyz`
- A paywalled dashboard with project intake, deployment summary, hosting guides, checklist, Nginx generator, SSL guide, and troubleshooting
- Mock data and beginner-friendly copy throughout
- Prisma setup for PostgreSQL
- Stripe Checkout billing with a $5.99 base access plan plus project-size help tiers
- Database-backed purchase, support intake, and webhook event storage via Prisma
- Deployment artifacts for PM2, Nginx, and Certbot

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- `shadcn/ui`-style components
- Lucide icons
- Stripe
- Prisma ORM
- PostgreSQL-ready configuration

## Local development

1. Install dependencies:

```bash
npm install
```

2. Copy the environment example:

```bash
cp .env.example .env
```

3. Set a real `DATABASE_URL` in `.env`.

You can use local Postgres, Neon, Supabase, or any managed PostgreSQL provider.

4. Generate the Prisma client and push the schema:

```bash
npm run prisma:generate
npm run db:push
```

5. Add the billing environment variables to `.env`:

```bash
APP_URL=http://localhost:3000
ACCESS_COOKIE_SECRET=replace-with-a-long-random-secret
STRIPE_SECRET_KEY=replace-with-your-stripe-secret-or-restricted-key
ADMIN_ACCESS_TOKEN=replace-with-an-admin-login-token
```

6. Seed the Stripe products and prices:

```bash
npm run stripe:seed
```

7. Create the Stripe webhook endpoint and save the returned signing secret into `.env` as `STRIPE_WEBHOOK_SECRET`:

```bash
npm run stripe:webhook
```

8. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Database

This MVP ships with a starter Prisma schema in [prisma/schema.prisma](/var/www/selfhostai/prisma/schema.prisma). It is configured for PostgreSQL so you can point it at Neon, Supabase, or any other Postgres instance with `DATABASE_URL`.

Billing-related data stored in Postgres:

- fulfilled Stripe purchases
- support intake submissions and admin status updates
- webhook processing history, failure reasons, and retry attempts

Useful commands:

```bash
npm run prisma:generate
npm run db:push
```

## Project structure

- `src/app`: App Router pages and API routes
- `src/components`: reusable UI, dashboard, and marketing components
- `src/lib`: generators, utilities, mock data, Prisma helper
- `src/lib/billing.ts`: commercial plan catalog and Stripe lookup keys
- `src/lib/access.ts`: signed cookie paywall logic
- `src/types`: shared project types
- `scripts/setup-stripe-products.mjs`: creates the Stripe products and prices
- `scripts/create-stripe-webhook.mjs`: creates the Stripe webhook endpoint for purchase fulfillment
- `prisma`: Prisma schema
- `infra`: sample Nginx and SSL deployment artifacts

## Deployment docs

- Ubuntu/PM2/Nginx deployment walkthrough: [deploy.md](/var/www/selfhostai/deploy.md)
- Sample Nginx site config: [infra/nginx/selfhostai.xyz.conf](/var/www/selfhostai/infra/nginx/selfhostai.xyz.conf)
- Certbot commands: [infra/ssl/certbot-commands.md](/var/www/selfhostai/infra/ssl/certbot-commands.md)
- PM2 ecosystem file: [ecosystem.config.js](/var/www/selfhostai/ecosystem.config.js)

## Notes

- The dashboard uses mock project data right now.
- Paid access is enforced with a signed cookie only after a fulfilled Stripe purchase exists in the database.
- Stripe webhook events are stored with status, attempt counts, and error details for admin retries.
- Support-tier customers can submit a project intake after checkout, and admins can move that intake through `new`, `in_progress`, and `completed`.
- The Nginx and deployment guide tools are production-shaped generators, not live infrastructure automation.
- DNS is assumed to already point at the correct VPS.

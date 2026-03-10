# Deploying SelfHostAI on Ubuntu

This guide assumes:

- You already have an Ubuntu VPS
- DNS for `selfhostai.xyz` points to that VPS
- You want to run the app with PM2 behind Nginx

## 1. Install system packages

```bash
sudo apt update
sudo apt install -y curl git nginx
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## 2. Clone the project

```bash
cd /var/www
sudo git clone https://github.com/your-org/selfhostai.git selfhostai
sudo chown -R $USER:$USER /var/www/selfhostai
cd /var/www/selfhostai
```

## 3. Install dependencies and build

```bash
npm install
npm run prisma:generate
npm run db:push
npm run stripe:seed
npm run stripe:webhook
npm run build
```

## 4. Configure environment variables

```bash
cp .env.example .env
nano .env
```

Set a real `DATABASE_URL` and the other production secrets you need.
Also set:

```bash
APP_URL=https://selfhostai.xyz
ACCESS_COOKIE_SECRET=<long-random-secret>
STRIPE_SECRET_KEY=<your-stripe-secret-or-restricted-key>
STRIPE_WEBHOOK_SECRET=<webhook-signing-secret-from-stripe:webhook>
ADMIN_ACCESS_TOKEN=<admin-login-token>
```

The billing system now depends on PostgreSQL for:

- purchase fulfillment records
- support intake submissions and status changes
- webhook event logs and retry state

## 5. Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 6. Configure Nginx

```bash
sudo cp infra/nginx/selfhostai.xyz.bootstrap.conf /etc/nginx/sites-available/selfhostai.xyz.conf
sudo ln -sf /etc/nginx/sites-available/selfhostai.xyz.conf /etc/nginx/sites-enabled/selfhostai.xyz.conf
sudo nginx -t
sudo systemctl reload nginx
```

This first config is HTTP-only on purpose. Certbot will add the HTTPS block after it verifies the domain.

## 7. Enable SSL with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d selfhostai.xyz -d www.selfhostai.xyz
sudo certbot renew --dry-run
```

After Certbot succeeds, you can compare the live Nginx file to [infra/nginx/selfhostai.xyz.conf](/var/www/selfhostai/infra/nginx/selfhostai.xyz.conf), which is the post-SSL reference version.

## 8. Useful checks

```bash
pm2 status
pm2 logs selfhostai
sudo systemctl status nginx
curl http://127.0.0.1:3000
```

## 9. Admin workflow

1. Visit `/admin/login` and sign in with `ADMIN_ACCESS_TOKEN`.
2. Review fulfilled purchases and Stripe receipt links.
3. Move support intake records from `new` to `in_progress` or `completed`.
4. Retry failed webhook events directly from the admin screen after you fix the underlying Stripe or env issue.

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
npm run build
```

## 4. Configure environment variables

```bash
cp .env.example .env
nano .env
```

Set a real `DATABASE_URL`, `NEXTAUTH_SECRET`, and any other secrets you add later.

## 5. Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 6. Configure Nginx

```bash
sudo cp infra/nginx/selfhostai.xyz.conf /etc/nginx/sites-available/selfhostai.xyz.conf
sudo ln -sf /etc/nginx/sites-available/selfhostai.xyz.conf /etc/nginx/sites-enabled/selfhostai.xyz.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Enable SSL with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d selfhostai.xyz -d www.selfhostai.xyz
sudo certbot renew --dry-run
```

## 8. Useful checks

```bash
pm2 status
pm2 logs selfhostai
sudo systemctl status nginx
curl http://127.0.0.1:3000
```

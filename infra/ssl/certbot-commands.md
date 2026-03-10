# Certbot commands for `selfhostai.xyz`

Install Certbot and the Nginx plugin:

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

Issue a certificate for the root domain only:

```bash
sudo certbot --nginx -d selfhostai.xyz
```

Issue a certificate for the root domain and `www`:

```bash
sudo certbot --nginx -d selfhostai.xyz -d www.selfhostai.xyz
```

Test renewal:

```bash
sudo certbot renew --dry-run
```

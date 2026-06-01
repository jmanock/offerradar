# OfferRadar DigitalOcean Deployment

These notes are for a human-reviewed launch on a DigitalOcean droplet. Do not
store secrets in the repository, and do not deploy until local validation and
content review are complete.

## 1. Prepare the server

SSH into the droplet with an authorized user, then clone the repository:

```bash
sudo mkdir -p /var/www
sudo chown "$USER":"$USER" /var/www
git clone <repo-url> /var/www/offerradar
cd /var/www/offerradar
```

## 2. Install and build

```bash
npm install
npm run lint
npm run build
```

## 3. Start with PM2

```bash
pm2 start npm --name offerradar -- start
pm2 save
```

## 4. Configure Nginx

Create an Nginx server block for `offerradar.io` and `www.offerradar.io`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name offerradar.io www.offerradar.io;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and test the site:

```bash
sudo ln -s /etc/nginx/sites-available/offerradar /etc/nginx/sites-enabled/offerradar
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Add SSL with Certbot

After DNS resolves to the droplet:

```bash
sudo certbot --nginx -d offerradar.io -d www.offerradar.io
sudo nginx -t
sudo systemctl reload nginx
```

## 6. Post-launch checks

Check the homepage, key category pages, `/robots.txt`, and `/sitemap.xml`.
Confirm PM2 restart behavior after reboot if PM2 startup has not already been
configured on the server.

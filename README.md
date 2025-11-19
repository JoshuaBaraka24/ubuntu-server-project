# Rentify Rentals - Item Rental Platform

## Project Overview
Rentify Rentals is a web-based item rental platform deployed on an Azure Ubuntu server. The project uses React for the frontend, Supabase for backend services, and Nginx as a reverse proxy. The app is secured with SSL and accessible via a custom domain.

## Features
- User authentication and item rental management (via Supabase)
- Secure HTTPS access with Let's Encrypt SSL
- Custom domain and subdomain setup
- Nginx reverse proxy for production deployment

## Deployment Steps
1. **Local Setup**
   - Clone the repository
   - Install dependencies: `npm install`
   - Configure environment variables in `.env`
   - Build the app: `npm run build`
2. **Cloud Server Setup**
   - Provision Azure Ubuntu VM
   - SSH into the server
   - Install Node.js, npm, Nginx, Certbot
   - Clone the repo and build the app
3. **DNS Configuration**
   - Register domain on Namecheap
   - Set A records for `rentifyrentals.me` and `www.rentifyrentals.me` to point to the VM's public IP
   - Add subdomain `admin.rentifyrentals.me` for admin dashboard
4. **Nginx Configuration**
   - Configure Nginx to proxy traffic to the app and handle SSL
   - Example config:
	 ```nginx
	 server {
		 listen 80;
		 server_name rentifyrentals.me www.rentifyrentals.me;
		 return 301 https://$host$request_uri;
	 }
	 server {
		 listen 443 ssl;
		 server_name rentifyrentals.me www.rentifyrentals.me;
		 ssl_certificate /etc/letsencrypt/live/rentifyrentals.me/fullchain.pem;
		 ssl_certificate_key /etc/letsencrypt/live/rentifyrentals.me/privkey.pem;
		 include /etc/letsencrypt/options-ssl-nginx.conf;
		 ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
		 location / {
			 proxy_pass http://127.0.0.1:3000;
			 proxy_set_header Host $host;
			 proxy_set_header X-Real-IP $remote_addr;
			 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			 proxy_set_header X-Forwarded-Proto $scheme;
		 }
	 }
	 # Admin subdomain
	 server {
		 listen 80;
		 server_name admin.rentifyrentals.me;
		 return 301 https://$host$request_uri;
	 }
	 server {
		 listen 443 ssl;
		 server_name admin.rentifyrentals.me;
		 ssl_certificate /etc/letsencrypt/live/admin.rentifyrentals.me/fullchain.pem;
		 ssl_certificate_key /etc/letsencrypt/live/admin.rentifyrentals.me/privkey.pem;
		 include /etc/letsencrypt/options-ssl-nginx.conf;
		 ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
		 location / {
			 proxy_pass http://127.0.0.1:4000; # Change 4000 to your admin app port
			 proxy_set_header Host $host;
			 proxy_set_header X-Real-IP $remote_addr;
			 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			 proxy_set_header X-Forwarded-Proto $scheme;
		 }
	 }
	 ```
5. **SSL Setup**
   - Use Certbot to issue SSL certificates for all domains and subdomains
   - Reload Nginx after certificate installation

## Access

## Group Members

## References

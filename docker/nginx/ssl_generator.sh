#!/bin/sh

CERT_PATH="/etc/nginx/certs/server.crt"
KEY_PATH="/etc/nginx/certs/server.key"

# Ensure the SSL directory exists
[ -d "/etc/nginx/certs" ] || mkdir -p "/etc/nginx/certs"

# Check if the certificate and key already exist, and generate them if not
if [ ! -e "$CERT_PATH" ] || [ ! -e "$KEY_PATH" ]; then
    echo "Creating a new self-signed SSL certificate..."
    openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
        -keyout "$KEY_PATH" -out "$CERT_PATH" \
        -subj "/CN=localhost"
else
    echo "Existing SSL certificate detected. Skipping generation."
fi

# Launch Nginx in the foreground
exec nginx -g "daemon off;"
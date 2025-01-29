FROM nginx:latest

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

COPY docker/nginx/frontend /usr/share/nginx/frontend

# Copy the SSL generation script
COPY docker/nginx/ssl_generator.sh /usr/local/bin/ssl_generator.sh

# Make the script executable
RUN chmod +x /usr/local/bin/ssl_generator.sh

EXPOSE 3042

CMD ["/usr/local/bin/ssl_generator.sh"]
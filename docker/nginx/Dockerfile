FROM nginx:latest

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf



COPY docker/nginx/frontend /usr/share/nginx/frontend

EXPOSE 3042

CMD ["nginx", "-g", "daemon off;"]
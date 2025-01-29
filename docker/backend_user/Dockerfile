
FROM python:3.11-slim

WORKDIR /app

COPY users/requirements.txt requirements.txt
COPY users /app

# Make setup.sh executable
RUN chmod +x setup.sh

# Establecer las variables de entorno necesarias
ENV DJANGO_SETTINGS_MODULE=users.settings

EXPOSE 8001

CMD ["./setup.sh"]
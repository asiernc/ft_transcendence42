
FROM python:3.11-slim

WORKDIR /app

COPY services/user_service/requirements.txt requirements.txt
COPY services/user_service /app

# Make setup.sh executable
RUN chmod +x scripts/setup.sh

# Establecer las variables de entorno necesarias
ENV DJANGO_SETTINGS_MODULE=user_service.settings

EXPOSE 8001

CMD ["./scripts/setup.sh"]
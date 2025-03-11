
FROM python:3.11-slim

WORKDIR /app

COPY tournament/requirements.txt requirements.txt
COPY tournament /app

RUN apt-get update && apt-get install -y netcat-openbsd

# Make setup.sh executable
RUN chmod +x /app/setup.sh

EXPOSE 8002

CMD ["./setup.sh"]
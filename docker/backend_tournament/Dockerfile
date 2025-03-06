
FROM python:3.11-slim

WORKDIR /tournament_app

COPY tournament/requirements.txt requirements.txt
COPY tournament /tournament_app

# Make setup.sh executable
RUN chmod +x setup.sh

EXPOSE 8002

CMD ["./setup.sh"]
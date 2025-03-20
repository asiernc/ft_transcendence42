#!/bin/bash

export DJANGO_SETTINGS_MODULE=users.settings
export PYTHONPATH=/app 

echo "Cron job triggered at $(date)" >> /app/cron_debug.log
python3 manage.py crontab run 26bc7046a320926e8f11068302820d67
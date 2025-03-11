#!/bin/bash

if [ "$DATABASE_NAME" = "transcendence" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
    	sleep 0.5
    done

    echo "PostgreSQL started"
fi

sleep 5
echo "Installing requirements..."
pip install --upgrade pip
pip install -r requirements.txt

sleep 5

echo "Starting Django server..."
python3 manage.py runserver 0.0.0.0:8002
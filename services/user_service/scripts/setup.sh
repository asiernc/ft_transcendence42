#!/bin/bash

if [ "$DATABASE" = "transcendence" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DATABASE_HOST $POSTGRES_PORT; do
    	sleep 0.1
    done

    echo "PostgreSQL started"
fi

echo "Installing requirements..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Running migrations..."
python3 manage.py makemigrations
python3 manage.py migrate

echo "Starting Django server..."
python3 manage.py runserver 0.0.0.0:8001
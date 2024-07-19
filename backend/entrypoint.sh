#!/bin/sh

echo "Waiting for PostgreSQL database connection..."

while ! nc -z $DB_HOST $DB_PORT; do
  sleep 0.1
done

echo "PostgreSQL started"

npx prisma migrate dev --name init --skip-seed

exec "$@"

#!/bin/sh

echo "Waiting for PostgreSQL database connection..."

while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done

echo "PostgreSQL started"

export DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"
echo "DATABASE_URL set to $DATABASE_URL"

npx prisma migrate deploy

exec "$@"

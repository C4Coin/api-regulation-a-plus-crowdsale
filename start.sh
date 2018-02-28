#!/bin/sh
# start.sh
# NOTE: This only makes sense to run within the Dockerfile

set -e

host="$1"
shift
cmd="$@"

>&2 echo "Starting."

until PGPASSWORD=docker psql -h "$host" -U "docker" -c '\q'; do
  >&2 echo "Waiting for Postgres to start"
  sleep 1
done

>&2 echo "Postgres is running."
exec $cmd

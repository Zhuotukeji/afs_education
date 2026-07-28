#!/usr/bin/env sh
set -eu

: "${IMAGE_TAG:?IMAGE_TAG is required}"
cd "$(dirname "$0")/.."

previous="$(cat .last-successful-image 2>/dev/null || true)"
printf '%s' "$previous" > .rollback-image

docker compose --env-file .env.production run --rm --entrypoint sh backup -c 'pg_dump --format=custom --file=/tmp/predeploy.dump && restic backup /tmp/predeploy.dump --tag predeploy'
IMAGE_TAG="$IMAGE_TAG" docker compose --env-file .env.production pull app
IMAGE_TAG="$IMAGE_TAG" docker compose --env-file .env.production up -d --remove-orphans

tries=0
until docker compose --env-file .env.production exec -T app wget -q -O /dev/null http://127.0.0.1:3000/api/health/ready; do
  tries=$((tries + 1))
  if [ "$tries" -ge 12 ]; then
    echo "Readiness failed; rolling back."
    if [ -n "$previous" ]; then IMAGE_TAG="$previous" docker compose --env-file .env.production up -d app; fi
    exit 1
  fi
  sleep 5
done

printf '%s' "$IMAGE_TAG" > .last-successful-image
docker image prune -f

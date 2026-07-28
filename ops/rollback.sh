#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")/.."
tag="$(cat .rollback-image 2>/dev/null || true)"
if [ -z "$tag" ]; then echo "No rollback image is recorded."; exit 1; fi
IMAGE_TAG="$tag" docker compose --env-file .env.production up -d app
printf '%s' "$tag" > .last-successful-image

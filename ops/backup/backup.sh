#!/usr/bin/env bash
set -euo pipefail

: "${RESTIC_REPOSITORY:?RESTIC_REPOSITORY is required}"
: "${RESTIC_PASSWORD:?RESTIC_PASSWORD is required}"
: "${PGHOST:?PGHOST is required}"

interval="${BACKUP_INTERVAL_SECONDS:-86400}"
mkdir -p /tmp/career-path-backup

if ! restic snapshots >/dev/null 2>&1; then
  restic init
fi

while true; do
  stamp="$(date -u +%Y%m%dT%H%M%SZ)"
  dump="/tmp/career-path-backup/postgres-${stamp}.dump"
  pg_dump --format=custom --file="$dump"
  restic backup "$dump" "${MEDIA_PATH:-/data/media}" --tag career-path-brief
  restic forget --keep-daily 7 --keep-weekly 5 --keep-monthly 12 --prune
  rm -f "$dump"
  sleep "$interval"
done

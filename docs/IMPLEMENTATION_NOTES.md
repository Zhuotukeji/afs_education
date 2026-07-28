# Implementation Notes

## Approved deviations from PRD v1.1

- The eight interview pages are implemented as `Work Reality Dossiers` based on public primary sources. They contain no invented people, composite quotations, or implied interviews.
- Only a production server will be deployed. Local preview, GitHub Actions, immutable images, health checks, and rollback replace a persistent online staging environment.
- The public byline is `Career Path Brief Editorial Team`. A legal operator name and contact email are still required before deployment.

## Production gates

The container refuses to start until the final HTTPS URL, host, operator, contact email, database credentials, Payload secret, and `CONTENT_APPROVED=true` are supplied. AFS and Related Search are disabled independently and remain off by default.

The initial Payload schema can be created once with `PAYLOAD_DB_PUSH=true` on a new database. Set it back to `false` immediately after the initial schema is established; subsequent schema changes must use committed Payload migrations.

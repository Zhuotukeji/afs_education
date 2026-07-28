# Career Path Brief

Career Path Brief is a source-backed U.S. career education publication built for AdSense for Search site review without depending on ads for its user value.

## What is included

- Next.js 16.2, React 19.2, Payload CMS 3.86, PostgreSQL 17, TypeScript 5.9, and Tailwind CSS 4.
- Exactly 125 substantive content routes across ten editorial types.
- Dynamic title, description, canonical, Open Graph, Twitter, robots directives, OG images, JSON-LD, sitemap, RSS, and manifest metadata.
- Four interactive tools, site search, PostgreSQL full-text search support, and immutable catalog fallback.
- Payload editorial workflow with source files, private editor memos, original evidence, a publication quality gate, revisions, and advertising allowlists.
- AFS and Related Search implementations that are disabled by default.
- Docker, Caddy, PostgreSQL, Restic backups, GitHub Actions, health checks, manual production approval, and rollback.

## Local development

Requirements: Node 22+, pnpm 10+, and PostgreSQL 17 for CMS/API work. Public pages, tests, content audit, and production builds do not require a running database.

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Start local PostgreSQL with `docker compose -f docker-compose.dev.yml up -d` when Docker is available, then run:

```bash
pnpm payload migrate:create
pnpm seed
pnpm tsx scripts/setup-search.ts
```

The seed is idempotent and imports all 125 records as `Approved`, never `Published`.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm content:audit
pnpm build
pnpm test:e2e
```

Database integration tests require PostgreSQL and run separately with `pnpm test:int`.

## Content inventory

| Type | Count |
|---|---:|
| Hubs | 9 |
| Career guides | 36 |
| Credential guides | 18 |
| Comparisons | 16 |
| Training guides | 12 |
| State requirements | 10 |
| Skills and advancement | 8 |
| Work Reality dossiers | 8 |
| Research | 4 |
| Tools | 4 |
| Total | 125 |

`pnpm content:audit` fails on count drift, duplicate routes/titles, missing sources, short pages, low quality scores, invalid source URLs, or flagged filler phrases.

## Production deployment

1. Copy `.env.production.example` to `/srv/career-path-brief/.env.production` and complete every production gate.
2. Point the final domain to the server. Do not deploy on a temporary indexed domain.
3. Install Docker Engine with Compose on Ubuntu 22.04 or 24.04.
4. Clone this repository to `/srv/career-path-brief`.
5. On a new empty database only, set `PAYLOAD_DB_PUSH=true`, start the stack once, then return it to `false`.
6. Run the seed and search setup only after the Editorial Team has approved the content and set `CONTENT_APPROVED=true`.
7. Configure the GitHub `production` environment and required deployment secrets, then run the manual deployment workflow.

The production container rejects localhost canonical URLs, placeholder contact email, short secrets, missing operator identity, and unapproved content. AFS, RSOC, analytics, and consent scripts remain off unless separately configured.

## Documents

- [Product requirements](docs/AFS职业教育内容站_PRD_v1.1.md)
- [Implementation decisions](docs/IMPLEMENTATION_NOTES.md)
- [Image license register](public/assets/LICENSES.md)

No license is granted for the code or editorial content unless the repository owner adds one explicitly.

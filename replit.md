# Northstar Consulting

Northstar is a premium, conversion-focused website for an IT services and AI solutions consultancy.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/northstar-consulting/src/App.tsx` — the complete responsive marketing site and interactions
- `artifacts/northstar-consulting/src/index.css` — visual tokens, typography, responsive styles, and motion
- `attached_assets/Pasted-Create-a-premium-world-class-SEO-optimized-website-for-_1786086903550.txt` — original website brief

## Architecture decisions

- The first release is a presentation-first single-page site with no backend dependency.
- Interactions are intentionally client-side for fast, reliable conversion flows: anchor navigation, forms, theme, FAQ, cookie consent, and mobile menu.
- SEO metadata and structured data live with the page so the marketing surface is self-contained and easy to publish.

## Product

The site positions Northstar as a trusted digital transformation partner through outcome-led messaging, service and industry exploration, case studies, process transparency, testimonials, FAQs, and consultation CTAs.

## User preferences

- Premium, minimal, enterprise-level presentation with restrained blue accents, clear business language, generous whitespace, and strong conversion focus.

## Gotchas

- The site is designed to run as the root web artifact and expects its managed workflow to provide `PORT` and `BASE_PATH`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

# Flooring Express — Web

The Next.js 16 (App Router) frontend for Flooring Express, powered by [Sanity](https://www.sanity.io/).

This is a monorepo with two apps side by side:

```
flooring-express/
├── studio/   # Sanity Studio (content editing)
└── web/      # this Next.js app
```

## Prerequisites

- **Node 24** — both apps require it (an `.nvmrc` pins the version). With [nvm](https://github.com/nvm-sh/nvm):
  ```bash
  nvm use   # reads .nvmrc → Node 24
  ```
- **pnpm** — both apps use pnpm.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the token:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project id (`z9ek4dm5`). |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (`production`). |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version date. |
| `SANITY_API_READ_TOKEN` | **Read token** for the Live Content API and Draft Mode. |

### Getting the read token

Published content renders without a token. You only need `SANITY_API_READ_TOKEN`
for Draft Mode and live-previewing drafts in the Presentation tool.

1. Open project settings: `cd ../studio && pnpm sanity manage`
   (or go to https://sanity.io/manage/project/z9ek4dm5).
2. **API → Tokens → Add API token.**
3. Name it (e.g. `web-read`) and give it **Viewer** permissions
   (read-only — the token is shared with the browser during preview).
4. Copy the token immediately (shown once) and paste it into `.env.local`.
5. Restart the dev server.

## Running the project

The Studio and the web app run as **two separate dev servers**, each in its own terminal.

**Terminal 1 — Studio** (content, http://localhost:3333):

```bash
cd studio
nvm use
pnpm dev
```

**Terminal 2 — Web app** (site, http://localhost:3000):

```bash
cd web
nvm use
pnpm dev
```

Open http://localhost:3000 for the site and http://localhost:3333 for the Studio.

## Sanity integration

- `src/sanity/lib/client.ts` — configured Sanity client.
- `src/sanity/lib/live.ts` — Live Content API (`sanityFetch` + `<SanityLive />`).
- `src/sanity/lib/queries.ts` — typed GROQ queries (`defineQuery`).
- `src/sanity/lib/image.ts` — image URL builder.
- `src/app/api/draft-mode/` — Draft Mode routes for the Presentation tool.

### Types (TypeGen)

Query result types are generated into `sanity.types.ts` from the Studio schema and
the GROQ queries in this app. Regenerate after changing the schema or a query:

```bash
pnpm typegen   # delegates to ../studio
```

TypeGen also runs automatically during `sanity dev` / `sanity build` in the Studio.

## Common scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server. |
| `pnpm build` | Production build. |
| `pnpm start` | Serve the production build. |
| `pnpm lint` | Run ESLint. |
| `pnpm typegen` | Regenerate `sanity.types.ts`. |

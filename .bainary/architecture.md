# Architecture

> Maintained by the team. Update when significant architecture decisions are made.

## System Overview

Syntax Atlas is a static/content-driven Next.js App Router application. Pages render from local JSON datasets loaded through `src/lib/content.ts`; reusable components display topic cards, language cards, highlighted code blocks, and comparison grids.

```text
Local JSON content
  -> src/lib/content.ts helpers
  -> App Router pages
  -> reusable components
  -> rendered Thai-first syntax reference UI
```

## Key Architecture Decisions

### Decision 1: Local JSON content for MVP
- **Date:** 2026-06-09
- **Decision:** Store languages, topics, and syntax examples as local JSON files.
- **Reason:** Keeps the MVP simple, reviewable, and deployable without database/API infrastructure.
- **Alternatives considered:** Database-backed CMS, MDX files, external API.

### Decision 2: Server-render highlighted code
- **Date:** 2026-06-09
- **Decision:** Use Shiki in the async `CodeBlock` server component and render highlighted HTML.
- **Reason:** Avoids shipping highlighter work to the browser and keeps code examples consistent.
- **Alternatives considered:** Client-side highlighting, plain `<pre><code>`, markdown rendering pipeline.

### Decision 3: Client search only where needed
- **Date:** 2026-06-09
- **Decision:** Keep fuzzy search inside the `"use client"` `SearchBox` component using Fuse.js.
- **Reason:** Search needs local input state and immediate filtering; the rest of the app can remain server-rendered.
- **Alternatives considered:** Server search route, query-param search page, no fuzzy search.

## Data Flow

```text
User opens page
  -> App Router page imports helpers from `src/lib/content.ts`
  -> helpers read typed JSON data from `src/content/**`
  -> page passes data into UI components
  -> components render cards, comparison tables, and code blocks
```

For search:

```text
User types in `SearchBox`
  -> Fuse.js searches in-memory topic data
  -> component renders top matching topic links
```

For copy:

```text
User clicks `CopyButton`
  -> browser clipboard API writes code text
  -> local copied state resets after a short timeout
```

## Component Boundaries

- `src/app/**`: route-level composition, page metadata/shell, query-param handling.
- `src/components/**`: reusable presentation and small interaction components.
- `src/lib/content.ts`: content loading, filtering, grouping, and ID/slug lookup functions.
- `src/lib/types.ts`: shared shape definitions for local content.
- `src/content/**`: source of truth for supported languages, topics, and examples.

## Infrastructure

No infrastructure-specific configuration is present beyond standard Next.js scripts:

```text
npm run dev
npm run build
npm run start
npm run lint
```

## Constraints & Non-Goals

- No backend API, database, authentication, or user-generated content currently exists.
- Do not introduce a CMS or persistence layer without explicit approval.
- Do not move local JSON content into code unless there is a clear implementation need.
- Keep the MVP focused on concise syntax reference and comparison.

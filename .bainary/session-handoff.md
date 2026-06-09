# Session Handoff

> Rolling notes for the next AI chat. Update at the end of each working session.
> Last updated: 2026-06-09

## Current Focus

Added a new **Web** tab — "แต่ละภาษาใช้ library/framework อะไรทำเว็บได้บ้าง
แล้วแยกตาม lib ว่าเขียนยังไง". Built as a **separate content lib** from the
existing topics/examples atlas (per the request: "lib ที่แยกกับตัวเก่า").
Latest session added clearer "library ที่ใช้" and "ตัวอย่างการใช้" UI using
the existing web dataset notes/explanations. Newest session expanded each web
library detail page with a more detailed project-structure guide.

## What Changed

A self-contained web-frameworks dataset + lib + routes, kept independent of the
existing `content.ts` / topics / examples pipeline.

- **New content lib:** `src/lib/web.ts` defines its own `WebLibrary` type, loads
  the new `src/content/web/*.json` files, and exposes `getWebLibraryBySlug`,
  `getWebLibrariesByLanguage`, `groupWebLibrariesByLanguage`, `getWebLibraryCount`.
  It reuses the canonical `languages` list from `content.ts` only for display
  (name/color/order) — the web dataset itself is fully separate.
- **Web content:** `src/content/web/{python,javascript,typescript,go,rust,java}.json`
  — 27 web libraries total, each with a minimal "how to write" code snippet
  (`code`), a typical **project folder layout** (`structure`, rendered as a
  monospace tree under "โครงสร้างโปรเจกต์"), Thai explanation/notes, category,
  version, and docs URL.
  - Python: Django, Flask, FastAPI, Litestar, Pyramid
  - JavaScript: Express, Fastify, Koa, AdonisJS
  - TypeScript: Next.js, NestJS, Hono, Elysia
  - Go: net/http, Gin, Echo, Chi, Fiber
  - Rust: Actix Web, Axum, Rocket, Warp
  - Java: Spring Boot, Javalin, Quarkus, Micronaut
- **New routes:** `src/app/web/page.tsx` (index grouped by language) and
  `src/app/web/[slug]/page.tsx` (per-library detail with `CodeBlock`).
- **Nav:** added `เว็บ` link to `src/components/SiteHeader.tsx`.

No existing component/helper/type/route/content was modified except SiteHeader
(one nav link). The old atlas pipeline is untouched.

## Decisions Made

- **Separate lib, not merged into `content.ts`.** Web frameworks don't fit the
  topic×language comparison grid (a feature, not a syntax topic), so they get
  their own `web.ts` + `content/web/`. This honors the "lib แยกกับตัวเก่า"
  request and keeps the comparison model clean.
- **One representative snippet per library.** Each `WebLibrary` carries a single
  minimal "hello server"/basic-route example (the "เขียนยังไง"), not a full
  task×lib matrix. Keeps scope tight and matches the illustrative-fragment style
  of the existing examples.
- **Reuse the language registry for display only.** `web.ts` imports `languages`
  / `getLanguageById` from `content.ts` for name/color/order rather than
  duplicating language metadata in the web JSON. Data stays DRY; web content
  stays separate.
- **Library slugs are globally unique** (`django`, `gin`, `axum`, ...) so
  `/web/[slug]` needs no language segment.

## Files Touched

- `src/lib/web.ts` — new separate content lib (type + loaders + helpers).
- `src/content/web/*.json` — 6 web content files, 27 web libraries.
- `src/app/web/page.tsx` — new index page (grouped by language).
- `src/app/web/[slug]/page.tsx` — new library detail page.
- `src/components/SiteHeader.tsx` — added `เว็บ` nav link.

Latest session touched only:
- `src/lib/web.ts` — added `getWebLibrarySetupNote()` to pick the install/start
  note for each web library.
- `src/app/web/page.tsx` — cards now show the install/start note and a clearer
  "ดูตัวอย่างการใช้" affordance.
- `src/app/web/[slug]/page.tsx` — added a "Library ที่ใช้" section with name,
  setup/install note, and a short usage explanation before the code example.

Newest session touched only:
- `src/lib/web.ts` — added `WebLibraryWritingGuide` plus
  `getWebLibraryWritingGuide()` with per-library key files and step-by-step
  writing workflow for all 27 web libraries.
- `src/app/web/[slug]/page.tsx` — changed "โครงสร้างโปรเจกต์" into
  "โครงสร้างโปรเจกต์แบบละเอียด", showing the folder tree beside "ไฟล์สำคัญ",
  and added "ลำดับการเขียนจริง" cards so users can understand what to write
  first, where, and why.

## Verification

- `npm run build` passes: TypeScript clean; `/web` static + all 27
  `/web/[slug]` pages statically generated (django, flask, fastapi, express,
  fastify, koa, adonisjs, nextjs, nestjs, hono, elysia, net-http, gin, echo,
  chi, fiber, actix-web, axum, rocket, warp, spring-boot, javalin, quarkus,
  micronaut). Latest verification also passed after the detailed structure and
  writing workflow UI.

## Risks / Things to Know

- Code snippets are **illustrative minimal examples** (imports/setup partly in
  `notes`), not full runnable projects — same convention as the syntax examples.
  No linter checks the snippet code; reviewed by hand.
- `CodeBlock` highlights via the existing `languageMap` (python/javascript/
  typescript/go/rust/java). Web snippets reuse those same languageIds, so
  highlighting works without touching `CodeBlock`. TSX/JSX was avoided in the
  TypeScript snippets (Next.js uses a `route.ts`, not a `page.tsx`) so the
  `typescript` grammar renders cleanly.
- Same JSON-escaping caution as before: newlines in `code` must be `\n`.

## Next Steps / Ideas

- Add more libraries per language if needed (e.g. Python Tornado/Sanic, JS
  hapi, TypeScript tRPC/Remix, Java Vaadin/Play Framework).
- Consider multiple snippets per library (routing, JSON, params) — would need a
  task list in `web.ts` similar to topics, but keep it separate from the syntax
  topics.
- Optional: surface the Web section on the home page, and/or link each language
  detail page to its web libraries.

# Aider Conventions — bainary-skill

This project follows **bainary-skill** web development principles.

## Before Starting

Read project context in `.bainary/`:
- `project-knowledge.md` — project overview
- `session-handoff.md` — latest AI chat summary and next steps
- `architecture.md` — architecture decisions
- `patterns.md` — code patterns in use
- `conventions.md` — naming and structure rules

If `patterns.md` or `conventions.md` is still generic, inspect the existing source code first and update them with the project's real style/code patterns before coding.

## Core Principles

1. **Think Before Coding** — Analyze and plan before writing
2. **Simplicity First** — Prefer simple, maintainable code
3. **Surgical Changes** — Change only what the task requires
4. **Goal-Driven Execution** — Every change has a verifiable purpose

## Naming Conventions

Follow whatever is defined in `.bainary/conventions.md` for this project.
Default fallbacks if not specified:
- Components: PascalCase (`UserCard`, `NavBar`)
- Utilities/hooks: camelCase (`useAuth`, `formatDate`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Files: match the export name

## Commit Style

```
feat: add user authentication
fix: resolve mobile nav overlap
refactor: simplify data fetching in Dashboard
docs: update .bainary/patterns.md
```

## End of Chat

Before finishing, update `.bainary/session-handoff.md` with the current focus, summary, decisions, files touched, risks, and next steps. Move stable new knowledge into `.bainary/patterns.md`, `.bainary/conventions.md`, or `.bainary/architecture.md` so the next chat can continue.

## What Aider Should Not Do

- Do not rewrite working code outside the task scope
- Do not introduce new dependencies without mentioning it
- Do not change folder structure without updating `.bainary/architecture.md`

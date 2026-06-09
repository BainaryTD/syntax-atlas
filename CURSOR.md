# Cursor IDE Instructions

This project uses **bainary-skill** — a web development base skill with project learning.

## Setup

After opening this project in Cursor:
1. The `.cursorrules` file is automatically loaded
2. Manually open `.bainary/project-knowledge.md` and `.bainary/session-handoff.md` for context
3. If `.bainary/patterns.md` or `.bainary/conventions.md` is still generic, ask Cursor to inspect the codebase and fill in the real project style before coding

## Key Files

| File | Purpose |
|------|---------|
| `.bainary/project-knowledge.md` | Project overview and current state |
| `.bainary/session-handoff.md` | Last AI chat summary, decisions, and next steps |
| `.bainary/architecture.md` | System design decisions |
| `.bainary/patterns.md` | Code patterns in use |
| `.bainary/conventions.md` | Naming and structural conventions |

## Workflow

```
1. Open .bainary/project-knowledge.md and .bainary/session-handoff.md
2. Understand current architecture
3. If style knowledge is missing, inspect source code and update .bainary/patterns.md + .bainary/conventions.md
4. Plan changes respecting existing patterns
5. Implement with minimum necessary footprint
6. Before ending the chat, update .bainary/session-handoff.md and any changed .bainary/ knowledge files
```

## Principles

1. **Think Before Coding** — Plan first
2. **Simplicity First** — Simple > Clever
3. **Surgical Changes** — Minimum footprint
4. **Goal-Driven Execution** — Clear verifiable goal

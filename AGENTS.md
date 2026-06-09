# Codex / OpenAI Codex CLI Instructions

This project uses **bainary-skill** principles.

## Prime Directives

1. **Think Before Coding** — Plan before writing any code.
2. **Simplicity First** — Simple > Clever.
3. **Surgical Changes** — Only change what's needed.
4. **Goal-Driven Execution** — Know the verifiable goal before starting.

## Project Context

Always load project context before generating code:

```
.bainary/project-knowledge.md   ← start here
.bainary/session-handoff.md     ← latest chat summary and next steps
.bainary/architecture.md        ← system design
.bainary/patterns.md            ← recurring patterns
.bainary/conventions.md         ← naming & structure rules
```

## Session Continuity

- At the start of a new chat, read all `.bainary/` files before coding.
- If `.bainary/patterns.md` or `.bainary/conventions.md` is still generic, inspect the existing source code first and update them with the project's real style/code patterns.
- At the end of every task/chat, update `.bainary/session-handoff.md` with current focus, decisions, files touched, risks, and next steps.
- Move stable new learnings into `.bainary/patterns.md`, `.bainary/conventions.md`, or `.bainary/architecture.md` so the next chat continues with context.

## Code Generation Rules

- Match existing naming conventions exactly
- Use only libraries/packages already in `package.json` or equivalent
- Do not refactor working code outside the scope of the task
- Keep functions small and focused (single responsibility)
- Write comments only when logic is non-obvious

## Output Format

When creating files, follow this checklist:
- [ ] Follows project conventions
- [ ] Uses existing patterns from `.bainary/patterns.md`
- [ ] Does not introduce new dependencies without approval
- [ ] Includes basic error handling

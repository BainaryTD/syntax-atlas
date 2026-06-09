# Conventions

> Naming, folder structure, and styling rules for this project.

## Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase named exports | `LanguageCard`, `SearchBox` |
| Hooks | camelCase with `use` prefix | `useSearchState` |
| Utilities | camelCase | `getTopicBySlug`, `groupTopicsByCategory` |
| Constants | camelCase or UPPER_SNAKE_CASE depending on scope | `languageMap`, `API_BASE_URL` |
| Types/Interfaces | PascalCase type aliases | `Language`, `SyntaxExample` |
| Route folders | Next.js App Router paths | `topics/[slug]/page.tsx` |
| Content IDs | kebab-case strings | `for-loop`, `if-else` |
| CSS classes | Tailwind utilities | `rounded-2xl border border-slate-800` |

## Folder Structure

```text
src/
├── app/             # Route-level pages, root layout, global CSS
├── components/      # Reusable React components
├── content/         # Local JSON content source
│   └── examples/    # Per-language syntax examples
├── lib/             # Content helpers and shared types
└── ...
```

## Import Order

```typescript
// 1. Node built-ins
// 2. External packages
// 3. Internal absolute imports (@/components, @/lib, @/content)
// 4. Relative imports
// 5. Type imports
```

Existing files usually place type imports near the related imports. Keep imports readable and avoid unnecessary reordering churn.

## Component File Structure

```typescript
// 1. "use client" directive, only when required
// 2. Imports
// 3. Local constants
// 4. Props type or inline typed props
// 5. Component function
// 6. Small component-local helpers, when needed
```

Prefer named exports for reusable components.

## CSS / Styling

- Use Tailwind CSS 4 utilities in JSX.
- Keep global styling in `src/app/globals.css`.
- Use `@theme inline` variables for shared font/color theme integration.
- Preserve the current dark UI foundation: `slate` backgrounds, `sky` accents, readable Thai text.
- Avoid introducing CSS Modules or styled-components unless the project direction changes.

## TypeScript

- Keep `strict` compatibility.
- Use shared types from `src/lib/types.ts` for content objects.
- Keep content helper return behavior simple and explicit.
- Use the `@/*` path alias for imports from `src`.

## Content

- Language IDs in examples must match `src/content/languages.json`.
- Topic IDs in examples must match `src/content/topics.json`.
- Slugs are used for routes; IDs are used for data joins.
- Add examples to the per-language JSON file under `src/content/examples/`.
- Example object IDs follow `{languageId}-{topicId}-basic` (e.g. `python-for-loop-basic`).
- Keep at most one example per `(languageId, topicId)` pair — `getExample` returns a single match and the comparison/language views assume one example per language per topic.
- When adding a new topic, add a matching example to **every** supported language file so comparison rows stay complete. For a feature a language lacks (e.g. Go has no ternary, JS has no static generics), show the idiomatic approximation and explain the gap in `notes` rather than omitting the row.
- In `topics.json`, keep topics grouped by `category` in array order; on pages the category section order follows the first appearance of each category, and within-category order follows array order.
- `code` strings are JSON, so escape newlines as `\n` and quotes as `\"`; keep `notes`/`explanation` in the Thai-first voice. After editing content, run `npm run build` to confirm all static topic/language pages still generate.

## Commit Messages

```text
feat: add user profile page
fix: resolve login redirect loop
refactor: extract auth logic to useAuth hook
style: format components with prettier
docs: update .bainary/patterns.md
chore: update dependencies
```

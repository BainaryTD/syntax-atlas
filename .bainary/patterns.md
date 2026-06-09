# Patterns

> Recurring code patterns used in this project. Follow these instead of inventing new ones.

## Data Fetching

Content is imported from local JSON modules through `src/lib/content.ts`. Pages and components should use the exported helper functions instead of importing JSON directly unless adding a new content helper would be unnecessary overhead.

```typescript
import { topics, getTopicBySlug } from "@/lib/content";

const topic = getTopicBySlug(slug);
```

## State Management

Use React local state for small client-only interactions. There is no global state library in the project.

```typescript
"use client";

import { useState } from "react";

const [copied, setCopied] = useState(false);
```

## Component Structure

Components are small named exports with typed props inline when the prop shape is minimal. Use server components by default.

```typescript
import type { Topic } from "@/lib/types";

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    // JSX
  );
}
```

Add `"use client"` only when the component uses hooks, events that depend on client state, or browser APIs.

## Error Handling

Current lookup helpers return `undefined` for missing content. Components/pages generally guard missing language/example data by returning `null` or falling back to a default.

```typescript
const language = getLanguageById(languageId);
const example = getExample(languageId, topicId);
if (!language || !example) return null;
```

## Form Handling

There is no form library. Use controlled inputs for lightweight interactions such as search.

```typescript
<input
  value={query}
  onChange={(event) => setQuery(event.target.value)}
/>
```

## API Calls

There are no API calls in the current app. Content access is local and synchronous through helper functions.

```typescript
export function getExamplesByTopic(topicId: string) {
  return examples.filter((example) => example.topicId === topicId);
}
```

## Code Highlighting

Use the existing async `CodeBlock` component for syntax examples. It maps project language IDs to Shiki language IDs and renders Shiki HTML.

```typescript
<CodeBlock code={example.code} languageId={languageId} />
```

## Routing

Use Next.js App Router conventions under `src/app`. Links should use `next/link` and route paths should follow the existing `/topics`, `/languages`, and `/compare` structure.

```typescript
<Link href={`/topics/${topic.slug}`}>{topic.titleTh}</Link>
```

## Styling

Use Tailwind utility classes directly in JSX. The current visual language is dark slate surfaces, sky accent color, rounded cards/buttons, and Thai-first copy.

```typescript
className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
```

## Content Modeling

Languages, topics, and examples are normalized JSON joined by string IDs. An example references exactly one `languageId` and one `topicId`; lookups assume a single example per pair.

```typescript
// one example per (language, topic); getExample returns a single match
export function getExample(languageId: string, topicId: string) {
  return examples.find(
    (example) => example.languageId === languageId && example.topicId === topicId,
  );
}
```

Category ordering on the language and topic pages is derived from `topics.json`: `groupTopicsByCategory` groups by first occurrence, so the order topics appear in the file controls both the within-category order and the category section order. Add a topic by inserting it next to its category peers and giving every language file a matching example.

---

_Add new patterns here as they emerge in the codebase._

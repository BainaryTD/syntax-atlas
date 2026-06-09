"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Topic } from "@/lib/types";

export function SearchBox({ topics }: { topics: Topic[] }) {
  const [query, setQuery] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(topics, {
        keys: ["title", "titleTh", "description", "tags"],
        threshold: 0.35,
      }),
    [topics],
  );
  const results = query.trim() ? fuse.search(query).map((item) => item.item).slice(0, 6) : topics.slice(0, 6);

  return (
    <div className="w-full max-w-2xl">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="ค้นหา for loop, function, array..."
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none ring-sky-500 transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2"
      />
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {results.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-left text-sm text-slate-200 hover:border-sky-500"
          >
            <span className="font-medium text-white">{topic.titleTh}</span>
            <span className="ml-2 text-slate-500">{topic.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

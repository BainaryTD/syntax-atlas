import Link from "next/link";
import { getSupportedLanguageCount } from "@/lib/content";
import type { Topic } from "@/lib/types";

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="group block rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-0.5 hover:border-sky-500/70 hover:bg-slate-900"
    >
      <div className="text-sm text-sky-300">{topic.category}</div>
      <h3 className="mt-2 text-xl font-semibold text-white group-hover:text-sky-200">
        {topic.titleTh}
      </h3>
      <p className="mt-1 text-sm text-slate-400">{topic.title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{topic.description}</p>
      <p className="mt-4 text-xs text-slate-500">
        รองรับ {getSupportedLanguageCount(topic.id)} ภาษา
      </p>
    </Link>
  );
}

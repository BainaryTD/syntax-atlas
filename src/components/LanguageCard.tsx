import Link from "next/link";
import { getExamplesByLanguage } from "@/lib/content";
import type { Language } from "@/lib/types";

export function LanguageCard({ language }: { language: Language }) {
  return (
    <Link
      href={`/languages/${language.slug}`}
      className="block rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-0.5 hover:border-sky-500/70"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-white">{language.name}</h3>
        <span className="rounded-full bg-slate-800 px-3 py-1 font-mono text-xs text-slate-300">
          {language.fileExtension}
        </span>
      </div>
      <p className="mt-2 text-sm text-sky-300">{language.version}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{language.description}</p>
      <p className="mt-4 text-xs text-slate-500">
        {getExamplesByLanguage(language.id).length} syntax examples
      </p>
    </Link>
  );
}

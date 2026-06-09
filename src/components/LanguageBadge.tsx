import type { Language } from "@/lib/types";

export function LanguageBadge({ language }: { language: Language }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-100"
      style={{ boxShadow: `inset 3px 0 0 ${language.color}` }}
    >
      {language.name}
    </span>
  );
}

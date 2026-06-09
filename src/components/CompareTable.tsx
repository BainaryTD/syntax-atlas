import { getExample, getLanguageById } from "@/lib/content";
import { CodeBlock } from "./CodeBlock";

export async function CompareTable({ topicId, languageIds }: { topicId: string; languageIds: string[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {languageIds.map((languageId) => {
        const language = getLanguageById(languageId);
        const example = getExample(languageId, topicId);
        if (!language || !example) return null;
        return (
          <article key={languageId} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{language.name}</h3>
              <span className="text-xs text-slate-500">{example.version}</span>
            </div>
            <CodeBlock code={example.code} languageId={languageId} />
            <p className="mt-3 text-sm leading-6 text-slate-300">{example.explanation}</p>
          </article>
        );
      })}
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/CodeBlock";
import { getExample, getExamplesByLanguage, getLanguageBySlug, groupTopicsByCategory, languages } from "@/lib/content";

export function generateStaticParams() {
  return languages.map((language) => ({ slug: language.slug }));
}

export default async function LanguageSyntaxPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const language = getLanguageBySlug(slug);
  if (!language) notFound();

  const exampleCount = getExamplesByLanguage(language.id).length;
  const groupedTopics = groupTopicsByCategory();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <Link href={`/languages/${language.slug}`} className="text-sm text-slate-400 hover:text-slate-200">← กลับไปหน้าภาพรวม {language.name}</Link>

      <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-sky-300">{language.version}</p>
            <h1 className="mt-2 text-5xl font-bold text-white">{language.name}</h1>
            <p className="mt-4 max-w-2xl text-slate-300">{language.description}</p>
            <p className="mt-4 text-xs text-slate-500">{exampleCount} syntax examples</p>
          </div>
          <span className="rounded-2xl bg-slate-800 px-4 py-2 font-mono text-slate-200">{language.fileExtension}</span>
        </div>
      </div>

      <div className="mt-10 space-y-12">
        {Object.entries(groupedTopics).map(([category, items]) => {
          const topicsWithExample = items
            .map((topic) => ({ topic, example: getExample(language.id, topic.id) }))
            .filter((entry) => entry.example);
          if (topicsWithExample.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="mb-4 text-2xl font-semibold text-white">{category}</h2>
              <div className="space-y-6">
                {topicsWithExample.map(({ topic, example }) => (
                  <article key={topic.id} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{topic.titleTh}</h3>
                        <p className="text-sm text-slate-500">{topic.title}</p>
                      </div>
                      <Link href={`/topics/${topic.slug}`} className="text-sm text-sky-300 hover:text-sky-200">เทียบกับภาษาอื่น →</Link>
                    </div>
                    <CodeBlock code={example!.code} languageId={example!.languageId} />
                    <p className="mt-4 text-slate-300">{example!.explanation}</p>
                    {example!.notes.length > 0 && (
                      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-400">
                        {example!.notes.map((note) => <li key={note}>{note}</li>)}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

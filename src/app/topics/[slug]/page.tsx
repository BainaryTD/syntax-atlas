import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/CodeBlock";
import { LanguageBadge } from "@/components/LanguageBadge";
import { getExamplesByTopic, getLanguageById, getTopicBySlug, topics } from "@/lib/content";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export default async function TopicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const topicExamples = getExamplesByTopic(topic.id);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-sky-300">{topic.category}</p>
          <h1 className="mt-2 text-4xl font-bold text-white">{topic.titleTh}</h1>
          <p className="mt-1 text-xl text-slate-400">{topic.title}</p>
          <p className="mt-4 max-w-2xl text-slate-300">{topic.description}</p>
        </div>
        <Link href={`/compare?topic=${topic.slug}`} className="rounded-full bg-sky-400 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-300">
          เปรียบเทียบหัวข้อนี้
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {topicExamples.map((example) => {
          const language = getLanguageById(example.languageId);
          return language ? <LanguageBadge key={example.id} language={language} /> : null;
        })}
      </div>

      <div className="mt-10 grid gap-6">
        {topicExamples.map((example) => {
          const language = getLanguageById(example.languageId);
          if (!language) return null;
          return (
            <article key={example.id} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{language.name}</h2>
                  <p className="text-sm text-slate-500">{example.version}</p>
                </div>
                <Link href={`/languages/${language.slug}`} className="text-sm text-sky-300 hover:text-sky-200">ดู syntax ของภาษานี้ →</Link>
              </div>
              <CodeBlock code={example.code} languageId={example.languageId} />
              <p className="mt-4 text-slate-300">{example.explanation}</p>
              {example.notes.length > 0 && (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-400">
                  {example.notes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}

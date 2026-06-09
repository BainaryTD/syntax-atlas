import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamplesByLanguage, getLanguageBySlug, getTopicById, groupTopicsByCategory, languages } from "@/lib/content";

export function generateStaticParams() {
  return languages.map((language) => ({ slug: language.slug }));
}

export default async function LanguageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const language = getLanguageBySlug(slug);
  if (!language) notFound();

  const languageExamples = getExamplesByLanguage(language.id);
  const examplesByTopic = new Set(languageExamples.map((example) => example.topicId));
  const groupedTopics = groupTopicsByCategory();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-sky-300">{language.version}</p>
            <h1 className="mt-2 text-5xl font-bold text-white">{language.name}</h1>
            <p className="mt-4 max-w-2xl text-slate-300">{language.description}</p>
          </div>
          <span className="rounded-2xl bg-slate-800 px-4 py-2 font-mono text-slate-200">{language.fileExtension}</span>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {Object.entries(groupedTopics).map(([category, items]) => (
          <section key={category}>
            <h2 className="mb-4 text-2xl font-semibold text-white">{category}</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {items.filter((topic) => examplesByTopic.has(topic.id)).map((topic) => {
                const fullTopic = getTopicById(topic.id);
                if (!fullTopic) return null;
                return (
                  <Link key={topic.id} href={`/topics/${topic.slug}`} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-sky-500">
                    <h3 className="font-semibold text-white">{topic.titleTh}</h3>
                    <p className="mt-1 text-sm text-slate-500">{topic.title}</p>
                    <p className="mt-3 text-sm text-slate-300">{topic.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

import Link from "next/link";
import { CompareTable } from "@/components/CompareTable";
import { languages, topics, getTopicBySlug } from "@/lib/content";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ topic?: string; languages?: string }> }) {
  const params = await searchParams;
  const topic = getTopicBySlug(params.topic ?? "for-loop") ?? topics[0];
  const selectedLanguages = params.languages?.split(",").filter(Boolean) ?? ["python", "javascript", "typescript", "go", "rust", "java"];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm text-sky-300">Compare</p>
      <h1 className="mt-2 text-4xl font-bold text-white">เปรียบเทียบ Syntax</h1>
      <p className="mt-4 max-w-2xl text-slate-300">MVP แรกใช้ link ด้านล่างเพื่อเลือกหัวข้อ และแสดงเทียบหลายภาษาพร้อมกัน</p>

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">เลือกหัวข้อ</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.map((item) => (
            <Link
              key={item.id}
              href={`/compare?topic=${item.slug}`}
              className={`rounded-full border px-4 py-2 text-sm ${item.id === topic.id ? "border-sky-400 bg-sky-400 text-slate-950" : "border-slate-700 text-slate-300 hover:border-sky-400"}`}
            >
              {item.titleTh}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
          {languages.map((language) => <span key={language.id} className="rounded-full bg-slate-800 px-3 py-1">{language.name}</span>)}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-white">{topic.titleTh}</h2>
          <p className="mt-2 text-slate-400">{topic.description}</p>
        </div>
        <CompareTable topicId={topic.id} languageIds={selectedLanguages} />
      </section>
    </main>
  );
}

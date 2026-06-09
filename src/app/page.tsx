import Link from "next/link";
import { LanguageCard } from "@/components/LanguageCard";
import { SearchBox } from "@/components/SearchBox";
import { TopicCard } from "@/components/TopicCard";
import { CodeBlock } from "@/components/CodeBlock";
import { languages, topics } from "@/lib/content";

export default function Home() {
  const popularTopics = topics.filter((topic) => ["for-loop", "function", "if-else", "array-list"].includes(topic.id));

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-200">
            Reference + Cheat Sheet + Syntax Comparison
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            แผนที่ syntax สำหรับนักพัฒนาไทย
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            ค้นหาและเปรียบเทียบ syntax ของ Python, JavaScript, TypeScript, Go, Rust และ Java ได้ในที่เดียว
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/topics" className="rounded-full bg-sky-400 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-300">
              เริ่มดู Syntax
            </Link>
            <Link href="/compare" className="rounded-full border border-slate-700 px-5 py-3 font-semibold text-white hover:border-sky-400">
              เปรียบเทียบภาษา
            </Link>
          </div>
        </div>
        <div className="mt-12"><SearchBox topics={topics} /></div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-sky-300">Popular Topics</p>
            <h2 className="text-3xl font-bold text-white">หัวข้อยอดนิยม</h2>
          </div>
          <Link href="/topics" className="text-sm text-sky-300 hover:text-sky-200">ดูทั้งหมด →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {popularTopics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-sky-300">Compare Example</p>
          <h2 className="mt-2 text-3xl font-bold text-white">For Loop: Python เทียบ JavaScript</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <CodeBlock code={'for i in range(5):\n    print(i)'} languageId="python" />
            <CodeBlock code={'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}'} languageId="javascript" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 pb-24">
        <div className="mb-6">
          <p className="text-sm text-sky-300">Languages</p>
          <h2 className="text-3xl font-bold text-white">ภาษาที่รองรับใน MVP</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {languages.map((language) => <LanguageCard key={language.id} language={language} />)}
        </div>
      </section>
    </main>
  );
}

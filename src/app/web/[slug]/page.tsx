import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/CodeBlock";
import { LanguageBadge } from "@/components/LanguageBadge";
import { getLanguageById } from "@/lib/content";
import {
  getWebLibraryBySlug,
  getWebLibrarySetupNote,
  getWebLibraryWritingGuide,
  webLibraries,
} from "@/lib/web";

export function generateStaticParams() {
  return webLibraries.map((library) => ({ slug: library.slug }));
}

export default async function WebLibraryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const library = getWebLibraryBySlug(slug);
  if (!library) notFound();

  const language = getLanguageById(library.languageId);
  const setupNote = getWebLibrarySetupNote(library);
  const writingGuide = getWebLibraryWritingGuide(library);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <Link href="/web" className="text-sm text-slate-400 hover:text-slate-200">← กลับไปหน้า Web</Link>

      <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {language && <LanguageBadge language={language} />}
              <span className="text-sm text-sky-300">{library.category}</span>
            </div>
            <h1 className="mt-4 text-5xl font-bold text-white">{library.name}</h1>
            <p className="mt-4 max-w-2xl text-slate-300">{library.description}</p>
          </div>
          <span className="rounded-2xl bg-slate-800 px-4 py-2 font-mono text-slate-200">{library.version}</span>
        </div>
        <a
          href={library.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-sky-400 hover:text-white"
        >
          เอกสารทางการ ↗
        </a>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">Library ที่ใช้</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-500">ชื่อ library/framework</p>
            <p className="mt-2 text-xl font-semibold text-white">{library.name}</p>
            <p className="mt-2 text-sm text-sky-300">{library.category}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-500">ติดตั้งหรือเริ่มโปรเจกต์</p>
            <p className="mt-2 font-mono text-sm leading-6 text-slate-200">{setupNote}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-500">ใช้ประมาณนี้</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{library.explanation}</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">เขียนยังไง</h2>
        <CodeBlock code={library.code} languageId={library.languageId} />
        <p className="mt-4 text-slate-300">{library.explanation}</p>
        {library.notes.length > 0 && (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-400">
            {library.notes.map((note) => <li key={note}>{note}</li>)}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">โครงสร้างโปรเจกต์แบบละเอียด</h2>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <pre className="overflow-x-auto font-mono text-sm leading-6 text-slate-300">{library.structure}</pre>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-lg font-semibold text-white">ไฟล์สำคัญ</h3>
            <div className="mt-4 space-y-4">
              {writingGuide.keyFiles.map((file) => (
                <div key={file.path}>
                  <p className="font-mono text-sm text-sky-300">{file.path}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{file.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">โครงสร้างเริ่มต้นโดยทั่วไป ปรับได้ตามขนาดและความถนัดของทีม</p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">ลำดับการเขียนจริง</h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {writingGuide.workflow.map((step, index) => (
            <li key={step} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <span className="font-mono text-sm text-sky-300">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

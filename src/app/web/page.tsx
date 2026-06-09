import Link from "next/link";
import { getWebLibrarySetupNote, groupWebLibrariesByLanguage } from "@/lib/web";

export const metadata = {
  title: "Web | Syntax Atlas",
  description: "แต่ละภาษาใช้ library/framework อะไรทำเว็บได้บ้าง พร้อมตัวอย่างว่าเขียนยังไง",
};

export default function WebPage() {
  const groups = groupWebLibrariesByLanguage();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm text-sky-300">Web</p>
      <h1 className="mt-2 text-4xl font-bold text-white">ทำเว็บด้วยภาษาที่คุณถนัด</h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        แต่ละภาษาใช้ library/framework อะไรเขียนเว็บได้บ้าง เลือกตัวที่สนใจเพื่อดูตัวอย่างว่าเขียนยังไง
      </p>

      <div className="mt-12 space-y-12">
        {groups.map(({ language, libraries }) => (
          <section key={language.id}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: language.color }} />
              <h2 className="text-2xl font-semibold text-white">{language.name}</h2>
              <span className="text-sm text-slate-500">{libraries.length} library</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {libraries.map((library) => (
                <Link
                  key={library.id}
                  href={`/web/${library.slug}`}
                  className="block rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-0.5 hover:border-sky-500/70"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white">{library.name}</h3>
                    <span className="rounded-full bg-slate-800 px-3 py-1 font-mono text-xs text-slate-300">
                      {library.version}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-sky-300">{library.category}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{library.tagline}</p>
                  <p className="mt-4 rounded-xl bg-slate-950/70 px-3 py-2 font-mono text-xs leading-5 text-slate-400">
                    {getWebLibrarySetupNote(library)}
                  </p>
                  <p className="mt-3 text-sm font-medium text-sky-300">ดูตัวอย่างการใช้ →</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

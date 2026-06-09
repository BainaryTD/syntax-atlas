import { LanguageCard } from "@/components/LanguageCard";
import { languages } from "@/lib/content";

export default function LanguagesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm text-sky-300">Languages</p>
      <h1 className="mt-2 text-4xl font-bold text-white">ภาษาที่รองรับ</h1>
      <p className="mt-4 max-w-2xl text-slate-300">เริ่มจาก 6 ภาษาใน MVP เพื่อให้ข้อมูลสั้น ชัด และตรวจสอบคุณภาพได้ง่าย</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {languages.map((language) => <LanguageCard key={language.id} language={language} />)}
      </div>
    </main>
  );
}

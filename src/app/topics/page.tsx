import { TopicCard } from "@/components/TopicCard";
import { groupTopicsByCategory } from "@/lib/content";

export default function TopicsPage() {
  const groupedTopics = groupTopicsByCategory();
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm text-sky-300">Topics</p>
      <h1 className="mt-2 text-4xl font-bold text-white">หัวข้อ Syntax ทั้งหมด</h1>
      <p className="mt-4 max-w-2xl text-slate-300">เลือก concept ที่อยากดู แล้วเข้าไปเปรียบเทียบ syntax ของแต่ละภาษาได้ทันที</p>
      <div className="mt-10 space-y-10">
        {Object.entries(groupedTopics).map(([category, items]) => (
          <section key={category}>
            <h2 className="mb-4 text-2xl font-semibold text-white">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((topic) => <TopicCard key={topic.id} topic={topic} />)}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

import Link from "next/link";

const links = [
  { href: "/topics", label: "หัวข้อ" },
  { href: "/languages", label: "ภาษา" },
  { href: "/compare", label: "เปรียบเทียบ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          Syntax <span className="text-sky-400">Atlas</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-300">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

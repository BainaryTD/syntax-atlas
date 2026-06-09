"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      onClick={copy}
      className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-sky-400 hover:text-white"
      type="button"
    >
      {copied ? "คัดลอกแล้ว" : "Copy"}
    </button>
  );
}

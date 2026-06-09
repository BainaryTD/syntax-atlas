import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

const languageMap: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  go: "go",
  rust: "rust",
  java: "java",
};

export async function CodeBlock({ code, languageId }: { code: string; languageId: string }) {
  const html = await codeToHtml(code, {
    lang: languageMap[languageId] ?? "text",
    theme: "github-dark-default",
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <span className="font-mono text-xs text-slate-400">{languageId}</span>
        <CopyButton text={code} />
      </div>
      <div
        className="syntax-code overflow-x-auto p-4 text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

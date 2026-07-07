import type { Chapter } from "@/lib/types";
import { ExplanationDiagram } from "@/components/ExplanationDiagram";

export function ExplanationPanel({
  chapter,
  onNext,
}: {
  chapter: Chapter;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 rounded border p-6">
      <h2 className="text-xl font-bold">
        {chapter.grade}・{chapter.title}
      </h2>

      <p className="max-w-prose whitespace-pre-line text-base leading-loose">
        {chapter.explanation.summary}
      </p>

      {chapter.explanation.diagram && (
        <div className="flex justify-center rounded bg-[#f9f9f7] p-4 dark:bg-[#0d0d0d]">
          <ExplanationDiagram diagram={chapter.explanation.diagram} />
        </div>
      )}

      {chapter.explanation.notebookExample && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">ノートの書き方の例</h3>
          <div className="rounded border border-dashed border-[#c3c2b7] bg-[#fcfcfb] p-4 font-mono text-sm leading-relaxed dark:border-[#383835] dark:bg-[#1a1a19]">
            <p className="mb-2">{chapter.explanation.notebookExample.question}</p>
            {chapter.explanation.notebookExample.lines.map((line) => (
              <p key={line} className="whitespace-pre">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-sm font-semibold">この単元のポイント</h3>
        <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed">
          {chapter.explanation.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="self-end rounded bg-blue-600 px-4 py-2 font-medium text-white"
      >
        問題を解いてみる
      </button>
    </div>
  );
}

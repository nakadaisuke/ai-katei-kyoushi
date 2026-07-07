import type { Chapter } from "@/lib/types";

export function ExplanationPanel({
  chapter,
  onNext,
}: {
  chapter: Chapter;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded border p-4">
      <h2 className="text-lg font-bold">
        {chapter.grade}・{chapter.title}
      </h2>
      <p className="whitespace-pre-line text-sm leading-relaxed">
        {chapter.explanation.summary}
      </p>
      <div>
        <h3 className="mb-1 text-sm font-semibold">この単元のポイント</h3>
        <ul className="list-disc pl-5 text-sm">
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

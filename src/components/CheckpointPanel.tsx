import type { Chapter } from "@/lib/types";
import { ExplanationDiagram } from "@/components/ExplanationDiagram";

type Checkpoint = NonNullable<Chapter["explanation"]["midCheckpoint"]>;

// 練習問題を終えたあと、評価問題に入る前に挟む追加解説パネル
// （難しい単元だけ`chapter.explanation.midCheckpoint`が設定されている）。
export function CheckpointPanel({
  checkpoint,
  onNext,
}: {
  checkpoint: Checkpoint;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 rounded border-2 border-amber-400 p-6">
      <span className="self-start rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-[#332c14] dark:text-amber-300">
        ワンポイント解説
      </span>

      <p className="max-w-prose whitespace-pre-line text-base leading-loose">
        {checkpoint.summary}
      </p>

      {checkpoint.diagram && (
        <div className="flex justify-center rounded bg-[#f9f9f7] p-4 dark:bg-[#0d0d0d]">
          <ExplanationDiagram diagram={checkpoint.diagram} />
        </div>
      )}

      {checkpoint.diagrams && checkpoint.diagrams.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 rounded bg-[#f9f9f7] p-4 dark:bg-[#0d0d0d]">
          {checkpoint.diagrams.map((d, i) => (
            <ExplanationDiagram key={i} diagram={d} />
          ))}
        </div>
      )}

      {checkpoint.keyPoints && checkpoint.keyPoints.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold">ここまでのポイント</h3>
          <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed">
            {checkpoint.keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={onNext}
        className="self-end rounded bg-blue-600 px-4 py-2 font-medium text-white"
      >
        つづきの問題へ
      </button>
    </div>
  );
}

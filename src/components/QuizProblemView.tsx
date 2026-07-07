"use client";

import { useState } from "react";
import type { Problem } from "@/lib/types";
import { ProblemFigureView } from "@/components/ProblemFigureView";

export function QuizProblemView({
  problem,
  index,
  total,
  onSubmit,
}: {
  problem: Problem;
  index: number;
  total: number;
  onSubmit: (rawAnswer: string) => void;
}) {
  const [draft, setDraft] = useState("");

  return (
    <div className="flex flex-col gap-4 rounded border p-4">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          章末小テスト {index + 1} / {total}
        </span>
      </div>

      <p className="text-lg font-medium">{problem.question}</p>

      {problem.figure && (
        <div className="flex justify-center rounded bg-[#f9f9f7] p-4 dark:bg-[#0d0d0d]">
          <ProblemFigureView figure={problem.figure} />
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(draft);
          setDraft("");
        }}
        className="flex gap-2"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="ノートで計算した答えを入力"
          className="flex-1 rounded border px-3 py-2"
          autoFocus
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white"
        >
          次へ
        </button>
      </form>
      <p className="text-xs text-gray-500">
        小テストでは正誤・ヒントは表示されません。全問終わったら結果をまとめて見られます。
      </p>
    </div>
  );
}

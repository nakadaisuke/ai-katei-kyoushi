"use client";

import { useState } from "react";
import type { Problem } from "@/lib/types";
import { StepSolution } from "@/components/StepSolution";
import { HintButton } from "@/components/HintButton";
import { ProblemFigureView } from "@/components/ProblemFigureView";

const DIFFICULTY_LABEL: Record<Problem["difficulty"], string> = {
  easy: "かんたん",
  normal: "ふつう",
  hard: "少しむずかしい",
};

export function ProblemView({
  problem,
  headerLabel,
  isReview = false,
  nextLabel = "わかった・次へ",
  result,
  reexplanation,
  reexplainLoading,
  onSubmit,
  onRequestHint,
  onRequestReexplain,
  onNext,
  onBack,
  backLabel = "← 前の問題に戻る",
}: {
  problem: Problem;
  headerLabel: string;
  isReview?: boolean;
  nextLabel?: string;
  result: { correct: boolean } | null;
  reexplanation: string | null;
  reexplainLoading: boolean;
  onSubmit: (rawAnswer: string) => void;
  onRequestHint: (hintLevel: 1 | 2 | 3) => Promise<string>;
  onRequestReexplain: () => void;
  onNext: () => void;
  onBack?: () => void;
  backLabel?: string;
}) {
  const [draft, setDraft] = useState("");

  return (
    <div className="flex flex-col gap-4 rounded border p-4">
      {isReview && (
        <p className="rounded bg-[#cde2fb] px-3 py-2 text-sm text-[#0b0b0b] dark:bg-[#184f95] dark:text-white">
          確認問題：さっきと似たタイプの問題です。もう一度解いてみましょう。
        </p>
      )}

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="self-start text-sm text-blue-600 underline"
        >
          {backLabel}
        </button>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{headerLabel}</span>
        <span className="rounded bg-gray-100 px-2 py-0.5">
          {DIFFICULTY_LABEL[problem.difficulty]}
        </span>
      </div>

      <p className="text-lg font-medium">{problem.question}</p>

      {problem.figure && (
        <div className="flex justify-center rounded bg-[#f9f9f7] p-4 dark:bg-[#0d0d0d]">
          <ProblemFigureView figure={problem.figure} />
        </div>
      )}

      {!result && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(draft);
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
              答え合わせ
            </button>
          </form>
          <HintButton onRequestHint={onRequestHint} />
        </>
      )}

      {result && (
        <div className="flex flex-col gap-3">
          <p
            className={`font-semibold ${result.correct ? "text-green-600" : "text-red-600"}`}
          >
            {result.correct ? "正解！" : "不正解"}
          </p>
          <StepSolution steps={problem.steps} answer={problem.answer} />

          {!reexplanation && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onNext}
                className="rounded bg-blue-600 px-4 py-2 font-medium text-white"
              >
                {nextLabel}
              </button>
              <button
                type="button"
                onClick={onRequestReexplain}
                disabled={reexplainLoading}
                className="rounded border px-4 py-2 font-medium disabled:opacity-50"
              >
                {reexplainLoading ? "考え中..." : "よく分からない"}
              </button>
            </div>
          )}

          {reexplanation && (
            <div className="flex flex-col gap-3">
              <div className="rounded bg-blue-50 p-3 text-sm whitespace-pre-line">
                {reexplanation}
              </div>
              <button
                type="button"
                onClick={onNext}
                className="self-start rounded bg-blue-600 px-4 py-2 font-medium text-white"
              >
                {nextLabel}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

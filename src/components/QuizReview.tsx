import Link from "next/link";
import type { Problem } from "@/lib/types";
import { StepSolution } from "@/components/StepSolution";
import { ProblemFigureView } from "@/components/ProblemFigureView";
import { Celebration } from "@/components/Celebration";

export interface QuizResultEntry {
  problem: Problem;
  studentAnswer: string;
  correct: boolean;
}

const PASS_RATIO = 0.8;

export function QuizReview({
  results,
  title = "この単元はおしまいです！",
  subtitle = "おつかれさまでした。章末小テストの結果です。",
  resultLabel = "章末小テスト 結果",
  backHref = "/",
  backLabel = "学習マップに戻る",
  celebrationMessage = "おめでとう！🎉",
  celebrationParticleCount = 24,
}: {
  results: QuizResultEntry[];
  title?: string;
  subtitle?: string;
  resultLabel?: string;
  backHref?: string;
  backLabel?: string;
  celebrationMessage?: string;
  celebrationParticleCount?: number;
}) {
  const total = results.length;
  const correctCount = results.filter((r) => r.correct).length;
  const passed = total > 0 && correctCount / total >= PASS_RATIO;

  return (
    <div className="flex flex-col gap-4 rounded border p-4">
      {passed && (
        <Celebration message={celebrationMessage} particleCount={celebrationParticleCount} />
      )}

      <div className="text-center">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{resultLabel}</h2>
        <span
          className={`text-sm font-semibold ${passed ? "text-green-600" : "text-orange-600"}`}
        >
          {correctCount} / {total} 正解{passed ? "（合格）" : ""}
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {results.map((r, i) => (
          <li key={r.problem.id} className="flex flex-col gap-2 rounded bg-gray-50 p-3">
            <p className="text-xs text-gray-500">問題 {i + 1}</p>
            <p className="font-medium">{r.problem.question}</p>
            {r.problem.figure && (
              <div className="flex justify-center rounded bg-white p-2 dark:bg-[#1a1a19]">
                <ProblemFigureView figure={r.problem.figure} />
              </div>
            )}
            <p className={r.correct ? "text-sm font-semibold text-green-600" : "text-sm font-semibold text-red-600"}>
              あなたの答え：{r.studentAnswer}　{r.correct ? "◯" : "×"}
            </p>
            {!r.correct && <StepSolution steps={r.problem.steps} answer={r.problem.answer} />}
          </li>
        ))}
      </ul>

      <Link
        href={backHref}
        className="self-start rounded bg-blue-600 px-4 py-2 font-medium text-white"
      >
        {backLabel}
      </Link>
    </div>
  );
}

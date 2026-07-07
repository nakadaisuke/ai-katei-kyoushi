"use client";

import { useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isCorrectAnswer } from "@/lib/grading";
import { recordAttempt, markChapterComplete } from "@/lib/progress";
import { pickMultiChapterTestProblems, type MultiChapterTest } from "@/lib/milestones";
import type { Chapter } from "@/lib/types";
import { QuizProblemView } from "@/components/QuizProblemView";
import { QuizReview, type QuizResultEntry } from "@/components/QuizReview";

export function MultiChapterTestView({
  test,
  chapters,
  studentId,
}: {
  test: MultiChapterTest;
  chapters: Chapter[];
  studentId: string;
}) {
  const problems = useMemo(() => pickMultiChapterTestProblems(chapters), [chapters]);

  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<QuizResultEntry[]>([]);
  const [done, setDone] = useState(false);
  const supabaseRef = useRef(createClient());

  async function handleSubmit(raw: string) {
    const problem = problems[index];
    const correct = isCorrectAnswer(raw, problem.answer);
    const entry: QuizResultEntry = { problem, studentAnswer: raw, correct };
    const updated = [...results, entry];
    setResults(updated);

    recordAttempt(supabaseRef.current, {
      studentId,
      chapterId: test.id,
      problemId: problem.id,
      studentAnswer: raw,
      correct,
      usedHintLevels: 0,
      requestedReexplain: false,
      durationMs: 0,
      isQuiz: true,
    }).catch(() => {});

    const nextIndex = index + 1;
    if (nextIndex >= problems.length) {
      await markChapterComplete(supabaseRef.current, studentId, test.id);
      setDone(true);
    } else {
      setIndex(nextIndex);
    }
  }

  function handleBack() {
    if (index <= 0) return;
    const prevIndex = index - 1;
    // 前の問題に戻って解き直せるよう、その問題の記録済み結果はいったん取り除く
    // （再提出時にhandleSubmitが同じ位置に新しい結果を積み直す）
    setResults((prev) => prev.slice(0, prevIndex));
    setIndex(prevIndex);
  }

  if (done) {
    const isGraduation = test.kind === "graduation";
    return (
      <QuizReview
        results={results}
        title={isGraduation ? "そつぎょう、おめでとう！" : "確認テストはおしまいです！"}
        subtitle={
          isGraduation
            ? "全部の単元をがんばりました。そつぎょうテストの結果です。"
            : "おつかれさまでした。確認テストの結果です。"
        }
        resultLabel={isGraduation ? "そつぎょうテスト 結果" : "確認テスト 結果"}
        celebrationMessage={isGraduation ? "そつぎょう おめでとう！🏆" : "おめでとう！🎉"}
        celebrationParticleCount={isGraduation ? 48 : 24}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500">{test.title}</p>
      <QuizProblemView
        problem={problems[index]}
        index={index}
        total={problems.length}
        onSubmit={handleSubmit}
        onBack={index > 0 ? handleBack : undefined}
        label={test.kind === "graduation" ? "そつぎょうテスト" : "確認テスト"}
      />
    </div>
  );
}

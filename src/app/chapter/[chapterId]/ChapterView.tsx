"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { isCorrectAnswer } from "@/lib/grading";
import { recordAttempt, markChapterComplete } from "@/lib/progress";
import { pickReviewProblem } from "@/lib/review";
import type { Chapter, Problem } from "@/lib/types";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { ProblemView } from "@/components/ProblemView";

type Phase = "explanation" | number | "done";

export function ChapterView({
  chapter,
  studentId,
}: {
  chapter: Chapter;
  studentId: string;
}) {
  const [phase, setPhase] = useState<Phase>("explanation");
  const [reviewProblem, setReviewProblem] = useState<Problem | null>(null);
  const [result, setResult] = useState<{ correct: boolean } | null>(null);
  const [reexplanation, setReexplanation] = useState<string | null>(null);
  const [reexplainLoading, setReexplainLoading] = useState(false);

  const supabaseRef = useRef(createClient());
  const startTimeRef = useRef(Date.now());
  const maxHintLevelRef = useRef(0);
  const requestedReexplainRef = useRef(false);
  const pendingAnswerRef = useRef<{ studentAnswer: string; correct: boolean } | null>(
    null,
  );
  const seenProblemIdsRef = useRef<Set<string>>(new Set());
  const pendingNextPhaseRef = useRef<number | "done" | null>(null);

  const activeProblem: Problem | null =
    reviewProblem ?? (typeof phase === "number" ? chapter.problems[phase] : null);

  function resetTransientState() {
    setResult(null);
    setReexplanation(null);
    pendingAnswerRef.current = null;
    maxHintLevelRef.current = 0;
    requestedReexplainRef.current = false;
    startTimeRef.current = Date.now();
  }

  function startProblem(idx: number) {
    setReviewProblem(null);
    setPhase(idx);
    seenProblemIdsRef.current.add(chapter.problems[idx].id);
    resetTransientState();
  }

  function startReview(problem: Problem) {
    seenProblemIdsRef.current.add(problem.id);
    setReviewProblem(problem);
    resetTransientState();
  }

  function handleSubmit(raw: string) {
    if (!activeProblem) return;
    const correct = isCorrectAnswer(raw, activeProblem.answer);
    pendingAnswerRef.current = { studentAnswer: raw, correct };
    setResult({ correct });
  }

  async function handleRequestHint(hintLevel: 1 | 2 | 3): Promise<string> {
    if (!activeProblem) return "";
    maxHintLevelRef.current = Math.max(maxHintLevelRef.current, hintLevel);

    const res = await fetch("/api/hint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chapterId: chapter.id,
        problemId: activeProblem.id,
        hintLevel,
      }),
    });
    const data = await res.json();
    return data.hint ?? "ヒントを取得できませんでした。";
  }

  async function handleRequestReexplain() {
    if (!activeProblem || !pendingAnswerRef.current) return;
    requestedReexplainRef.current = true;
    setReexplainLoading(true);
    try {
      const res = await fetch("/api/reexplain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterId: chapter.id,
          problemId: activeProblem.id,
          priorAttempts: [
            {
              question: activeProblem.question,
              studentAnswer: pendingAnswerRef.current.studentAnswer,
              correct: pendingAnswerRef.current.correct,
            },
          ],
        }),
      });
      const data = await res.json();
      setReexplanation(data.explanation ?? "解説を取得できませんでした。");
    } finally {
      setReexplainLoading(false);
    }
  }

  async function handleNext() {
    const problem = activeProblem;
    if (!problem) return;
    const pending = pendingAnswerRef.current;
    const supabase = supabaseRef.current;

    if (pending) {
      await recordAttempt(supabase, {
        studentId,
        chapterId: chapter.id,
        problemId: problem.id,
        studentAnswer: pending.studentAnswer,
        correct: pending.correct,
        usedHintLevels: maxHintLevelRef.current,
        requestedReexplain: requestedReexplainRef.current,
        durationMs: Date.now() - startTimeRef.current,
      });
    }

    // 確認問題を終えた場合は、中断していた本来の続きに戻る
    if (reviewProblem) {
      const next = pendingNextPhaseRef.current;
      pendingNextPhaseRef.current = null;
      if (next === "done") {
        await markChapterComplete(supabase, studentId, chapter.id);
        setReviewProblem(null);
        setPhase("done");
      } else if (typeof next === "number") {
        startProblem(next);
      }
      return;
    }

    const currentIdx = phase as number;
    const nextPhase: number | "done" =
      currentIdx + 1 >= chapter.problems.length ? "done" : currentIdx + 1;

    // 「よく分からない」と答えた問題は、AI再解説のあとに同じタグの別問題で理解を確認する
    if (requestedReexplainRef.current) {
      const review = pickReviewProblem(chapter, problem, seenProblemIdsRef.current);
      if (review) {
        pendingNextPhaseRef.current = nextPhase;
        startReview(review);
        return;
      }
    }

    if (nextPhase === "done") {
      await markChapterComplete(supabase, studentId, chapter.id);
      setPhase("done");
    } else {
      startProblem(nextPhase);
    }
  }

  if (phase === "explanation") {
    return <ExplanationPanel chapter={chapter} onNext={() => startProblem(0)} />;
  }

  if (phase === "done") {
    return (
      <div className="flex flex-col items-center gap-4 rounded border p-8 text-center">
        <p className="text-xl font-bold">この単元はおしまいです！</p>
        <p className="text-sm text-gray-500">おつかれさまでした。</p>
        <Link href="/" className="rounded bg-blue-600 px-4 py-2 font-medium text-white">
          学習マップに戻る
        </Link>
      </div>
    );
  }

  if (!activeProblem) return null;

  const headerLabel = reviewProblem
    ? "確認問題"
    : `問題 ${(phase as number) + 1} / ${chapter.problems.length}`;

  return (
    <ProblemView
      problem={activeProblem}
      headerLabel={headerLabel}
      isReview={Boolean(reviewProblem)}
      nextLabel={reviewProblem ? "できた・続きへ" : "わかった・次へ"}
      result={result}
      reexplanation={reexplanation}
      reexplainLoading={reexplainLoading}
      onSubmit={handleSubmit}
      onRequestHint={handleRequestHint}
      onRequestReexplain={handleRequestReexplain}
      onNext={handleNext}
    />
  );
}

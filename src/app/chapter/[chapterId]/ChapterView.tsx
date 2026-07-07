"use client";

import { useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isCorrectAnswer } from "@/lib/grading";
import { recordAttempt, markChapterComplete, saveResumeIndex } from "@/lib/progress";
import { pickReviewProblem } from "@/lib/review";
import { pickQuizProblems } from "@/lib/quiz";
import type { Chapter, Problem } from "@/lib/types";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { ProblemView } from "@/components/ProblemView";
import { QuizProblemView } from "@/components/QuizProblemView";
import { QuizReview, type QuizResultEntry } from "@/components/QuizReview";

type Section = "practice" | "assessment";
type Phase = "explanation" | number | "quiz" | "quiz-review";

const QUIZ_LENGTH = 5;

export function ChapterView({
  chapter,
  studentId,
  initialIndex,
}: {
  chapter: Chapter;
  studentId: string;
  initialIndex?: number | null;
}) {
  const queue = useMemo(
    () => [
      ...chapter.practiceProblems.map((p) => ({ problem: p, section: "practice" as Section })),
      ...chapter.assessmentProblems.map((p) => ({ problem: p, section: "assessment" as Section })),
    ],
    [chapter],
  );
  const quizProblems = useMemo(() => pickQuizProblems(chapter, QUIZ_LENGTH), [chapter]);

  const initialPhase: Phase =
    initialIndex == null ? "explanation" : initialIndex >= queue.length ? "quiz" : initialIndex;

  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [reviewProblem, setReviewProblem] = useState<Problem | null>(null);
  const [result, setResult] = useState<{ correct: boolean } | null>(null);
  const [reexplanation, setReexplanation] = useState<string | null>(null);
  const [reexplainLoading, setReexplainLoading] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResultEntry[]>([]);

  const supabaseRef = useRef(createClient());
  const startTimeRef = useRef(Date.now());
  const maxHintLevelRef = useRef(0);
  const requestedReexplainRef = useRef(false);
  const pendingAnswerRef = useRef<{ studentAnswer: string; correct: boolean } | null>(
    null,
  );
  const seenProblemIdsRef = useRef<Set<string>>(
    new Set(
      typeof initialPhase === "number"
        ? queue.slice(0, initialPhase + 1).map((q) => q.problem.id)
        : initialPhase === "quiz"
          ? queue.map((q) => q.problem.id)
          : [],
    ),
  );
  const pendingNextPhaseRef = useRef<number | "quiz" | null>(null);

  const activeProblem: Problem | null =
    reviewProblem ?? (typeof phase === "number" ? queue[phase].problem : null);

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
    seenProblemIdsRef.current.add(queue[idx].problem.id);
    resetTransientState();
    saveResumeIndex(supabaseRef.current, studentId, chapter.id, idx).catch(() => {});
  }

  function startReview(problem: Problem) {
    seenProblemIdsRef.current.add(problem.id);
    setReviewProblem(problem);
    resetTransientState();
  }

  function startQuiz() {
    setReviewProblem(null);
    setQuizIndex(0);
    setQuizResults([]);
    setPhase("quiz");
    saveResumeIndex(supabaseRef.current, studentId, chapter.id, queue.length).catch(() => {});
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
      if (next === "quiz") {
        startQuiz();
      } else if (typeof next === "number") {
        startProblem(next);
      }
      return;
    }

    const currentIdx = phase as number;
    const nextPhase: number | "quiz" =
      currentIdx + 1 >= queue.length ? "quiz" : currentIdx + 1;

    // 「よく分からない」と答えた問題は、AI再解説のあとに同じタグの別問題で理解を確認する
    if (requestedReexplainRef.current) {
      const review = pickReviewProblem(chapter, problem, seenProblemIdsRef.current);
      if (review) {
        pendingNextPhaseRef.current = nextPhase;
        startReview(review);
        return;
      }
    }

    if (nextPhase === "quiz") {
      startQuiz();
    } else {
      startProblem(nextPhase);
    }
  }

  async function handleQuizSubmit(raw: string) {
    const problem = quizProblems[quizIndex];
    const correct = isCorrectAnswer(raw, problem.answer);
    const entry: QuizResultEntry = { problem, studentAnswer: raw, correct };
    const updated = [...quizResults, entry];
    setQuizResults(updated);

    recordAttempt(supabaseRef.current, {
      studentId,
      chapterId: chapter.id,
      problemId: problem.id,
      studentAnswer: raw,
      correct,
      usedHintLevels: 0,
      requestedReexplain: false,
      durationMs: 0,
      isQuiz: true,
    }).catch(() => {});

    const nextIdx = quizIndex + 1;
    if (nextIdx >= quizProblems.length) {
      await markChapterComplete(supabaseRef.current, studentId, chapter.id);
      setPhase("quiz-review");
    } else {
      setQuizIndex(nextIdx);
    }
  }

  if (phase === "explanation") {
    return <ExplanationPanel chapter={chapter} onNext={() => startProblem(0)} />;
  }

  if (phase === "quiz") {
    return (
      <QuizProblemView
        problem={quizProblems[quizIndex]}
        index={quizIndex}
        total={quizProblems.length}
        onSubmit={handleQuizSubmit}
      />
    );
  }

  if (phase === "quiz-review") {
    return <QuizReview results={quizResults} />;
  }

  if (!activeProblem) return null;

  const practiceCount = chapter.practiceProblems.length;
  const currentSection = reviewProblem
    ? null
    : queue[phase as number].section;
  const headerLabel = reviewProblem
    ? "確認問題"
    : currentSection === "practice"
      ? `練習問題 ${(phase as number) + 1} / ${practiceCount}`
      : `問題 ${(phase as number) - practiceCount + 1} / ${chapter.assessmentProblems.length}`;

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

import type { Chapter, Problem } from "@/lib/types";
import { getChaptersByGrade } from "@/content/curriculum";
import { pickQuizProblems } from "@/lib/quiz";

// 複数単元をまたぐテスト（マイルストーンテスト・卒業テスト）。
// 新しい問題は作らず、既存のpickQuizProblemsを単元ごとに呼んで結合するだけで
// 出題する（ハルシネーション対策の思想をquiz.ts/review.tsと共通にする）。
export const MILESTONE_SIZE = 4;
export const PROBLEMS_PER_CHAPTER = 2;

export interface MultiChapterTest {
  id: string;
  kind: "milestone" | "graduation";
  title: string;
  chapterIds: string[];
}

function gradeSlug(chapters: Chapter[]): string {
  return chapters[0]?.id.split("-")[0] ?? "test";
}

export function getMilestonesForGrade(grade: string): MultiChapterTest[] {
  const chapters = getChaptersByGrade(grade);
  const prefix = gradeSlug(chapters);
  const tests: MultiChapterTest[] = [];

  for (let i = 0; i < chapters.length; i += MILESTONE_SIZE) {
    const group = chapters.slice(i, i + MILESTONE_SIZE);
    const testNumber = tests.length + 1;
    tests.push({
      id: `${prefix}-milestone-${testNumber}`,
      kind: "milestone",
      title: `確認テスト${testNumber}（${group[0].title}〜${group[group.length - 1].title}）`,
      chapterIds: group.map((c) => c.id),
    });
  }

  return tests;
}

export function getGraduationTest(grade: string): MultiChapterTest {
  const chapters = getChaptersByGrade(grade);
  const prefix = gradeSlug(chapters);
  return {
    id: `${prefix}-graduation`,
    kind: "graduation",
    title: `${grade} そつぎょうテスト`,
    chapterIds: chapters.map((c) => c.id),
  };
}

export function findMultiChapterTest(
  testId: string,
  grade: string,
): MultiChapterTest | undefined {
  const all = [...getMilestonesForGrade(grade), getGraduationTest(grade)];
  return all.find((t) => t.id === testId);
}

export function pickMultiChapterTestProblems(chapters: Chapter[]): Problem[] {
  return chapters.flatMap((c) => pickQuizProblems(c, PROBLEMS_PER_CHAPTER));
}

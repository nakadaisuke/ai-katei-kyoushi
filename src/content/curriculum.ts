import type { Chapter } from "@/lib/types";
import { g3Division } from "@/content/chapters/g3-division";
import { g3MultiplicationWritten } from "@/content/chapters/g3-multiplication-written";
import { g3Time } from "@/content/chapters/g3-time";
import { g3AdditionSubtractionWritten } from "@/content/chapters/g3-addition-subtraction-written";
import { g3LargeNumbers } from "@/content/chapters/g3-large-numbers";
import { g3LengthWeight } from "@/content/chapters/g3-length-weight";
import { g3CircleSphere } from "@/content/chapters/g3-circle-sphere";
import { g3Decimals } from "@/content/chapters/g3-decimals";
import { g3Fractions } from "@/content/chapters/g3-fractions";
import { g3ExpressionsWithBox } from "@/content/chapters/g3-expressions-with-box";
import { g3BarGraphs } from "@/content/chapters/g3-bar-graphs";
import { g3Triangles } from "@/content/chapters/g3-triangles";

export const GRADE_ORDER = [
  "小学1年",
  "小学2年",
  "小学3年",
  "小学4年",
  "小学5年",
  "小学6年",
  "中学1年",
  "中学2年",
  "中学3年",
];

export const chapters: Chapter[] = [
  g3Division,
  g3MultiplicationWritten,
  g3Time,
  g3AdditionSubtractionWritten,
  g3LargeNumbers,
  g3LengthWeight,
  g3CircleSphere,
  g3Decimals,
  g3Fractions,
  g3ExpressionsWithBox,
  g3BarGraphs,
  g3Triangles,
];

export function getChapter(chapterId: string): Chapter | undefined {
  return chapters.find((c) => c.id === chapterId);
}

export function getChaptersByGrade(grade: string): Chapter[] {
  return chapters.filter((c) => c.grade === grade);
}

export function getAvailableGrades(): string[] {
  const present = new Set(chapters.map((c) => c.grade));
  return GRADE_ORDER.filter((g) => present.has(g));
}

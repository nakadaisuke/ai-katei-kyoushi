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

// 宮城県教育センター教材の単元番号（かけ算の筆算(1)→時こく→わり算→たし算ひき算の筆算→
// 長さ→大きい数のしくみ→円と球→小数→重さ→分数→□を使った式→三角形と角→ぼうグラフと表）
// に沿った教科書どおりの学習順で並べる。
export const chapters: Chapter[] = [
  g3MultiplicationWritten,
  g3Time,
  g3Division,
  g3AdditionSubtractionWritten,
  g3LengthWeight,
  g3LargeNumbers,
  g3CircleSphere,
  g3Decimals,
  g3Fractions,
  g3ExpressionsWithBox,
  g3Triangles,
  g3BarGraphs,
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

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
import { g4LargeNumbers } from "@/content/chapters/g4-large-numbers";
import { g4LineGraphs } from "@/content/chapters/g4-line-graphs";
import { g4DivisionWritten1 } from "@/content/chapters/g4-division-written-1";
import { g4Angles } from "@/content/chapters/g4-angles";
import { g4Decimals } from "@/content/chapters/g4-decimals";
import { g4Soroban } from "@/content/chapters/g4-soroban";
import { g4DivisionWritten2 } from "@/content/chapters/g4-division-written-2";
import { g4Rounding } from "@/content/chapters/g4-rounding";
import { g4CalculationRules } from "@/content/chapters/g4-calculation-rules";
import { g4Quadrilaterals } from "@/content/chapters/g4-quadrilaterals";
import { g4Fractions } from "@/content/chapters/g4-fractions";
import { g4FunctionTables } from "@/content/chapters/g4-function-tables";
import { g4Area } from "@/content/chapters/g4-area";
import { g4DecimalMultiplicationDivision } from "@/content/chapters/g4-decimal-multiplication-division";
import { g4RectangularPrism } from "@/content/chapters/g4-rectangular-prism";

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

// 宮城県教育センター教材の単元番号（小学3年：かけ算の筆算(1)→時こく→わり算→たし算ひき算の筆算→
// 長さ→大きい数のしくみ→円と球→小数→重さ→分数→□を使った式→三角形と角→ぼうグラフと表、
// 小学4年：大きい数のしくみ→折れ線グラフと表→わり算の筆算(1)→角の大きさ→小数のしくみ→そろばん→
// わり算の筆算(2)→がい数→計算のきまり→垂直・平行と四角形→分数→変わり方調べ→面積→
// 小数のかけ算とわり算→直方体と立方体）に沿った教科書どおりの学習順で並べる。
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
  g4LargeNumbers,
  g4LineGraphs,
  g4DivisionWritten1,
  g4Angles,
  g4Decimals,
  g4Soroban,
  g4DivisionWritten2,
  g4Rounding,
  g4CalculationRules,
  g4Quadrilaterals,
  g4Fractions,
  g4FunctionTables,
  g4Area,
  g4DecimalMultiplicationDivision,
  g4RectangularPrism,
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

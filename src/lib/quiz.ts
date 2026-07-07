import type { Chapter, Difficulty, Problem } from "@/lib/types";
import { allProblems } from "@/lib/types";

// 章末小テストの出題選定。新しい問題はAIに作らせず、その章の実在問題プールから
// 難易度バランスよく選ぶだけ（pickReviewProblemと同じ思想でハルシネーションを避ける）。
const DEFAULT_ORDER: Difficulty[] = ["easy", "normal", "hard", "easy", "normal"];

export function pickQuizProblems(chapter: Chapter, count = 5): Problem[] {
  const pool = allProblems(chapter);
  const buckets: Record<Difficulty, Problem[]> = { easy: [], normal: [], hard: [] };
  for (const p of pool) buckets[p.difficulty].push(p);

  const picked: Problem[] = [];
  const used = new Set<string>();

  function takeFrom(difficulty: Difficulty): boolean {
    const next = buckets[difficulty].find((p) => !used.has(p.id));
    if (!next) return false;
    used.add(next.id);
    picked.push(next);
    return true;
  }

  const order = DEFAULT_ORDER.slice(0, count);
  for (const difficulty of order) {
    if (picked.length >= count) break;
    if (!takeFrom(difficulty)) {
      (["easy", "normal", "hard"] as Difficulty[]).some((d) => takeFrom(d));
    }
  }

  for (const p of pool) {
    if (picked.length >= count) break;
    if (!used.has(p.id)) {
      used.add(p.id);
      picked.push(p);
    }
  }

  return picked;
}

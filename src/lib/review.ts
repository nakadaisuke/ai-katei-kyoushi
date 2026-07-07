import type { Chapter, Problem } from "@/lib/types";

// 「よく分からない」を押した生徒に、AI再解説のあと同じタグを持つ別の実在問題を
// もう一問解かせて理解を確認する。問題文自体はAI生成せず、既存の教材データから選ぶ
// （ハルシネーション防止のため、教材データは実在の公開問題のみで構成している）。
export function pickReviewProblem(
  chapter: Chapter,
  strugglingProblem: Problem,
  excludeIds: Set<string>,
): Problem | null {
  const candidates = chapter.problems.filter(
    (p) =>
      p.id !== strugglingProblem.id &&
      !excludeIds.has(p.id) &&
      p.tags.some((tag) => strugglingProblem.tags.includes(tag)),
  );

  if (candidates.length === 0) return null;

  const scored = candidates.map((p) => {
    const sharedTags = p.tags.filter((tag) => strugglingProblem.tags.includes(tag)).length;
    const sameDifficulty = p.difficulty === strugglingProblem.difficulty ? 1 : 0;
    return { problem: p, score: sharedTags * 10 + sameDifficulty };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].problem;
}

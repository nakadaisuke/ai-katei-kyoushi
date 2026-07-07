import { generateText } from "ai";
import type { Problem } from "@/lib/types";
import { normalizeAnswer } from "@/lib/grading";
import { getModel, isAiConfigured } from "@/lib/ai/model";

// ハルシネーション対策1: 生成前に正解・想定手順（steps/answer）を必ずプロンプトへ注入し、
// モデル自身に計算させず「検証済みの筋道を言い換えさせる」だけにする。
// ハルシネーション対策2: 生成後、正解の数値が本文に漏れていないか機械的にチェックする。
function leaksAnswer(text: string, answer: string): boolean {
  const normalizedText = normalizeAnswer(text);
  const normalizedAnswer = normalizeAnswer(answer);
  return normalizedAnswer.length > 0 && normalizedText.includes(normalizedAnswer);
}

export async function generateHint(
  problem: Problem,
  hintLevel: 1 | 2 | 3,
): Promise<string> {
  const fallback = {
    1: "問題文をもう一度読んで、何を求められているか（1人分の数か、人数か）を確認してみましょう。",
    2: "九九の表を使って、わる数のだんを順番に確認してみましょう。",
    3: "まず、わる数のだんの九九を、わられる数をこえない一番大きいところまで書き出してみましょう。",
  }[hintLevel];

  if (!isAiConfigured()) {
    return "（AIヒント機能が未設定です。ANTHROPIC_API_KEYを設定してください）";
  }

  const levelInstruction = {
    1: "着眼点だけを教えてください。何に注目すればよいかのヒントのみで、計算方法や式は書かないでください。",
    2: "使うべき考え方・式の形を教えてください。ただし数値を当てはめた具体的な計算結果は書かないでください。",
    3: "最初の1ステップだけを具体的に教えてください。ただし最終的な答えの数値は絶対に書かないでください。",
  }[hintLevel];

  let hint: string;
  try {
    const result = await generateText({
      model: getModel(),
      maxOutputTokens: 300,
      system:
        "あなたは小学生・中学生に算数・数学を教える家庭教師AIです。生徒が自分で考えて答えにたどり着けるよう、最終的な答えの数値や結果は絶対に教えず、段階的なヒントだけを短く分かりやすい言葉で伝えてください。想定される解き方の要点として与えられた情報だけを根拠にし、それ以外の解き方や数値を自分で作り出さないでください。",
      prompt: `問題: ${problem.question}\n正解: ${problem.answer}（このヒントには絶対に書かないこと）\n想定される解き方の要点: ${problem.steps.join(" / ")}\n\n${levelInstruction}\n2〜3文程度で、小学生にも分かる言葉で答えてください。`,
    });
    hint = result.text;
  } catch (e) {
    console.error("[generateHint] AI呼び出し失敗", e);
    return fallback;
  }

  if (!hint || leaksAnswer(hint, problem.answer)) {
    // 正解が漏れている、または生成に失敗した場合は安全な定型ヒントに差し替える
    return fallback;
  }

  return hint;
}

export async function generateReexplanation(
  chapterTitle: string,
  originalSummary: string,
  problem: Pick<Problem, "question" | "answer" | "steps">,
  priorAttempts: { question: string; studentAnswer: string; correct: boolean }[],
): Promise<string> {
  const fallback =
    "（AI解説の生成に失敗しました。もう一度お試しいただくか、上の途中式を先生や大人の人と一緒に確認してみましょう。）";

  if (!isAiConfigured()) {
    return "（AI個別解説機能が未設定です。ANTHROPIC_API_KEYを設定してください）";
  }

  const attemptsText = priorAttempts
    .map(
      (a) =>
        `問題「${a.question}」に対して「${a.studentAnswer}」と回答（${a.correct ? "正解" : "不正解"}）`,
    )
    .join("\n");

  try {
    const result = await generateText({
      model: getModel(),
      maxOutputTokens: 500,
      system:
        "あなたは小学生・中学生に算数・数学を教える家庭教師AIです。生徒が元の解説では理解できなかった単元について、元の解説とは違う切り口（図や具体的な日常の例え話など）で、学年相応のやさしい言葉で再解説してください。計算の筋道や正解は、必ず与えられた「検証済みの解き方」と一致させてください。自分で新しい計算をやり直したり、別の数値を作り出したりしないでください。",
      prompt: `単元: ${chapterTitle}\n元の解説:\n${originalSummary}\n\nつまずいている問題: ${problem.question}\n検証済みの正しい解き方（これと矛盾しないこと）:\n${problem.steps.join("\n")}\n正しい答え: ${problem.answer}\n\n生徒のこれまでの回答状況:\n${attemptsText}\n\nこの生徒がつまずいているポイントを踏まえて、上の検証済みの解き方と同じ結論になるように、元の解説とは異なるアプローチ（比喩や図解のことば）で、200〜300文字程度で分かりやすく再解説してください。`,
    });
    return result.text || fallback;
  } catch (e) {
    console.error("[generateReexplanation] AI呼び出し失敗", e);
    return fallback;
  }
}

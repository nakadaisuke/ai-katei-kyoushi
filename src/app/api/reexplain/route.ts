import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getChapter } from "@/content/chapters/g3-division";
import { generateReexplanation } from "@/lib/ai/tutor";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "認証が必要です。" }, { status: 401 });
  }

  const body = await request.json();
  const { chapterId, problemId, priorAttempts } = body as {
    chapterId: string;
    problemId: string;
    priorAttempts: {
      question: string;
      studentAnswer: string;
      correct: boolean;
    }[];
  };

  const chapter = getChapter(chapterId);
  const problem = chapter?.problems.find((p) => p.id === problemId);

  if (!chapter || !problem) {
    return NextResponse.json({ error: "単元・問題が見つかりません。" }, { status: 404 });
  }

  const explanation = await generateReexplanation(
    chapter.title,
    chapter.explanation.summary,
    problem,
    priorAttempts ?? [],
  );
  return NextResponse.json({ explanation });
}

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getChapter } from "@/content/chapters/g3-division";
import { generateHint } from "@/lib/ai/tutor";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "認証が必要です。" }, { status: 401 });
  }

  const body = await request.json();
  const { chapterId, problemId, hintLevel } = body as {
    chapterId: string;
    problemId: string;
    hintLevel: 1 | 2 | 3;
  };

  const chapter = getChapter(chapterId);
  const problem = chapter?.problems.find((p) => p.id === problemId);

  if (!problem) {
    return NextResponse.json({ error: "問題が見つかりません。" }, { status: 404 });
  }

  const hint = await generateHint(problem, hintLevel);
  return NextResponse.json({ hint });
}

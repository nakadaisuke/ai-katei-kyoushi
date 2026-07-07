import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getChapter } from "@/content/curriculum";
import { ACTIVE_STUDENT_COOKIE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { fetchChapterProgress } from "@/lib/progress";
import { ChapterView } from "./ChapterView";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const cookieStore = await cookies();
  const studentId = cookieStore.get(ACTIVE_STUDENT_COOKIE)?.value;

  if (!studentId) {
    redirect("/profiles");
  }

  const chapter = getChapter(chapterId);
  if (!chapter) {
    notFound();
  }

  const supabase = await createClient();
  const progress = await fetchChapterProgress(supabase, studentId, chapterId);
  // 達成済みならまた最初から、未達成で途中まで進んでいればそこから再開する
  const initialIndex = progress?.completed_at ? null : (progress?.current_index ?? null);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 px-4 py-12">
      <Link href={`/grade/${encodeURIComponent(chapter.grade)}`} className="text-sm text-blue-600 underline">
        ← 単元一覧に戻る
      </Link>
      <ChapterView chapter={chapter} studentId={studentId} initialIndex={initialIndex} />
    </main>
  );
}

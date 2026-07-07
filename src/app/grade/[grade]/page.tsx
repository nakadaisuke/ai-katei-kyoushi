import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ACTIVE_STUDENT_COOKIE } from "@/lib/constants";
import { getChaptersByGrade } from "@/content/curriculum";
import { allProblems } from "@/lib/types";
import {
  fetchAttempts,
  fetchAllChapterProgress,
  latestAttemptPerProblem,
} from "@/lib/progress";
import { MagnitudeBar } from "@/components/MagnitudeBar";

export default async function GradeUnitsPage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const { grade: rawGrade } = await params;
  const grade = decodeURIComponent(rawGrade);

  const cookieStore = await cookies();
  const studentId = cookieStore.get(ACTIVE_STUDENT_COOKIE)?.value;

  if (!studentId) {
    redirect("/profiles");
  }

  const supabase = await createClient();
  const { data: student } = await supabase
    .from("students")
    .select("id, name, grade")
    .eq("id", studentId)
    .maybeSingle();

  if (!student) {
    redirect("/profiles");
  }

  const chapters = getChaptersByGrade(grade);
  if (chapters.length === 0) {
    notFound();
  }

  // 章ごとに問い合わせるとN+1になるため、この生徒の分をまとめて2回のクエリで取得する
  const [allAttempts, progressByChapter] = await Promise.all([
    fetchAttempts(supabase, studentId),
    fetchAllChapterProgress(supabase, studentId),
  ]);

  const chapterCards = chapters.map((chapter) => {
    const attempts = allAttempts.filter((a) => a.chapter_id === chapter.id && !a.is_quiz);
    const latest = latestAttemptPerProblem(attempts);
    const solvedCount = [...latest.values()].filter((a) => a.correct).length;
    const progress = progressByChapter.get(chapter.id);
    return {
      chapter,
      solvedCount,
      totalCount: allProblems(chapter).length,
      completed: Boolean(progress?.completed_at),
    };
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="text-sm text-blue-600 underline">
            ← 学年選択に戻る
          </Link>
          <h1 className="mt-1 text-2xl font-bold">
            {grade}・{student.name}さんの学習マップ
          </h1>
        </div>
        <Link href="/profiles" className="text-sm text-blue-600 underline">
          プロファイル切替
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {chapterCards.map(({ chapter, solvedCount, totalCount, completed }) => (
          <li key={chapter.id}>
            <Link
              href={`/chapter/${chapter.id}`}
              className="flex flex-col gap-1 rounded border p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{chapter.title}</span>
                {completed && (
                  <span className="text-xs font-medium text-green-600">達成済み</span>
                )}
              </div>
              <MagnitudeBar
                label="進捗"
                valueLabel={`${solvedCount} / ${totalCount} 問 正解`}
                ratio={solvedCount / totalCount}
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

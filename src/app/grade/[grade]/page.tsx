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
import { MILESTONE_SIZE, getMilestonesForGrade, getGraduationTest } from "@/lib/milestones";
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

  // 4単元ごとに確認テスト（マイルストーンテスト）、最後に卒業テストのカードを差し込む。
  // ロックはかけず、いつでも受験できる（済みバッジの表示のみ進捗と連動させる）。
  const milestones = getMilestonesForGrade(grade);
  const graduation = getGraduationTest(grade);

  type Row =
    | { type: "chapter"; key: string; chapter: (typeof chapterCards)[number]["chapter"]; solvedCount: number; totalCount: number; completed: boolean }
    | { type: "test"; key: string; title: string; href: string; completed: boolean };

  const rows: Row[] = [];
  chapterCards.forEach((cc, i) => {
    rows.push({ type: "chapter", key: cc.chapter.id, ...cc });
    if ((i + 1) % MILESTONE_SIZE === 0) {
      const milestone = milestones[(i + 1) / MILESTONE_SIZE - 1];
      if (milestone) {
        rows.push({
          type: "test",
          key: milestone.id,
          title: milestone.title,
          href: `/milestone/${milestone.id}`,
          completed: Boolean(progressByChapter.get(milestone.id)?.completed_at),
        });
      }
    }
  });
  rows.push({
    type: "test",
    key: graduation.id,
    title: graduation.title,
    href: "/graduation",
    completed: Boolean(progressByChapter.get(graduation.id)?.completed_at),
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
        {rows.map((row) =>
          row.type === "chapter" ? (
            <li key={row.key}>
              <Link
                href={`/chapter/${row.chapter.id}`}
                className="flex flex-col gap-1 rounded border p-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{row.chapter.title}</span>
                  {row.completed && (
                    <span className="text-xs font-medium text-green-600">達成済み</span>
                  )}
                </div>
                <MagnitudeBar
                  label="進捗"
                  valueLabel={`${row.solvedCount} / ${row.totalCount} 問 正解`}
                  ratio={row.solvedCount / row.totalCount}
                />
              </Link>
            </li>
          ) : (
            <li key={row.key}>
              <Link
                href={row.href}
                className="flex items-center justify-between rounded border-2 border-dashed border-amber-400 bg-amber-50 p-4 hover:bg-amber-100 dark:bg-[#2a2410] dark:hover:bg-[#332c14]"
              >
                <span className="font-semibold">📝 {row.title}</span>
                {row.completed && (
                  <span className="text-xs font-medium text-green-600">達成済み</span>
                )}
              </Link>
            </li>
          ),
        )}
      </ul>
    </main>
  );
}

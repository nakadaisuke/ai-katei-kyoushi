import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { chapters } from "@/content/curriculum";
import { allProblems } from "@/lib/types";
import {
  fetchAttempts,
  fetchAllChapterProgress,
  latestAttemptPerProblem,
  summarizeTagStats,
} from "@/lib/progress";
import { MagnitudeBar } from "@/components/MagnitudeBar";

export default async function ParentStudentPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  const supabase = await createClient();

  const { data: student } = await supabase
    .from("students")
    .select("id, name, grade")
    .eq("id", studentId)
    .maybeSingle();

  if (!student) {
    notFound();
  }

  // 章ごとに問い合わせるとN+1になるため、この生徒の分をまとめて2回のクエリで取得する
  const [allAttempts, progressByChapter] = await Promise.all([
    fetchAttempts(supabase, studentId),
    fetchAllChapterProgress(supabase, studentId),
  ]);

  const chapterReports = chapters.map((chapter) => {
    const attempts = allAttempts.filter((a) => a.chapter_id === chapter.id && !a.is_quiz);
    const latest = latestAttemptPerProblem(attempts);
    const solvedCount = [...latest.values()].filter((a) => a.correct).length;
    const progress = progressByChapter.get(chapter.id);
    const totalDurationMs = attempts.reduce((sum, a) => sum + (a.duration_ms ?? 0), 0);
    const studyDays = new Set(attempts.map((a) => a.created_at.slice(0, 10))).size;
    const tagStats = summarizeTagStats(attempts, chapter);

    return {
      chapter,
      solvedCount,
      totalCount: allProblems(chapter).length,
      completed: Boolean(progress?.completed_at),
      attemptCount: attempts.length,
      totalDurationMinutes: Math.round(totalDurationMs / 60000),
      studyDays,
      tagStats,
    };
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 py-12">
      <div>
        <Link href="/parent" className="text-sm text-blue-600 underline">
          ← 子ども一覧に戻る
        </Link>
        <h1 className="mt-1 text-2xl font-bold">
          {student.name}さん（{student.grade}）
        </h1>
      </div>

      {chapterReports.map((report) => (
        <section key={report.chapter.id} className="flex flex-col gap-4 rounded border p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              {report.chapter.grade}・{report.chapter.title}
            </h2>
            {report.completed && (
              <span className="text-xs font-medium text-[#0ca30c]">達成済み</span>
            )}
          </div>

          <MagnitudeBar
            label="進捗"
            valueLabel={`${report.solvedCount} / ${report.totalCount} 問 正解`}
            ratio={report.solvedCount / report.totalCount}
          />

          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-[#898781]">学習時間（合計）</p>
              <p className="font-semibold">{report.totalDurationMinutes} 分</p>
            </div>
            <div>
              <p className="text-[#898781]">取り組んだ回数</p>
              <p className="font-semibold">{report.attemptCount} 回</p>
            </div>
            <div>
              <p className="text-[#898781]">学習した日数</p>
              <p className="font-semibold">{report.studyDays} 日</p>
            </div>
          </div>

          {report.tagStats.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">苦手分析（正答率が低い順）</h3>
              {report.tagStats.map((stat) => (
                <MagnitudeBar
                  key={stat.tag}
                  label={stat.tag}
                  valueLabel={`${stat.correct} / ${stat.total} 正解`}
                  ratio={stat.correct / stat.total}
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACTIVE_STUDENT_COOKIE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { getGraduationTest } from "@/lib/milestones";
import { getChapter } from "@/content/curriculum";
import { MultiChapterTestView } from "@/components/MultiChapterTestView";

export default async function GraduationTestPage() {
  const cookieStore = await cookies();
  const studentId = cookieStore.get(ACTIVE_STUDENT_COOKIE)?.value;

  if (!studentId) {
    redirect("/profiles");
  }

  const supabase = await createClient();
  const { data: student } = await supabase
    .from("students")
    .select("id, grade")
    .eq("id", studentId)
    .maybeSingle();

  if (!student) {
    redirect("/profiles");
  }

  const test = getGraduationTest(student.grade);
  const chapters = test.chapterIds
    .map((id) => getChapter(id))
    .filter((c) => c !== undefined);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 px-4 py-12">
      <Link
        href={`/grade/${encodeURIComponent(student.grade)}`}
        className="text-sm text-blue-600 underline"
      >
        ← 単元一覧に戻る
      </Link>
      <MultiChapterTestView test={test} chapters={chapters} studentId={studentId} />
    </main>
  );
}

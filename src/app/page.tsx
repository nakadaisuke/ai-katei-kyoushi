import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ACTIVE_STUDENT_COOKIE } from "@/lib/constants";
import { GRADE_ORDER, getAvailableGrades } from "@/content/curriculum";

export default async function GradeSelectPage() {
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

  const availableGrades = new Set(getAvailableGrades());

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{student.name}さん・学年をえらぼう</h1>
        <Link href="/profiles" className="text-sm text-blue-600 underline">
          プロファイル切替
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {GRADE_ORDER.map((grade) => {
          const isAvailable = availableGrades.has(grade);
          const isOwnGrade = grade === student.grade;

          if (!isAvailable) {
            return (
              <li
                key={grade}
                className="flex items-center justify-between rounded border border-dashed px-4 py-3 text-gray-400"
              >
                <span>{grade}</span>
                <span className="text-xs">準備中</span>
              </li>
            );
          }

          return (
            <li key={grade}>
              <Link
                href={`/grade/${encodeURIComponent(grade)}`}
                className="flex items-center justify-between rounded border px-4 py-3 hover:bg-gray-50"
              >
                <span className="font-medium">{grade}</span>
                {isOwnGrade && (
                  <span className="text-xs font-medium text-blue-600">
                    {student.name}さんの学年
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

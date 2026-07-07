import { createClient } from "@/lib/supabase/server";
import { selectStudent } from "@/lib/actions/students";
import { logout } from "@/lib/actions/auth";
import { NewStudentForm } from "./NewStudentForm";

export default async function ProfilesPage() {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id, name, grade")
    .order("created_at", { ascending: true });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">どの子が勉強しますか？</h1>
        <form action={logout}>
          <button type="submit" className="text-sm text-gray-500 underline">
            ログアウト
          </button>
        </form>
      </div>

      <ul className="flex flex-col gap-2">
        {students?.map((student) => (
          <li key={student.id}>
            <form action={selectStudent.bind(null, student.id)}>
              <button
                type="submit"
                className="flex w-full items-center justify-between rounded border px-4 py-3 text-left hover:bg-gray-50"
              >
                <span className="font-medium">{student.name}</span>
                <span className="text-sm text-gray-500">{student.grade}</span>
              </button>
            </form>
          </li>
        ))}
      </ul>

      {students?.length === 0 && (
        <p className="text-sm text-gray-500">
          まだ子どものプロファイルがありません。下のフォームから追加してください。
        </p>
      )}

      <NewStudentForm />
    </main>
  );
}

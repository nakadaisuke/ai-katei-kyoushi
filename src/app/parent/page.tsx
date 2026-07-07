import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";

export default async function ParentPage() {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id, name, grade")
    .order("created_at", { ascending: true });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">保護者ダッシュボード</h1>
        <form action={logout}>
          <button type="submit" className="text-sm text-gray-500 underline">
            ログアウト
          </button>
        </form>
      </div>

      {students?.length === 0 && (
        <p className="text-sm text-gray-500">
          まだ子どものプロファイルがありません。学習端末で先にプロファイルを作成してください。
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {students?.map((student) => (
          <li key={student.id}>
            <Link
              href={`/parent/${student.id}`}
              className="flex items-center justify-between rounded border px-4 py-3 hover:bg-gray-50"
            >
              <span className="font-medium">{student.name}</span>
              <span className="text-sm text-gray-500">{student.grade}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

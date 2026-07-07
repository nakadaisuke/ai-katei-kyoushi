"use client";

import { useActionState } from "react";
import { createStudent, type CreateStudentState } from "@/lib/actions/students";

const initialState: CreateStudentState = {};

const GRADE_OPTIONS = [
  "小学1年",
  "小学2年",
  "小学3年",
  "小学4年",
  "小学5年",
  "小学6年",
  "中学1年",
  "中学2年",
  "中学3年",
];

export function NewStudentForm() {
  const [state, action, pending] = useActionState(createStudent, initialState);

  return (
    <form action={action} className="flex flex-col gap-3 rounded border p-4">
      <h2 className="font-semibold">子どもプロファイルを追加</h2>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">名前</span>
        <input name="name" required className="rounded border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">学年</span>
        <select
          name="grade"
          defaultValue="小学3年"
          className="rounded border px-3 py-2"
        >
          {GRADE_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-50"
      >
        {pending ? "作成中..." : "追加する"}
      </button>
    </form>
  );
}

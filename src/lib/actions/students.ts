"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ACTIVE_STUDENT_COOKIE } from "@/lib/constants";

export interface CreateStudentState {
  error?: string;
}

export async function createStudent(
  _state: CreateStudentState,
  formData: FormData,
): Promise<CreateStudentState> {
  const name = String(formData.get("name") ?? "").trim();
  const grade = String(formData.get("grade") ?? "").trim();

  if (!name || !grade) {
    return { error: "名前と学年を入力してください。" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("students")
    .insert({ parent_id: user.id, name, grade });

  if (error) {
    return { error: "プロファイルの作成に失敗しました。" };
  }

  revalidatePath("/profiles");
  return {};
}

export async function selectStudent(studentId: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_STUDENT_COOKIE, studentId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  redirect("/");
}

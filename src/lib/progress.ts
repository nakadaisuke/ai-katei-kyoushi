import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type { Chapter } from "@/lib/types";

type Client = SupabaseClient<Database>;
export type AttemptRow = Database["public"]["Tables"]["attempts"]["Row"];

export interface RecordAttemptInput {
  studentId: string;
  chapterId: string;
  problemId: string;
  studentAnswer: string;
  correct: boolean;
  usedHintLevels: number;
  requestedReexplain: boolean;
  durationMs: number;
}

export async function recordAttempt(client: Client, input: RecordAttemptInput) {
  const { error } = await client.from("attempts").insert({
    student_id: input.studentId,
    chapter_id: input.chapterId,
    problem_id: input.problemId,
    student_answer: input.studentAnswer,
    correct: input.correct,
    used_hint_levels: input.usedHintLevels,
    requested_reexplain: input.requestedReexplain,
    duration_ms: input.durationMs,
  });
  if (error) throw error;
}

export async function markChapterComplete(
  client: Client,
  studentId: string,
  chapterId: string,
) {
  const { error } = await client
    .from("chapter_progress")
    .upsert(
      { student_id: studentId, chapter_id: chapterId, completed_at: new Date().toISOString() },
      { onConflict: "student_id,chapter_id" },
    );
  if (error) throw error;
}

export async function fetchAttempts(
  client: Client,
  studentId: string,
  chapterId?: string,
): Promise<AttemptRow[]> {
  let query = client
    .from("attempts")
    .select("*")
    .eq("student_id", studentId)
    .order("created_at", { ascending: true });

  if (chapterId) {
    query = query.eq("chapter_id", chapterId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchChapterProgress(
  client: Client,
  studentId: string,
  chapterId: string,
) {
  const { data, error } = await client
    .from("chapter_progress")
    .select("completed_at")
    .eq("student_id", studentId)
    .eq("chapter_id", chapterId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export interface TagStat {
  tag: string;
  correct: number;
  total: number;
}

export function summarizeTagStats(attempts: AttemptRow[], chapter: Chapter): TagStat[] {
  const problemById = new Map(chapter.problems.map((p) => [p.id, p]));
  const stats = new Map<string, TagStat>();

  for (const attempt of attempts) {
    const problem = problemById.get(attempt.problem_id);
    if (!problem) continue;
    for (const tag of problem.tags) {
      const existing = stats.get(tag) ?? { tag, correct: 0, total: 0 };
      existing.total += 1;
      if (attempt.correct) existing.correct += 1;
      stats.set(tag, existing);
    }
  }

  return [...stats.values()].sort((a, b) => a.correct / a.total - b.correct / b.total);
}

export function latestAttemptPerProblem(attempts: AttemptRow[]): Map<string, AttemptRow> {
  const map = new Map<string, AttemptRow>();
  for (const attempt of attempts) {
    map.set(attempt.problem_id, attempt);
  }
  return map;
}

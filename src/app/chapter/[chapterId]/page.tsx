import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getChapter } from "@/content/chapters/g3-division";
import { ACTIVE_STUDENT_COOKIE } from "@/lib/constants";
import { ChapterView } from "./ChapterView";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const cookieStore = await cookies();
  const studentId = cookieStore.get(ACTIVE_STUDENT_COOKIE)?.value;

  if (!studentId) {
    redirect("/profiles");
  }

  const chapter = getChapter(chapterId);
  if (!chapter) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-4 px-4 py-12">
      <ChapterView chapter={chapter} studentId={studentId} />
    </main>
  );
}

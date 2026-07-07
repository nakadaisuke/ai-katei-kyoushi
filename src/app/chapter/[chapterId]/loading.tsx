export default function ChapterLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 px-4 py-12">
      <div className="h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-[#2c2c2a]" />
      <div className="flex flex-col gap-4 rounded border p-6">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-[#2c2c2a]" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-[#2c2c2a]" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-[#2c2c2a]" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-[#2c2c2a]" />
        <p className="text-sm text-gray-400">読み込み中...</p>
      </div>
    </main>
  );
}

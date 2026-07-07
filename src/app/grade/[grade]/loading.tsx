export default function GradeUnitsLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 py-12">
      <div className="h-7 w-56 animate-pulse rounded bg-gray-200 dark:bg-[#2c2c2a]" />
      <ul className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex flex-col gap-2 rounded border p-4">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-[#2c2c2a]" />
            <div className="h-2 w-full animate-pulse rounded bg-gray-200 dark:bg-[#2c2c2a]" />
          </li>
        ))}
      </ul>
    </main>
  );
}

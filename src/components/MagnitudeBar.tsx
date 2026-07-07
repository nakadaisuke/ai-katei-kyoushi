export function MagnitudeBar({
  label,
  valueLabel,
  ratio,
}: {
  label: string;
  valueLabel: string;
  ratio: number;
}) {
  const pct = Math.round(Math.min(Math.max(ratio, 0), 1) * 100);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#0b0b0b] dark:text-white">{label}</span>
        <span className="text-[#52514e] dark:text-[#c3c2b7]">{valueLabel}</span>
      </div>
      <div className="h-2 w-full rounded bg-[#e1e0d9] dark:bg-[#2c2c2a]">
        <div
          className="h-2 rounded bg-[#2a78d6] dark:bg-[#3987e5]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

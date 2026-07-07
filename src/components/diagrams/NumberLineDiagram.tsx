// 数直線の図。majorStepごとに目盛りと数値を、minorStepがあればその間の小さい目盛りも描く。
// markersは、valueで実際の位置に矢印を立てつつ、表示するのはlabel（"ア"など）のみにして
// 答えの数値を見せない（BarChartDiagramが棒に数値ラベルを付けない設計と同じ考え方）。
export function NumberLineDiagram({
  min,
  max,
  majorStep,
  minorStep,
  markers,
}: {
  min: number;
  max: number;
  majorStep: number;
  minorStep?: number;
  markers?: { value: number; label: string }[];
}) {
  const width = 320;
  const paddingX = 24;
  const lineY = 46;
  const usableWidth = width - paddingX * 2;
  const span = max - min || 1;
  const height = 92;

  function xForValue(value: number) {
    return paddingX + ((value - min) / span) * usableWidth;
  }

  function ticksFor(step: number) {
    const values: number[] = [];
    const count = Math.round((max - min) / step);
    for (let i = 0; i <= count; i++) {
      values.push(Math.round((min + i * step) * 1e6) / 1e6);
    }
    return values;
  }

  const majorTicks = ticksFor(majorStep);
  const minorTicks = minorStep ? ticksFor(minorStep) : [];

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label="数直線の図"
      >
        <line
          x1={paddingX}
          y1={lineY}
          x2={width - paddingX}
          y2={lineY}
          className="stroke-[#c3c2b7] dark:stroke-[#383835]"
          strokeWidth={1.5}
        />

        {minorTicks.map((v) => (
          <line
            key={`minor-${v}`}
            x1={xForValue(v)}
            y1={lineY - 4}
            x2={xForValue(v)}
            y2={lineY + 4}
            className="stroke-[#e1e0d9] dark:stroke-[#2c2c2a]"
            strokeWidth={1}
          />
        ))}

        {majorTicks.map((v) => (
          <g key={`major-${v}`}>
            <line
              x1={xForValue(v)}
              y1={lineY - 8}
              x2={xForValue(v)}
              y2={lineY + 8}
              className="stroke-[#c3c2b7] dark:stroke-[#383835]"
              strokeWidth={1.5}
            />
            <text
              x={xForValue(v)}
              y={lineY + 24}
              textAnchor="middle"
              className="fill-[#898781] text-[10px]"
            >
              {v}
            </text>
          </g>
        ))}

        {markers?.map((m) => (
          <g key={m.label}>
            <line
              x1={xForValue(m.value)}
              y1={lineY + 12}
              x2={xForValue(m.value)}
              y2={lineY - 16}
              className="stroke-[#eda100] dark:stroke-[#c98500]"
              strokeWidth={2}
            />
            <text
              x={xForValue(m.value)}
              y={lineY - 22}
              textAnchor="middle"
              className="fill-[#b06f00] text-[12px] font-semibold dark:fill-[#eda100]"
            >
              {m.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="text-xs text-[#898781]">数直線</figcaption>
    </figure>
  );
}

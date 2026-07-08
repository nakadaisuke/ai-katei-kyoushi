// 折れ線グラフの単元用の図。棒グラフと同じく、あえて点の上に数値ラベルは
// 付けない（目盛りを読んで値を答えさせるのがこの単元の目的のため）。
export function LineGraphDiagram({
  unit,
  maxValue,
  yLabels,
  points,
}: {
  unit: string;
  maxValue: number;
  yLabels: number[];
  points: { label: string; value: number }[];
}) {
  const spacing = 46;
  const plotHeight = 200;
  const plotTop = 10;
  const plotLeft = 40;
  const width = plotLeft + 20 + (points.length - 1) * spacing + 30;
  const height = plotTop + plotHeight + 30;

  function yToPixel(value: number) {
    return plotTop + plotHeight - (value / maxValue) * plotHeight;
  }
  function xToPixel(i: number) {
    return plotLeft + 20 + i * spacing;
  }

  const linePoints = points.map((p, i) => `${xToPixel(i)},${yToPixel(p.value)}`).join(" ");

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`折れ線グラフ（単位：${unit}）`}
      >
        {yLabels.map((yLabel) => (
          <g key={yLabel}>
            <line
              x1={plotLeft}
              y1={yToPixel(yLabel)}
              x2={width - 10}
              y2={yToPixel(yLabel)}
              className="stroke-[#e1e0d9] dark:stroke-[#2c2c2a]"
              strokeWidth={1}
            />
            <text
              x={plotLeft - 6}
              y={yToPixel(yLabel) + 4}
              textAnchor="end"
              className="fill-[#898781] text-[10px]"
            >
              {yLabel}
            </text>
          </g>
        ))}
        <line
          x1={plotLeft}
          y1={plotTop}
          x2={plotLeft}
          y2={plotTop + plotHeight}
          className="stroke-[#c3c2b7] dark:stroke-[#383835]"
          strokeWidth={1.5}
        />
        <line
          x1={plotLeft}
          y1={plotTop + plotHeight}
          x2={width - 10}
          y2={plotTop + plotHeight}
          className="stroke-[#c3c2b7] dark:stroke-[#383835]"
          strokeWidth={1.5}
        />
        <polyline
          points={linePoints}
          className="fill-none stroke-[#2a78d6] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />
        {points.map((p, i) => (
          <g key={p.label}>
            <circle
              cx={xToPixel(i)}
              cy={yToPixel(p.value)}
              r={3}
              className="fill-[#2a78d6] dark:fill-[#3987e5]"
            />
            <text
              x={xToPixel(i)}
              y={plotTop + plotHeight + 16}
              textAnchor="middle"
              className="fill-[#0b0b0b] text-[10px] dark:fill-white"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="text-xs text-[#898781]">単位：{unit}</figcaption>
    </figure>
  );
}

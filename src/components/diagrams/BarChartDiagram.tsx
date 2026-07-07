// 棒グラフの読み取り問題用の図。あえて棒の上に数値ラベルは付けない
// （目盛りを読んで人数を答えさせるのがこの単元の目的のため）。
export function BarChartDiagram({
  unit,
  maxValue,
  yLabels,
  bars,
}: {
  unit: string;
  maxValue: number;
  yLabels: number[];
  bars: { label: string; value: number }[];
}) {
  const width = 60 + bars.length * 60;
  const plotHeight = 200;
  const plotTop = 10;
  const plotLeft = 40;
  const height = plotTop + plotHeight + 30;

  function yToPixel(value: number) {
    return plotTop + plotHeight - (value / maxValue) * plotHeight;
  }

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`棒グラフ（単位：${unit}）`}
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
        {bars.map((bar, i) => {
          const barWidth = 36;
          const x = plotLeft + 20 + i * 60;
          const y = yToPixel(bar.value);
          return (
            <g key={bar.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={plotTop + plotHeight - y}
                rx={2}
                className="fill-[#2a78d6] dark:fill-[#3987e5]"
              />
              <text
                x={x + barWidth / 2}
                y={plotTop + plotHeight + 16}
                textAnchor="middle"
                className="fill-[#0b0b0b] text-[11px] dark:fill-white"
              >
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="text-xs text-[#898781]">単位：{unit}</figcaption>
    </figure>
  );
}

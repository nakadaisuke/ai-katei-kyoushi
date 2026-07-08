// 分配法則（計算のくふう）の単元用の図。大きい長方形を splitFactor の比で2つに分け、
// それぞれに otherFactor をかけた面積（式）を添える面積図
// （例：109×8 を (100+9)×8 = 100×8 + 9×8 として見せる）。
// 実際の比率ではなく、両方が見やすい最小幅を確保した模式図として描く。
export function AreaModelDiagram({
  splitFactor,
  otherFactor,
}: {
  splitFactor: [number, number];
  otherFactor: number;
}) {
  const [a, b] = splitFactor;
  const total = a + b;
  const totalWidth = 200;
  const minSegWidth = 60;
  const rawA = (a / total) * totalWidth;
  const rawB = totalWidth - rawA;
  // 小さい側が読めなくなるほど細くならないよう、最小幅を確保して正規化する
  const segAWidth = Math.max(minSegWidth, rawA);
  const segBWidth = Math.max(minSegWidth, rawB);
  const scaledTotalWidth = segAWidth + segBWidth;

  const height = 70;
  const leftPad = 28;
  const topPad = 26;
  const width = scaledTotalWidth + leftPad * 2;
  const svgHeight = topPad + height + 30;

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${svgHeight}`}
        width={width}
        height={svgHeight}
        role="img"
        aria-label={`(${a}+${b})×${otherFactor} の面積図`}
      >
        <text
          x={leftPad + scaledTotalWidth / 2}
          y={16}
          textAnchor="middle"
          className="fill-[#0b0b0b] text-[12px] dark:fill-white"
        >
          {a} + {b}
        </text>

        <rect
          x={leftPad}
          y={topPad}
          width={segAWidth}
          height={height}
          className="fill-[#eef3fb] stroke-[#2a78d6] dark:fill-[#20242b] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />
        <rect
          x={leftPad + segAWidth}
          y={topPad}
          width={segBWidth}
          height={height}
          className="fill-[#fdecd2] stroke-[#eda100] dark:fill-[#2b2413] dark:stroke-[#c98500]"
          strokeWidth={2}
        />

        <text
          x={leftPad + segAWidth / 2}
          y={topPad + height / 2 - 6}
          textAnchor="middle"
          className="fill-[#0b0b0b] text-[13px] font-semibold dark:fill-white"
        >
          {a} × {otherFactor}
        </text>
        <text
          x={leftPad + segAWidth / 2}
          y={topPad + height / 2 + 12}
          textAnchor="middle"
          className="fill-[#0b0b0b] text-[13px] dark:fill-white"
        >
          {a * otherFactor}
        </text>

        <text
          x={leftPad + segAWidth + segBWidth / 2}
          y={topPad + height / 2 - 6}
          textAnchor="middle"
          className="fill-[#0b0b0b] text-[13px] font-semibold dark:fill-white"
        >
          {b} × {otherFactor}
        </text>
        <text
          x={leftPad + segAWidth + segBWidth / 2}
          y={topPad + height / 2 + 12}
          textAnchor="middle"
          className="fill-[#0b0b0b] text-[13px] dark:fill-white"
        >
          {b * otherFactor}
        </text>

        <text
          x={leftPad - 6}
          y={topPad + height / 2}
          textAnchor="end"
          dominantBaseline="middle"
          className="fill-[#898781] text-[12px]"
        >
          {otherFactor}
        </text>

        <text
          x={leftPad + scaledTotalWidth / 2}
          y={topPad + height + 20}
          textAnchor="middle"
          className="fill-[#0b0b0b] text-[13px] dark:fill-white"
        >
          {a + b} × {otherFactor} = {a * otherFactor} + {b * otherFactor} = {(a + b) * otherFactor}
        </text>
      </svg>
      <figcaption className="text-xs text-[#898781]">面積図で見る計算のくふう</figcaption>
    </figure>
  );
}

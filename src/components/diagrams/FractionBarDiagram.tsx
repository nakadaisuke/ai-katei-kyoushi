// 分数の単元用の図。長方形をdenominator等分し、numeratorぶんを左から塗った帯を描く。
// numerator > denominator（仮分数・帯分数）のときは、帯を複数本に分けて表す
// （教科書でよく使われる「同じ長さの帯を必要な本数だけ並べる」表現）。
export function FractionBarDiagram({
  numerator,
  denominator,
}: {
  numerator: number;
  denominator: number;
}) {
  const barCount = Math.max(1, Math.ceil(numerator / denominator));
  const barWidth = 180;
  const barHeight = 32;
  const gapY = 14;
  const leftPad = 10;
  const width = barWidth + leftPad * 2;
  const height = barCount * barHeight + (barCount - 1) * gapY + 20;
  const segW = barWidth / denominator;

  let remaining = numerator;
  const bars = Array.from({ length: barCount }).map((_, barIdx) => {
    const shaded = Math.max(0, Math.min(denominator, remaining));
    remaining -= shaded;
    return { y: 10 + barIdx * (barHeight + gapY), shaded };
  });

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`${numerator}/${denominator}を表す帯の図`}
      >
        {bars.map((bar, barIdx) => (
          <g key={barIdx}>
            {Array.from({ length: denominator }).map((_, segIdx) => (
              <rect
                key={segIdx}
                x={leftPad + segIdx * segW}
                y={bar.y}
                width={segW}
                height={barHeight}
                className={
                  segIdx < bar.shaded
                    ? "fill-[#2a78d6] dark:fill-[#3987e5] stroke-[#c3c2b7] dark:stroke-[#383835]"
                    : "fill-[#fcfcfb] dark:fill-[#1a1a19] stroke-[#c3c2b7] dark:stroke-[#383835]"
                }
                strokeWidth={1}
              />
            ))}
            <rect
              x={leftPad}
              y={bar.y}
              width={barWidth}
              height={barHeight}
              className="fill-none stroke-[#2a78d6] dark:stroke-[#3987e5]"
              strokeWidth={2}
            />
          </g>
        ))}
      </svg>
      <figcaption className="text-xs text-[#898781]">
        {numerator}/{denominator}
      </figcaption>
    </figure>
  );
}

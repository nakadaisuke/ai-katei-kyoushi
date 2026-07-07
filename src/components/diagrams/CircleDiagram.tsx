// 円と球の単元用の図。中心・半径・（あれば）直径を描画する。
export function CircleDiagram({
  centerLabel,
  radiusLabel,
  showDiameter,
  diameterLabel,
}: {
  centerLabel?: string;
  radiusLabel?: string;
  showDiameter?: boolean;
  diameterLabel?: string;
}) {
  const width = 200;
  const height = 200;
  const cx = 100;
  const cy = 100;
  const r = 72;

  const radiusAngle = -45 * (Math.PI / 180);
  const radiusEnd = {
    x: cx + r * Math.cos(radiusAngle),
    y: cy + r * Math.sin(radiusAngle),
  };
  const radiusMid = { x: (cx + radiusEnd.x) / 2, y: (cy + radiusEnd.y) / 2 };

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label="円の図（中心・半径・直径）"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          className="fill-none stroke-[#2a78d6] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />

        {showDiameter && (
          <>
            <line
              x1={cx - r}
              y1={cy}
              x2={cx + r}
              y2={cy}
              className="stroke-[#c3c2b7] dark:stroke-[#383835]"
              strokeWidth={1.5}
            />
            {diameterLabel && (
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                className="fill-[#0b0b0b] text-[12px] dark:fill-white"
              >
                {diameterLabel}
              </text>
            )}
          </>
        )}

        {radiusLabel && (
          <>
            <line
              x1={cx}
              y1={cy}
              x2={radiusEnd.x}
              y2={radiusEnd.y}
              className="stroke-[#c3c2b7] dark:stroke-[#383835]"
              strokeWidth={1.5}
            />
            <text
              x={radiusMid.x + 10}
              y={radiusMid.y - 6}
              textAnchor="middle"
              className="fill-[#0b0b0b] text-[12px] dark:fill-white"
            >
              {radiusLabel}
            </text>
          </>
        )}

        <circle cx={cx} cy={cy} r={3} className="fill-[#0b0b0b] dark:fill-white" />
        {centerLabel && (
          <text
            x={cx - 10}
            y={cy + 16}
            textAnchor="end"
            className="fill-[#898781] text-[12px]"
          >
            {centerLabel}
          </text>
        )}
      </svg>
      <figcaption className="text-xs text-[#898781]">円の図</figcaption>
    </figure>
  );
}

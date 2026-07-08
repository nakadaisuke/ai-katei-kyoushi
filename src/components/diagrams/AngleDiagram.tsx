// 角の大きさの単元用の図。頂点から2本の辺（半直線）を伸ばし、その間の角度の
// 大きさぶんだけ弧を描く模式図。1本目の辺は水平右向きに固定し、2本目の辺を
// angleDegreesの分だけ反時計回りに傾ける。
export function AngleDiagram({
  angleDegrees,
  label,
  rayLabels,
}: {
  angleDegrees: number;
  label?: string;
  rayLabels?: [string, string];
}) {
  const width = 200;
  const height = 160;
  const vertex = { x: 40, y: 140 };
  const rayLength = 130;
  const arcRadius = 32;

  const startAngle = 0;
  const endAngle = -angleDegrees;

  function pointAt(deg: number, r: number) {
    const rad = (deg * Math.PI) / 180;
    return { x: vertex.x + r * Math.cos(rad), y: vertex.y + r * Math.sin(rad) };
  }

  const rayEnd1 = pointAt(startAngle, rayLength);
  const rayEnd2 = pointAt(endAngle, rayLength);
  const arcStart = pointAt(startAngle, arcRadius);
  const arcEnd = pointAt(endAngle, arcRadius);
  const largeArcFlag = angleDegrees > 180 ? 1 : 0;
  const midAngle = (startAngle + endAngle) / 2;
  const labelPos = pointAt(midAngle, arcRadius + 18);

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`角の図${label ? `（${label}）` : ""}`}
      >
        <line
          x1={vertex.x}
          y1={vertex.y}
          x2={rayEnd1.x}
          y2={rayEnd1.y}
          className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />
        <line
          x1={vertex.x}
          y1={vertex.y}
          x2={rayEnd2.x}
          y2={rayEnd2.y}
          className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />
        <path
          d={`M ${arcStart.x} ${arcStart.y} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${arcEnd.x} ${arcEnd.y}`}
          className="fill-none stroke-[#eda100] dark:stroke-[#c98500]"
          strokeWidth={1.5}
        />
        <circle cx={vertex.x} cy={vertex.y} r={2.5} className="fill-[#0b0b0b] dark:fill-white" />
        {label && (
          <text
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#0b0b0b] text-[13px] dark:fill-white"
          >
            {label}
          </text>
        )}
        {rayLabels && (
          <>
            <text
              x={rayEnd1.x + 6}
              y={rayEnd1.y}
              textAnchor="start"
              dominantBaseline="middle"
              className="fill-[#898781] text-[12px]"
            >
              {rayLabels[0]}
            </text>
            <text
              x={rayEnd2.x + (rayEnd2.x >= vertex.x ? 6 : -6)}
              y={rayEnd2.y - 4}
              textAnchor={rayEnd2.x >= vertex.x ? "start" : "end"}
              dominantBaseline="middle"
              className="fill-[#898781] text-[12px]"
            >
              {rayLabels[1]}
            </text>
          </>
        )}
      </svg>
      <figcaption className="text-xs text-[#898781]">角の図</figcaption>
    </figure>
  );
}

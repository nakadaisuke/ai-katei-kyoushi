// 三角形の分類問題用の図。実際の長さの比率には忠実でない模式図（教科書の作図と同じく、
// 辺の長さの数値と、等しい辺を示すチックマークを読み取らせるための図）。
// 頂点はA=上, B=左下, C=右下で固定し、辺の並びは[A-B, B-C, C-A]に対応する。
export function TriangleDiagram({
  sideLabels,
  equalMarks,
  vertexLabels,
}: {
  sideLabels: [string, string, string];
  equalMarks: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
  vertexLabels?: [string, string, string];
}) {
  const width = 200;
  const height = 180;
  const A = { x: 100, y: 20 };
  const B = { x: 20, y: 160 };
  const C = { x: 180, y: 160 };
  const centroid = {
    x: (A.x + B.x + C.x) / 3,
    y: (A.y + B.y + C.y) / 3,
  };

  const sides = [
    { from: A, to: B, label: sideLabels[0], marks: equalMarks[0] },
    { from: B, to: C, label: sideLabels[1], marks: equalMarks[1] },
    { from: C, to: A, label: sideLabels[2], marks: equalMarks[2] },
  ];

  function outward(px: number, py: number, distance: number) {
    const dx = px - centroid.x;
    const dy = py - centroid.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: px + (dx / len) * distance, y: py + (dy / len) * distance };
  }

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`三角形の図（辺の長さ：${sideLabels.join("・")}）`}
      >
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          className="fill-[#fcfcfb] stroke-[#2a78d6] dark:fill-[#1a1a19] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />

        {sides.map((side, i) => {
          const mx = (side.from.x + side.to.x) / 2;
          const my = (side.from.y + side.to.y) / 2;
          const dx = side.to.x - side.from.x;
          const dy = side.to.y - side.from.y;
          const len = Math.hypot(dx, dy) || 1;
          const tx = dx / len;
          const ty = dy / len;
          const nx = -ty;
          const ny = tx;
          const tickLen = 9;
          const labelPos = outward(mx, my, 20);

          const tickOffsets = side.marks === 2 ? [-4, 4] : side.marks === 1 ? [0] : [];

          return (
            <g key={i}>
              {tickOffsets.map((offset, tIdx) => {
                const px = mx + tx * offset;
                const py = my + ty * offset;
                return (
                  <line
                    key={tIdx}
                    x1={px - nx * (tickLen / 2)}
                    y1={py - ny * (tickLen / 2)}
                    x2={px + nx * (tickLen / 2)}
                    y2={py + ny * (tickLen / 2)}
                    className="stroke-[#eda100] dark:stroke-[#c98500]"
                    strokeWidth={2}
                  />
                );
              })}
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[#0b0b0b] text-[13px] dark:fill-white"
              >
                {side.label}
              </text>
            </g>
          );
        })}

        {vertexLabels && (
          <>
            {[A, B, C].map((v, i) => {
              const pos = outward(v.x, v.y, 14);
              return (
                <text
                  key={i}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-[#898781] text-[12px]"
                >
                  {vertexLabels[i]}
                </text>
              );
            })}
          </>
        )}
      </svg>
      <figcaption className="text-xs text-[#898781]">三角形の図</figcaption>
    </figure>
  );
}

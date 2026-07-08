// 三角形の分類問題用の図。頂点はA=上, B=左下, C=右下に対応し、辺の並びは
// [A-B, B-C, C-A]に対応する。anglesを渡すと、その実際の角度に応じた形（直角三角形なら
// 直角三角形らしい形、二等辺三角形ならその通りの見た目）で描画する。anglesを渡さない
// ときは、角度に忠実でない模式図（教科書の作図と同じく、辺の長さの数値と、等しい辺を
// 示すチックマークだけを読み取らせるための図）として、固定のバランスの取れた三角形を使う。
type Point = { x: number; y: number };

const DEFAULT_VERTICES: [Point, Point, Point] = [
  { x: 100, y: 20 },
  { x: 20, y: 160 },
  { x: 180, y: 160 },
];

function computeVerticesFromAngles(angles: [number, number, number]): [Point, Point, Point] {
  const [angleA, angleB, angleC] = angles.map((d) => (d * Math.PI) / 180);
  const L = 1;
  const B = { x: 0, y: 0 };
  const C = { x: L, y: 0 };
  const t = (L * Math.sin(angleC)) / Math.sin(angleA);
  const A = { x: t * Math.cos(angleB), y: t * Math.sin(angleB) };

  const xs = [A.x, B.x, C.x];
  const ys = [A.y, B.y, C.y];
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const rawWidth = maxX - minX || 1;
  const rawHeight = maxY - minY || 1;

  const targetWidth = 150;
  const targetHeight = 130;
  const fitScale = Math.min(targetWidth / rawWidth, targetHeight / rawHeight);

  function toSvg(p: Point): Point {
    return {
      x: 100 + (p.x - (minX + maxX) / 2) * fitScale,
      y: 165 - (p.y - minY) * fitScale,
    };
  }

  return [toSvg(A), toSvg(B), toSvg(C)];
}

export function TriangleDiagram({
  sideLabels,
  equalMarks,
  vertexLabels,
  angleLabels,
  rightAngleAt,
  angles,
}: {
  sideLabels: [string, string, string];
  equalMarks: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
  vertexLabels?: [string, string, string];
  angleLabels?: [string, string, string];
  rightAngleAt?: [boolean, boolean, boolean];
  // A, B, Cの実際の内角（度）。指定すると、その角度どおりの形の三角形を描画する。
  angles?: [number, number, number];
}) {
  const width = 200;
  const height = 180;
  const [A, B, C] = angles ? computeVerticesFromAngles(angles) : DEFAULT_VERTICES;
  const vertices = [A, B, C];
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

  function inward(px: number, py: number, distance: number) {
    return outward(px, py, -distance);
  }

  function sub(p: Point, q: Point) {
    return { x: p.x - q.x, y: p.y - q.y };
  }
  function norm(v: Point) {
    const len = Math.hypot(v.x, v.y) || 1;
    return { x: v.x / len, y: v.y / len };
  }
  function add(p: Point, q: Point) {
    return { x: p.x + q.x, y: p.y + q.y };
  }
  function scale(v: Point, s: number) {
    return { x: v.x * s, y: v.y * s };
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

        {rightAngleAt &&
          vertices.map((v, i) => {
            if (!rightAngleAt[i]) return null;
            const prev = vertices[(i + 2) % 3];
            const next = vertices[(i + 1) % 3];
            const d1 = norm(sub(prev, v));
            const d2 = norm(sub(next, v));
            const size = 14;
            const p1 = add(v, scale(d1, size));
            const p2 = add(v, scale(d2, size));
            const corner = add(p1, sub(p2, v));
            return (
              <path
                key={`right-${i}`}
                d={`M ${p1.x} ${p1.y} L ${corner.x} ${corner.y} L ${p2.x} ${p2.y}`}
                className="fill-none stroke-[#eda100] dark:stroke-[#c98500]"
                strokeWidth={1.5}
              />
            );
          })}

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

        {vertexLabels &&
          vertices.map((v, i) => {
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

        {angleLabels &&
          vertices.map((v, i) => {
            if (!angleLabels[i]) return null;
            const pos = inward(v.x, v.y, 26);
            return (
              <text
                key={`angle-${i}`}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[#0b0b0b] text-[13px] font-semibold dark:fill-white"
              >
                {angleLabels[i]}
              </text>
            );
          })}
      </svg>
      <figcaption className="text-xs text-[#898781]">三角形の図</figcaption>
    </figure>
  );
}

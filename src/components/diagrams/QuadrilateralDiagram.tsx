// 四角形（垂直・平行と四角形）の単元用の図。実際の長さの比率には忠実でない模式図
// （教科書の作図と同じく、直角マーク・平行マーク・等しい辺のチックマークを
// 読み取らせるための図）。頂点は時計回りにA,B,C,Dで固定する。
export type QuadrilateralShape = "rectangle" | "square" | "rhombus" | "parallelogram" | "trapezoid";

type Point = { x: number; y: number };

const SHAPES: Record<QuadrilateralShape, [Point, Point, Point, Point]> = {
  rectangle: [
    { x: 30, y: 40 },
    { x: 170, y: 40 },
    { x: 170, y: 120 },
    { x: 30, y: 120 },
  ],
  square: [
    { x: 50, y: 30 },
    { x: 150, y: 30 },
    { x: 150, y: 130 },
    { x: 50, y: 130 },
  ],
  rhombus: [
    { x: 100, y: 20 },
    { x: 170, y: 90 },
    { x: 100, y: 160 },
    { x: 30, y: 90 },
  ],
  parallelogram: [
    { x: 60, y: 30 },
    { x: 180, y: 30 },
    { x: 140, y: 130 },
    { x: 20, y: 130 },
  ],
  trapezoid: [
    { x: 70, y: 30 },
    { x: 130, y: 30 },
    { x: 170, y: 130 },
    { x: 30, y: 130 },
  ],
};

const RIGHT_ANGLE_SHAPES = new Set<QuadrilateralShape>(["rectangle", "square"]);

function sub(a: Point, b: Point): Point {
  return { x: a.x - b.x, y: a.y - b.y };
}
function norm(v: Point): Point {
  const len = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / len, y: v.y / len };
}
function scale(v: Point, s: number): Point {
  return { x: v.x * s, y: v.y * s };
}
function add(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function QuadrilateralDiagram({
  shape,
  vertexLabels,
  sideLabels,
  equalMarks,
  parallelMarks,
  showRightAngles,
  showDiagonals,
}: {
  shape: QuadrilateralShape;
  vertexLabels?: [string, string, string, string];
  sideLabels?: [string, string, string, string];
  equalMarks?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
  parallelMarks?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
  showRightAngles?: boolean;
  showDiagonals?: boolean;
}) {
  const width = 200;
  const height = 180;
  const vertices = SHAPES[shape];
  const centroid = {
    x: vertices.reduce((s, v) => s + v.x, 0) / 4,
    y: vertices.reduce((s, v) => s + v.y, 0) / 4,
  };

  function outward(p: Point, distance: number): Point {
    const d = norm(sub(p, centroid));
    return add(p, scale(d, distance));
  }

  const sides = [0, 1, 2, 3].map((i) => ({
    from: vertices[i],
    to: vertices[(i + 1) % 4],
    label: sideLabels?.[i],
    equal: equalMarks?.[i] ?? 0,
    parallel: parallelMarks?.[i] ?? 0,
  }));

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label="四角形の図"
      >
        <polygon
          points={vertices.map((v) => `${v.x},${v.y}`).join(" ")}
          className="fill-[#fcfcfb] stroke-[#2a78d6] dark:fill-[#1a1a19] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />

        {showDiagonals && (
          <>
            <line
              x1={vertices[0].x}
              y1={vertices[0].y}
              x2={vertices[2].x}
              y2={vertices[2].y}
              className="stroke-[#c3c2b7] dark:stroke-[#383835]"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
            <line
              x1={vertices[1].x}
              y1={vertices[1].y}
              x2={vertices[3].x}
              y2={vertices[3].y}
              className="stroke-[#c3c2b7] dark:stroke-[#383835]"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
          </>
        )}

        {showRightAngles &&
          RIGHT_ANGLE_SHAPES.has(shape) &&
          vertices.map((v, i) => {
            const prev = vertices[(i + 3) % 4];
            const next = vertices[(i + 1) % 4];
            const d1 = norm(sub(prev, v));
            const d2 = norm(sub(next, v));
            const size = 12;
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
          const dir = norm(sub(side.to, side.from));
          const perp = { x: -dir.y, y: dir.x };
          const mid = { x: (side.from.x + side.to.x) / 2, y: (side.from.y + side.to.y) / 2 };

          const tickOffsets = side.equal === 2 ? [-4, 4] : side.equal === 1 ? [0] : [];
          const tickLen = 8;

          const chevronCount = side.parallel;
          const chevronOffsets =
            chevronCount === 2 ? [-6, 6] : chevronCount === 1 ? [0] : [];
          const chevronSize = 6;

          const labelPos = side.label ? outward(mid, 16) : null;

          return (
            <g key={i}>
              {tickOffsets.map((offset, tIdx) => {
                const px = mid.x + dir.x * offset;
                const py = mid.y + dir.y * offset;
                return (
                  <line
                    key={tIdx}
                    x1={px - perp.x * (tickLen / 2)}
                    y1={py - perp.y * (tickLen / 2)}
                    x2={px + perp.x * (tickLen / 2)}
                    y2={py + perp.y * (tickLen / 2)}
                    className="stroke-[#eda100] dark:stroke-[#c98500]"
                    strokeWidth={2}
                  />
                );
              })}
              {chevronOffsets.map((offset, cIdx) => {
                const cx = mid.x + dir.x * offset;
                const cy = mid.y + dir.y * offset;
                const back = scale(dir, -4);
                const tip = add({ x: cx, y: cy }, scale(dir, chevronSize * 0.5));
                const p1 = add(add({ x: cx, y: cy }, back), scale(perp, chevronSize * 0.5));
                const p2 = add(add({ x: cx, y: cy }, back), scale(perp, -chevronSize * 0.5));
                return (
                  <path
                    key={cIdx}
                    d={`M ${p1.x} ${p1.y} L ${tip.x} ${tip.y} L ${p2.x} ${p2.y}`}
                    className="fill-none stroke-[#2a78d6] dark:stroke-[#3987e5]"
                    strokeWidth={1.5}
                  />
                );
              })}
              {labelPos && (
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-[#0b0b0b] text-[12px] dark:fill-white"
                >
                  {side.label}
                </text>
              )}
            </g>
          );
        })}

        {vertexLabels &&
          vertices.map((v, i) => {
            const pos = outward(v, 14);
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
      </svg>
      <figcaption className="text-xs text-[#898781]">四角形の図</figcaption>
    </figure>
  );
}

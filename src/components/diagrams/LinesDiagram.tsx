// 「垂直」「平行」の概念そのものを示す図。四角形とは切り離して、2本の直線の関係
// だけを見せる（教科書の定義図と同じ）。水平・垂直に寄せず斜めに配置することで、
// 「軸に対して垂直/平行」ではなく「2本の直線どうしの関係」であることを強調する。
export function LinesDiagram({ relation }: { relation: "perpendicular" | "parallel" }) {
  const width = 160;
  const height = 140;

  function pt(cx: number, cy: number, angleDeg: number, d: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + d * Math.cos(rad), y: cy - d * Math.sin(rad) };
  }

  if (relation === "perpendicular") {
    const cx = 80;
    const cy = 70;
    const len = 55;
    const angle1 = 20;
    const angle2 = angle1 + 90;
    const a1 = pt(cx, cy, angle1, len);
    const a2 = pt(cx, cy, angle1 + 180, len);
    const b1 = pt(cx, cy, angle2, len);
    const b2 = pt(cx, cy, angle2 + 180, len);

    const markSize = 14;
    const m1 = pt(cx, cy, angle1, markSize);
    const m2 = pt(cx, cy, angle2, markSize);
    const mCorner = { x: m1.x + (m2.x - cx), y: m1.y + (m2.y - cy) };

    return (
      <figure className="flex flex-col items-center gap-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label="垂直な2本の直線の図"
        >
          <line
            x1={a1.x}
            y1={a1.y}
            x2={a2.x}
            y2={a2.y}
            className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
            strokeWidth={2}
          />
          <line
            x1={b1.x}
            y1={b1.y}
            x2={b2.x}
            y2={b2.y}
            className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
            strokeWidth={2}
          />
          <path
            d={`M ${m1.x} ${m1.y} L ${mCorner.x} ${mCorner.y} L ${m2.x} ${m2.y}`}
            className="fill-none stroke-[#eda100] dark:stroke-[#c98500]"
            strokeWidth={1.5}
          />
        </svg>
        <figcaption className="text-xs text-[#898781]">垂直な2本の直線</figcaption>
      </figure>
    );
  }

  // 平行：斜めにそろえた2本の直線に、向きが同じであることを示す矢印マークを付ける
  const angle = 25;
  const len = 55;
  const line1Center = { x: 90, y: 45 };
  const line2Center = { x: 70, y: 95 };
  const l1a = pt(line1Center.x, line1Center.y, angle, len);
  const l1b = pt(line1Center.x, line1Center.y, angle + 180, len);
  const l2a = pt(line2Center.x, line2Center.y, angle, len);
  const l2b = pt(line2Center.x, line2Center.y, angle + 180, len);

  function chevron(center: { x: number; y: number }) {
    const dir = pt(0, 0, angle, 1);
    const perp = { x: -dir.y, y: dir.x };
    const size = 8;
    const tip = { x: center.x + dir.x * size, y: center.y + dir.y * size };
    const p1 = { x: center.x - dir.x * size + perp.x * size, y: center.y - dir.y * size + perp.y * size };
    const p2 = { x: center.x - dir.x * size - perp.x * size, y: center.y - dir.y * size - perp.y * size };
    return `M ${p1.x} ${p1.y} L ${tip.x} ${tip.y} L ${p2.x} ${p2.y}`;
  }

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label="平行な2本の直線の図"
      >
        <line
          x1={l1a.x}
          y1={l1a.y}
          x2={l1b.x}
          y2={l1b.y}
          className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />
        <line
          x1={l2a.x}
          y1={l2a.y}
          x2={l2b.x}
          y2={l2b.y}
          className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />
        <path
          d={chevron(line1Center)}
          className="fill-none stroke-[#eda100] dark:stroke-[#c98500]"
          strokeWidth={1.5}
        />
        <path
          d={chevron(line2Center)}
          className="fill-none stroke-[#eda100] dark:stroke-[#c98500]"
          strokeWidth={1.5}
        />
      </svg>
      <figcaption className="text-xs text-[#898781]">平行な2本の直線</figcaption>
    </figure>
  );
}

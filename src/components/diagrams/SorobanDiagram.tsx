// そろばんの単元用の図。1けたぶんの珠（5だま1こ・1だま4こ）と、
// それを分ける横ぼう（はり）を描く模式図。
export function SorobanDiagram() {
  const width = 120;
  const height = 210;
  const rodX = 60;
  const barY = 75;
  const beadRX = 24;
  const beadRY = 11;
  const fiveBeadY = 40;
  const oneBeadYs = [115, 140, 165, 190];

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label="そろばんの1けたぶんの図（上に5だま1こ、下に1だま4こ）"
      >
        <line
          x1={rodX}
          y1={15}
          x2={rodX}
          y2={height - 10}
          className="stroke-[#c3c2b7] dark:stroke-[#383835]"
          strokeWidth={2}
        />
        <line
          x1={8}
          y1={barY}
          x2={width - 8}
          y2={barY}
          className="stroke-[#898781]"
          strokeWidth={2}
        />
        <ellipse
          cx={rodX}
          cy={fiveBeadY}
          rx={beadRX}
          ry={beadRY}
          className="fill-[#2a78d6] dark:fill-[#3987e5]"
        />
        {oneBeadYs.map((y, i) => (
          <ellipse
            key={i}
            cx={rodX}
            cy={y}
            rx={beadRX}
            ry={beadRY}
            className="fill-[#eda100] dark:fill-[#c98500]"
          />
        ))}
      </svg>
      <figcaption className="text-xs text-[#898781]">
        そろばんの1けたぶん（上：5だま1こ、下：1だま4こ）
      </figcaption>
    </figure>
  );
}

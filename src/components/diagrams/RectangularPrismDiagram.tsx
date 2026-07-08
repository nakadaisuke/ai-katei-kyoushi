// 直方体・立方体の単元用の図。斜投影（見取図）で立体を描き、辺の長さラベルを
// たて・横・高さに添えられるようにする。
export function RectangularPrismDiagram({
  widthLabel,
  heightLabel,
  depthLabel,
  isCube,
}: {
  widthLabel?: string;
  heightLabel?: string;
  depthLabel?: string;
  isCube?: boolean;
}) {
  const w = isCube ? 90 : 110;
  const h = isCube ? 90 : 70;
  const depthOffset = 30;
  const originX = 46;
  const originY = 130;
  const width = 220;
  const height = 180;

  const frontBL = { x: originX, y: originY };
  const frontBR = { x: originX + w, y: originY };
  const frontTR = { x: originX + w, y: originY - h };
  const frontTL = { x: originX, y: originY - h };

  const backBL = { x: frontBL.x + depthOffset, y: frontBL.y - depthOffset };
  const backBR = { x: frontBR.x + depthOffset, y: frontBR.y - depthOffset };
  const backTR = { x: frontTR.x + depthOffset, y: frontTR.y - depthOffset };
  const backTL = { x: frontTL.x + depthOffset, y: frontTL.y - depthOffset };

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={isCube ? "立方体の見取図" : "直方体の見取図"}
      >
        <line
          x1={backBL.x}
          y1={backBL.y}
          x2={backBR.x}
          y2={backBR.y}
          strokeDasharray="3 3"
          className="stroke-[#c3c2b7] dark:stroke-[#383835]"
          strokeWidth={1.5}
        />
        <line
          x1={backBL.x}
          y1={backBL.y}
          x2={backTL.x}
          y2={backTL.y}
          strokeDasharray="3 3"
          className="stroke-[#c3c2b7] dark:stroke-[#383835]"
          strokeWidth={1.5}
        />
        <line
          x1={frontBL.x}
          y1={frontBL.y}
          x2={backBL.x}
          y2={backBL.y}
          strokeDasharray="3 3"
          className="stroke-[#c3c2b7] dark:stroke-[#383835]"
          strokeWidth={1.5}
        />

        <polygon
          points={`${frontTL.x},${frontTL.y} ${frontTR.x},${frontTR.y} ${backTR.x},${backTR.y} ${backTL.x},${backTL.y}`}
          className="fill-[#eef3fb] stroke-[#2a78d6] dark:fill-[#20242b] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />
        <polygon
          points={`${frontTR.x},${frontTR.y} ${frontBR.x},${frontBR.y} ${backBR.x},${backBR.y} ${backTR.x},${backTR.y}`}
          className="fill-[#e4ecf9] stroke-[#2a78d6] dark:fill-[#1d2128] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />
        <polygon
          points={`${frontBL.x},${frontBL.y} ${frontBR.x},${frontBR.y} ${frontTR.x},${frontTR.y} ${frontTL.x},${frontTL.y}`}
          className="fill-[#fcfcfb] stroke-[#2a78d6] dark:fill-[#1a1a19] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />

        {widthLabel && (
          <text
            x={(frontBL.x + frontBR.x) / 2}
            y={frontBL.y + 16}
            textAnchor="middle"
            className="fill-[#0b0b0b] text-[12px] dark:fill-white"
          >
            {widthLabel}
          </text>
        )}
        {heightLabel && (
          <text
            x={frontBL.x - 8}
            y={(frontBL.y + frontTL.y) / 2}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-[#0b0b0b] text-[12px] dark:fill-white"
          >
            {heightLabel}
          </text>
        )}
        {depthLabel && (
          <text
            x={(frontTR.x + backTR.x) / 2 + 4}
            y={(frontTR.y + backTR.y) / 2 - 4}
            textAnchor="start"
            className="fill-[#0b0b0b] text-[12px] dark:fill-white"
          >
            {depthLabel}
          </text>
        )}
      </svg>
      <figcaption className="text-xs text-[#898781]">
        {isCube ? "立方体の見取図" : "直方体の見取図"}
      </figcaption>
    </figure>
  );
}

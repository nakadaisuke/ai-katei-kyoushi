// total個のものを、groups個のグループに同じ数ずつ分ける様子を図で示す
// （わり算の意味を視覚的に理解するための図。あまりがある場合はperGroup×groupsの残りを
// 「あまり」として右側に別枠で表示する）。
export function GroupingDiagram({
  total,
  groups,
  label,
}: {
  total: number;
  groups: number;
  label?: string;
}) {
  const perGroup = Math.floor(total / groups);
  const remainder = total - perGroup * groups;

  const dotRadius = 6;
  const dotGap = 18;
  const dotsPerRow = Math.min(perGroup, 3) || 1;
  const rows = Math.max(1, Math.ceil(perGroup / dotsPerRow));
  const boxWidth = dotsPerRow * dotGap + 20;
  const boxHeight = rows * dotGap + 24;
  const boxGap = 14;

  const remainderBoxWidth = remainder > 0 ? Math.min(remainder, 3) * dotGap + 20 : 0;

  const totalWidth =
    groups * boxWidth + (groups - 1) * boxGap + (remainder > 0 ? boxGap + remainderBoxWidth : 0);
  const svgHeight = boxHeight + 28;

  function renderDots(count: number, offsetX: number) {
    const dots = [];
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / dotsPerRow);
      const col = i % dotsPerRow;
      const cx = offsetX + 14 + col * dotGap;
      const cy = 16 + row * dotGap;
      dots.push(
        <circle key={i} cx={cx} cy={cy} r={dotRadius} className="fill-[#2a78d6] dark:fill-[#3987e5]" />,
      );
    }
    return dots;
  }

  let cursorX = 0;
  const groupBoxes = [];
  for (let g = 0; g < groups; g++) {
    groupBoxes.push(
      <g key={g}>
        <rect
          x={cursorX}
          y={0}
          width={boxWidth}
          height={boxHeight}
          rx={8}
          className="fill-[#fcfcfb] stroke-[#c3c2b7] dark:fill-[#1a1a19] dark:stroke-[#383835]"
          strokeWidth={1.5}
        />
        {renderDots(perGroup, cursorX)}
      </g>,
    );
    cursorX += boxWidth + boxGap;
  }

  const remainderBox =
    remainder > 0 ? (
      <g>
        <rect
          x={cursorX}
          y={0}
          width={remainderBoxWidth}
          height={boxHeight}
          rx={8}
          className="fill-[#fcfcfb] stroke-[#eda100] dark:fill-[#1a1a19] dark:stroke-[#c98500]"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {renderDots(remainder, cursorX)}
      </g>
    ) : null;

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${totalWidth} ${svgHeight}`}
        width={totalWidth}
        height={svgHeight}
        role="img"
        aria-label={label ?? `${total}個を${groups}グループに分ける図`}
      >
        {groupBoxes}
        {remainderBox}
      </svg>
      <figcaption className="text-xs text-[#898781]">
        {label ?? `${total}個を${groups}グループに同じ数ずつ分けると、1グループ${perGroup}個${remainder > 0 ? `、あまり${remainder}個` : ""}`}
      </figcaption>
    </figure>
  );
}

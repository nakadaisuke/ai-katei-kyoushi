// わり算の筆算（ひっ算）の単元用の図。「たてる・かける・ひく・おろす」の手順を
// 実際の数値で計算し、商・かけ算の結果・ひき算の結果・おろす数字を正しい位置に描く。
type Step = {
  digitIndex: number;
  quotientDigit: number;
  product: number;
  remainder: number;
};

function computeSteps(dividend: number, divisor: number): { steps: Step[]; digits: string } {
  const digits = String(dividend);
  const steps: Step[] = [];
  let current = 0;
  for (let i = 0; i < digits.length; i++) {
    current = current * 10 + Number(digits[i]);
    if (current < divisor && steps.length === 0) continue;
    const quotientDigit = Math.floor(current / divisor);
    const product = quotientDigit * divisor;
    const remainder = current - product;
    steps.push({ digitIndex: i, quotientDigit, product, remainder });
    current = remainder;
  }
  return { steps, digits };
}

export function LongDivisionDiagram({
  dividend,
  divisor,
}: {
  dividend: number;
  divisor: number;
}) {
  const { steps, digits } = computeSteps(dividend, divisor);
  const cellW = 22;
  const rowH = 26;
  const bracketX = 54;
  const leftPad = 10;
  const topPad = 14;

  const totalRows = 2 + steps.length * 3;
  const width = bracketX + digits.length * cellW + 20;
  const height = topPad * 2 + totalRows * rowH;

  function rowCenterY(row: number) {
    return topPad + row * rowH + rowH / 2;
  }
  function colCenterX(col: number) {
    return bracketX + col * cellW + cellW / 2;
  }

  // 右そろえで文字列を描画する（endCol：右はしの文字がおかれる列）
  function rightAlignedText(text: string, endCol: number, y: number, key: string, bold = false) {
    const startCol = endCol - text.length + 1;
    return (
      <text
        key={key}
        x={colCenterX(startCol) - cellW / 2 + 2}
        y={y}
        dominantBaseline="middle"
        className={`fill-[#0b0b0b] text-[15px] dark:fill-white ${bold ? "font-semibold" : ""}`}
        style={{ letterSpacing: `${cellW - 9}px` }}
      >
        {text}
      </text>
    );
  }

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`${dividend}÷${divisor}の筆算`}
      >
        {/* 商（クォーシェント） */}
        {steps.map((s, i) =>
          rightAlignedText(String(s.quotientDigit), s.digitIndex, rowCenterY(0), `q${i}`, true),
        )}

        {/* 筆算のかっこ（縦線・横線） */}
        <line
          x1={bracketX}
          y1={topPad + rowH}
          x2={bracketX}
          y2={topPad + 2 * rowH}
          className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />
        <line
          x1={bracketX}
          y1={topPad + rowH}
          x2={bracketX + digits.length * cellW}
          y2={topPad + rowH}
          className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />

        {/* わる数 */}
        <text
          x={bracketX - 8}
          y={rowCenterY(1)}
          textAnchor="end"
          className="fill-[#0b0b0b] text-[15px] dark:fill-white"
        >
          {divisor}
        </text>

        {/* わられる数 */}
        {digits.split("").map((d, i) => (
          <text
            key={`d${i}`}
            x={colCenterX(i)}
            y={rowCenterY(1)}
            textAnchor="middle"
            className="fill-[#0b0b0b] text-[15px] dark:fill-white"
          >
            {d}
          </text>
        ))}

        {steps.map((s, i) => {
          const productRow = 2 + i * 3;
          const lineRow = productRow + 1;
          const remainderRow = productRow + 2;
          const isLast = i === steps.length - 1;
          const remainderText = isLast
            ? String(s.remainder)
            : String(s.remainder) + digits[s.digitIndex + 1];
          const remainderEndCol = isLast ? s.digitIndex : s.digitIndex + 1;
          const productText = String(s.product);
          const lineSpan = Math.max(productText.length, remainderText.length);
          const lineEndCol = s.digitIndex;
          const lineStartCol = lineEndCol - lineSpan + 1;

          return (
            <g key={`step${i}`}>
              {rightAlignedText(productText, s.digitIndex, rowCenterY(productRow), `p${i}`)}
              <line
                x1={colCenterX(lineStartCol) - cellW / 2 + 2}
                y1={topPad + lineRow * rowH}
                x2={colCenterX(lineEndCol) + cellW / 2 - 2}
                y2={topPad + lineRow * rowH}
                className="stroke-[#c3c2b7] dark:stroke-[#383835]"
                strokeWidth={1.5}
              />
              {rightAlignedText(remainderText, remainderEndCol, rowCenterY(remainderRow), `r${i}`)}
              {!isLast && (
                <line
                  x1={colCenterX(s.digitIndex + 1)}
                  y1={topPad + 2 * rowH}
                  x2={colCenterX(s.digitIndex + 1)}
                  y2={topPad + remainderRow * rowH}
                  strokeDasharray="3 3"
                  className="stroke-[#eda100] dark:stroke-[#c98500]"
                  strokeWidth={1.5}
                  markerEnd="url(#long-division-arrow)"
                />
              )}
            </g>
          );
        })}

        <defs>
          <marker
            id="long-division-arrow"
            markerWidth={6}
            markerHeight={6}
            refX={3}
            refY={5}
            orient="auto"
          >
            <path d="M0,0 L6,0 L3,5 Z" className="fill-[#eda100] dark:fill-[#c98500]" />
          </marker>
        </defs>
      </svg>
      <figcaption className="text-xs text-[#898781]">
        {dividend} ÷ {divisor} の筆算（たてる・かける・ひく・おろす）
      </figcaption>
    </figure>
  );
}

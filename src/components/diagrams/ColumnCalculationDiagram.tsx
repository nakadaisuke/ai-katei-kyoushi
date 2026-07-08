// たし算・ひき算・かけ算の筆算の単元用の図。実際の数値でくり上がり・くり下がり・
// 部分積を計算し、正しい位置に描画する（LongDivisionDiagramと同じ「桁ごとに実際の
// アルゴリズムを計算してSVG座標に配置する」考え方）。
const CELL_W = 24;
const ROW_H = 26;

function addColumns(a: number, b: number) {
  const len = Math.max(String(a).length, String(b).length);
  const aP = String(a).padStart(len, "0").split("").map(Number);
  const bP = String(b).padStart(len, "0").split("").map(Number);
  const result: number[] = new Array(len).fill(0);
  const carryAbove: Record<number, number> = {};
  let carry = 0;
  for (let i = len - 1; i >= 0; i--) {
    const sum = aP[i] + bP[i] + carry;
    result[i] = sum % 10;
    carry = Math.floor(sum / 10);
    if (i > 0 && carry > 0) carryAbove[i - 1] = carry;
  }
  return { len, aP, bP, result, finalCarry: carry, carryAbove };
}

function subColumns(a: number, b: number) {
  const len = String(a).length;
  const aP = String(a).padStart(len, "0").split("").map(Number);
  const bP = String(b).padStart(len, "0").split("").map(Number);
  const result: number[] = new Array(len).fill(0);
  const borrowedFrom: Record<number, boolean> = {};
  let borrow = 0;
  for (let i = len - 1; i >= 0; i--) {
    let da = aP[i] - borrow;
    if (da < bP[i]) {
      da += 10;
      borrow = 1;
      if (i > 0) borrowedFrom[i - 1] = true;
    } else {
      borrow = 0;
    }
    result[i] = da - bP[i];
  }
  return { len, aP, bP, result, borrowedFrom };
}

function mulColumns(a: number, b: number) {
  const bDigits = String(b)
    .split("")
    .map(Number)
    .reverse(); // ones桁から順
  const total = a * b;
  const partials = bDigits.map((digit, place) => ({
    place,
    digit,
    value: a * digit * Math.pow(10, place),
  }));
  const totalCols = String(total).length + (bDigits.length - 1);
  const rightmostCol = totalCols - 1;
  return { partials, total, bDigits, totalCols, rightmostCol };
}

export function ColumnCalculationDiagram({
  operator,
  a,
  b,
}: {
  operator: "+" | "-" | "×";
  a: number;
  b: number;
}) {
  if (operator === "×") {
    const { partials, total, totalCols, rightmostCol } = mulColumns(a, b);
    const showPartials = partials.length > 1;
    const rows = showPartials ? 2 + partials.length + 1 : 3;
    // row0: a, row1: ×b, [line], partial rows..., [line], total
    const width = (totalCols + 1) * CELL_W + 40;

    function rightAlignedText(
      text: string,
      endCol: number,
      row: number,
      key: string,
      bold = false,
    ) {
      const startCol = endCol - text.length + 1;
      return (
        <text
          key={key}
          x={40 + startCol * CELL_W + 2}
          y={20 + row * ROW_H + ROW_H / 2}
          dominantBaseline="middle"
          className={`fill-[#0b0b0b] text-[15px] dark:fill-white ${bold ? "font-semibold" : ""}`}
          style={{ letterSpacing: `${CELL_W - 9}px` }}
        >
          {text}
        </text>
      );
    }

    let row = 0;
    const aRow = row++;
    const bRow = row++;
    const lineY1 = 20 + row * ROW_H;
    row++;
    const partialRows = showPartials ? partials.map(() => row++) : [row++];
    const lineY2 = 20 + row * ROW_H;
    row++;
    const totalRow = row++;
    const height = 20 + row * ROW_H + 10;

    return (
      <figure className="flex flex-col items-center gap-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={`${a}×${b}の筆算`}
        >
          {rightAlignedText(String(a), rightmostCol, aRow, "a")}
          <text
            x={40 + (rightmostCol - String(b).length) * CELL_W - 6}
            y={20 + bRow * ROW_H + ROW_H / 2}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-[#0b0b0b] text-[15px] dark:fill-white"
          >
            ×
          </text>
          {rightAlignedText(String(b), rightmostCol, bRow, "b")}
          <line
            x1={40 - CELL_W}
            y1={lineY1}
            x2={40 + (rightmostCol + 1) * CELL_W}
            y2={lineY1}
            className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
            strokeWidth={2}
          />
          {showPartials
            ? partials.map((p, i) =>
                rightAlignedText(
                  String(p.value),
                  rightmostCol - p.place,
                  partialRows[i],
                  `p${i}`,
                ),
              )
            : rightAlignedText(String(total), rightmostCol, partialRows[0], "single", true)}
          {showPartials && (
            <>
              <line
                x1={40 - CELL_W}
                y1={lineY2}
                x2={40 + (rightmostCol + 1) * CELL_W}
                y2={lineY2}
                className="stroke-[#c3c2b7] dark:stroke-[#383835]"
                strokeWidth={1.5}
              />
              {rightAlignedText(String(total), rightmostCol, totalRow, "total", true)}
            </>
          )}
        </svg>
        <figcaption className="text-xs text-[#898781]">
          {a} × {b} の筆算
        </figcaption>
      </figure>
    );
  }

  const data = operator === "+" ? addColumns(a, b) : subColumns(a, b);
  const { len } = data;
  const hasOverflow = operator === "+" && (data as ReturnType<typeof addColumns>).finalCarry > 0;
  const leftPad = 40;
  const width = (len + 2) * CELL_W + 20;
  const height = 20 + 4 * ROW_H + 10;

  function colX(col: number) {
    // col: 0..len-1 は数字の列、-1はオーバーフロー/演算子の列
    return leftPad + (col + 1) * CELL_W;
  }

  const carryRowY = 20 + ROW_H / 2;
  const aRowY = 20 + ROW_H + ROW_H / 2;
  const bRowY = 20 + 2 * ROW_H + ROW_H / 2;
  const lineY = 20 + 3 * ROW_H;
  const resultRowY = 20 + 3 * ROW_H + ROW_H / 2;

  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`${a}${operator}${b}の筆算`}
      >
        {operator === "+" &&
          Object.entries((data as ReturnType<typeof addColumns>).carryAbove).map(
            ([col, val]) => (
              <text
                key={`c${col}`}
                x={colX(Number(col))}
                y={carryRowY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[#eda100] text-[12px] font-semibold dark:fill-[#c98500]"
              >
                {val}
              </text>
            ),
          )}
        {operator === "-" &&
          Object.keys((data as ReturnType<typeof subColumns>).borrowedFrom).map((col) => (
            <circle
              key={`b${col}`}
              cx={colX(Number(col))}
              cy={carryRowY}
              r={3}
              className="fill-[#eda100] dark:fill-[#c98500]"
            />
          ))}

        {hasOverflow && (
          <text
            x={colX(-1)}
            y={resultRowY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#0b0b0b] text-[15px] font-semibold dark:fill-white"
          >
            {(data as ReturnType<typeof addColumns>).finalCarry}
          </text>
        )}

        {data.aP.map((d, i) => (
          <text
            key={`a${i}`}
            x={colX(i)}
            y={aRowY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#0b0b0b] text-[15px] dark:fill-white"
          >
            {d}
          </text>
        ))}

        <text
          x={colX(-1)}
          y={bRowY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-[#0b0b0b] text-[15px] dark:fill-white"
        >
          {operator}
        </text>
        {data.bP.map((d, i) => (
          <text
            key={`b${i}`}
            x={colX(i)}
            y={bRowY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#0b0b0b] text-[15px] dark:fill-white"
          >
            {d}
          </text>
        ))}

        <line
          x1={colX(-1) - CELL_W / 2}
          y1={lineY}
          x2={colX(len - 1) + CELL_W / 2}
          y2={lineY}
          className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
          strokeWidth={2}
        />

        {data.result.map((d, i) => (
          <text
            key={`r${i}`}
            x={colX(i)}
            y={resultRowY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#0b0b0b] text-[15px] font-semibold dark:fill-white"
          >
            {d}
          </text>
        ))}
      </svg>
      <figcaption className="text-xs text-[#898781]">
        {a} {operator} {b} の筆算
      </figcaption>
    </figure>
  );
}

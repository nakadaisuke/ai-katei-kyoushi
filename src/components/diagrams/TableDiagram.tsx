export function TableDiagram({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; cells: (string | number)[] }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-[#c3c2b7] bg-[#f9f9f7] p-2 dark:border-[#383835] dark:bg-[#0d0d0d]" />
            {columns.map((col) => (
              <th
                key={col}
                className="border border-[#c3c2b7] bg-[#f9f9f7] p-2 font-medium dark:border-[#383835] dark:bg-[#0d0d0d]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th className="border border-[#c3c2b7] bg-[#f9f9f7] p-2 text-left font-medium dark:border-[#383835] dark:bg-[#0d0d0d]">
                {row.label}
              </th>
              {row.cells.map((cell, i) => (
                <td
                  key={i}
                  className="border border-[#c3c2b7] p-2 text-center dark:border-[#383835]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

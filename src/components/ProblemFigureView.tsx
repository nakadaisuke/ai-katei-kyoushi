import type { ProblemFigure } from "@/lib/types";
import { BarChartDiagram } from "@/components/diagrams/BarChartDiagram";
import { TableDiagram } from "@/components/diagrams/TableDiagram";

export function ProblemFigureView({ figure }: { figure: ProblemFigure }) {
  switch (figure.kind) {
    case "bar-chart":
      return (
        <BarChartDiagram
          unit={figure.unit}
          maxValue={figure.maxValue}
          yLabels={figure.yLabels}
          bars={figure.bars}
        />
      );
    case "table":
      return <TableDiagram columns={figure.columns} rows={figure.rows} />;
    default:
      return null;
  }
}

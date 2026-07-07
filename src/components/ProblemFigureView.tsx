import type { ProblemFigure } from "@/lib/types";
import { BarChartDiagram } from "@/components/diagrams/BarChartDiagram";
import { TableDiagram } from "@/components/diagrams/TableDiagram";
import { TriangleDiagram } from "@/components/diagrams/TriangleDiagram";
import { CircleDiagram } from "@/components/diagrams/CircleDiagram";
import { NumberLineDiagram } from "@/components/diagrams/NumberLineDiagram";

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
    case "triangle":
      return (
        <TriangleDiagram
          sideLabels={figure.sideLabels}
          equalMarks={figure.equalMarks}
          vertexLabels={figure.vertexLabels}
        />
      );
    case "circle":
      return (
        <CircleDiagram
          centerLabel={figure.centerLabel}
          radiusLabel={figure.radiusLabel}
          showDiameter={figure.showDiameter}
          diameterLabel={figure.diameterLabel}
        />
      );
    case "number-line":
      return (
        <NumberLineDiagram
          min={figure.min}
          max={figure.max}
          majorStep={figure.majorStep}
          minorStep={figure.minorStep}
          markers={figure.markers}
        />
      );
    default:
      return null;
  }
}

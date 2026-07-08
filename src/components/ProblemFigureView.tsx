import type { ProblemFigure } from "@/lib/types";
import { BarChartDiagram } from "@/components/diagrams/BarChartDiagram";
import { TableDiagram } from "@/components/diagrams/TableDiagram";
import { TriangleDiagram } from "@/components/diagrams/TriangleDiagram";
import { CircleDiagram } from "@/components/diagrams/CircleDiagram";
import { NumberLineDiagram } from "@/components/diagrams/NumberLineDiagram";
import { LineGraphDiagram } from "@/components/diagrams/LineGraphDiagram";
import { QuadrilateralDiagram } from "@/components/diagrams/QuadrilateralDiagram";
import { AngleDiagram } from "@/components/diagrams/AngleDiagram";
import { SorobanDiagram } from "@/components/diagrams/SorobanDiagram";
import { RectangularPrismDiagram } from "@/components/diagrams/RectangularPrismDiagram";
import { LongDivisionDiagram } from "@/components/diagrams/LongDivisionDiagram";
import { LinesDiagram } from "@/components/diagrams/LinesDiagram";
import { FractionBarDiagram } from "@/components/diagrams/FractionBarDiagram";
import { AreaModelDiagram } from "@/components/diagrams/AreaModelDiagram";
import { ColumnCalculationDiagram } from "@/components/diagrams/ColumnCalculationDiagram";

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
          angleLabels={figure.angleLabels}
          rightAngleAt={figure.rightAngleAt}
          angles={figure.angles}
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
    case "line-graph":
      return (
        <LineGraphDiagram
          unit={figure.unit}
          maxValue={figure.maxValue}
          yLabels={figure.yLabels}
          points={figure.points}
        />
      );
    case "quadrilateral":
      return (
        <QuadrilateralDiagram
          shape={figure.shape}
          vertexLabels={figure.vertexLabels}
          sideLabels={figure.sideLabels}
          equalMarks={figure.equalMarks}
          parallelMarks={figure.parallelMarks}
          showRightAngles={figure.showRightAngles}
          showDiagonals={figure.showDiagonals}
        />
      );
    case "angle":
      return (
        <AngleDiagram
          angleDegrees={figure.angleDegrees}
          label={figure.label}
          rayLabels={figure.rayLabels}
        />
      );
    case "soroban":
      return <SorobanDiagram />;
    case "rectangular-prism":
      return (
        <RectangularPrismDiagram
          widthLabel={figure.widthLabel}
          heightLabel={figure.heightLabel}
          depthLabel={figure.depthLabel}
          isCube={figure.isCube}
        />
      );
    case "long-division":
      return <LongDivisionDiagram dividend={figure.dividend} divisor={figure.divisor} />;
    case "lines":
      return <LinesDiagram relation={figure.relation} />;
    case "fraction-bar":
      return <FractionBarDiagram numerator={figure.numerator} denominator={figure.denominator} />;
    case "area-model":
      return (
        <AreaModelDiagram splitFactor={figure.splitFactor} otherFactor={figure.otherFactor} />
      );
    case "column-calculation":
      return <ColumnCalculationDiagram operator={figure.operator} a={figure.a} b={figure.b} />;
    default:
      return null;
  }
}

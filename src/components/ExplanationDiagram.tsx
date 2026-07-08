import type { ExplanationDiagram as ExplanationDiagramData } from "@/lib/types";
import { GroupingDiagram } from "@/components/diagrams/GroupingDiagram";
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
import { TableDiagram } from "@/components/diagrams/TableDiagram";
import { FractionBarDiagram } from "@/components/diagrams/FractionBarDiagram";
import { AreaModelDiagram } from "@/components/diagrams/AreaModelDiagram";
import { ColumnCalculationDiagram } from "@/components/diagrams/ColumnCalculationDiagram";

export function ExplanationDiagram({ diagram }: { diagram: ExplanationDiagramData }) {
  switch (diagram.kind) {
    case "grouping":
      return (
        <GroupingDiagram total={diagram.total} groups={diagram.groups} label={diagram.label} />
      );
    case "table":
      return <TableDiagram columns={diagram.columns} rows={diagram.rows} />;
    case "triangle":
      return (
        <TriangleDiagram
          sideLabels={diagram.sideLabels}
          equalMarks={diagram.equalMarks}
          vertexLabels={diagram.vertexLabels}
          angleLabels={diagram.angleLabels}
          rightAngleAt={diagram.rightAngleAt}
          angles={diagram.angles}
        />
      );
    case "circle":
      return (
        <CircleDiagram
          centerLabel={diagram.centerLabel}
          radiusLabel={diagram.radiusLabel}
          showDiameter={diagram.showDiameter}
          diameterLabel={diagram.diameterLabel}
        />
      );
    case "number-line":
      return (
        <NumberLineDiagram
          min={diagram.min}
          max={diagram.max}
          majorStep={diagram.majorStep}
          minorStep={diagram.minorStep}
          markers={diagram.markers}
        />
      );
    case "line-graph":
      return (
        <LineGraphDiagram
          unit={diagram.unit}
          maxValue={diagram.maxValue}
          yLabels={diagram.yLabels}
          points={diagram.points}
        />
      );
    case "quadrilateral":
      return (
        <QuadrilateralDiagram
          shape={diagram.shape}
          vertexLabels={diagram.vertexLabels}
          sideLabels={diagram.sideLabels}
          equalMarks={diagram.equalMarks}
          parallelMarks={diagram.parallelMarks}
          showRightAngles={diagram.showRightAngles}
          showDiagonals={diagram.showDiagonals}
        />
      );
    case "angle":
      return (
        <AngleDiagram
          angleDegrees={diagram.angleDegrees}
          label={diagram.label}
          rayLabels={diagram.rayLabels}
        />
      );
    case "soroban":
      return <SorobanDiagram />;
    case "rectangular-prism":
      return (
        <RectangularPrismDiagram
          widthLabel={diagram.widthLabel}
          heightLabel={diagram.heightLabel}
          depthLabel={diagram.depthLabel}
          isCube={diagram.isCube}
        />
      );
    case "long-division":
      return <LongDivisionDiagram dividend={diagram.dividend} divisor={diagram.divisor} />;
    case "lines":
      return <LinesDiagram relation={diagram.relation} />;
    case "fraction-bar":
      return <FractionBarDiagram numerator={diagram.numerator} denominator={diagram.denominator} />;
    case "area-model":
      return (
        <AreaModelDiagram splitFactor={diagram.splitFactor} otherFactor={diagram.otherFactor} />
      );
    case "column-calculation":
      return (
        <ColumnCalculationDiagram operator={diagram.operator} a={diagram.a} b={diagram.b} />
      );
    default:
      return null;
  }
}

import type { ExplanationDiagram as ExplanationDiagramData } from "@/lib/types";
import { GroupingDiagram } from "@/components/diagrams/GroupingDiagram";
import { TriangleDiagram } from "@/components/diagrams/TriangleDiagram";
import { CircleDiagram } from "@/components/diagrams/CircleDiagram";
import { NumberLineDiagram } from "@/components/diagrams/NumberLineDiagram";

export function ExplanationDiagram({ diagram }: { diagram: ExplanationDiagramData }) {
  switch (diagram.kind) {
    case "grouping":
      return (
        <GroupingDiagram total={diagram.total} groups={diagram.groups} label={diagram.label} />
      );
    case "triangle":
      return (
        <TriangleDiagram
          sideLabels={diagram.sideLabels}
          equalMarks={diagram.equalMarks}
          vertexLabels={diagram.vertexLabels}
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
    default:
      return null;
  }
}

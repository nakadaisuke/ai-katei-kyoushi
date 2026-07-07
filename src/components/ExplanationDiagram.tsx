import type { ExplanationDiagram as ExplanationDiagramData } from "@/lib/types";
import { GroupingDiagram } from "@/components/diagrams/GroupingDiagram";

export function ExplanationDiagram({ diagram }: { diagram: ExplanationDiagramData }) {
  switch (diagram.kind) {
    case "grouping":
      return (
        <GroupingDiagram total={diagram.total} groups={diagram.groups} label={diagram.label} />
      );
    default:
      return null;
  }
}

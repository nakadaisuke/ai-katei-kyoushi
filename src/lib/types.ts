export type Difficulty = "easy" | "normal" | "hard";

// 表・棒グラフを読み取る問題に添える図。値が空欄の場合はその問題で
// 求めさせたい記号（"ア"など）や"？"をそのまま文字として入れる。
export type ProblemFigure =
  | {
      kind: "bar-chart";
      unit: string;
      maxValue: number;
      yLabels: number[];
      bars: { label: string; value: number }[];
    }
  | {
      kind: "table";
      columns: string[];
      rows: { label: string; cells: (string | number)[] }[];
    }
  | {
      kind: "triangle";
      sideLabels: [string, string, string];
      // 同じ数字が入っている辺どうしが等しい長さであることを示すチックマークの数（0はマークなし）
      equalMarks: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
      vertexLabels?: [string, string, string];
    }
  | {
      kind: "circle";
      centerLabel?: string;
      radiusLabel?: string;
      showDiameter?: boolean;
      diameterLabel?: string;
    }
  | {
      kind: "number-line";
      min: number;
      max: number;
      majorStep: number;
      minorStep?: number;
      // valueで正しい位置に矢印を描画するが、表示するのはlabelのみ（答えの数値は見せない）
      markers?: { value: number; label: string }[];
    };

export interface Problem {
  id: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  steps: string[];
  tags: string[];
  figure?: ProblemFigure;
}

// 単元解説に添える図。単元ごとに必要な種類を増やしていく
// （例: わり算=grouping、円と球=circle、三角形=triangle など）。
export type ExplanationDiagram =
  | { kind: "grouping"; total: number; groups: number; label?: string }
  | {
      kind: "triangle";
      sideLabels: [string, string, string];
      equalMarks: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
      vertexLabels?: [string, string, string];
    }
  | {
      kind: "circle";
      centerLabel?: string;
      radiusLabel?: string;
      showDiameter?: boolean;
      diameterLabel?: string;
    }
  | {
      kind: "number-line";
      min: number;
      max: number;
      majorStep: number;
      minorStep?: number;
      markers?: { value: number; label: string }[];
    };

export interface NotebookExample {
  question: string;
  lines: string[];
}

export interface Chapter {
  id: string;
  grade: string;
  title: string;
  explanation: {
    summary: string;
    keyPoints: string[];
    diagram?: ExplanationDiagram;
    notebookExample?: NotebookExample;
  };
  practiceProblems: Problem[];
  assessmentProblems: Problem[];
}

export function allProblems(chapter: Chapter): Problem[] {
  return [...chapter.practiceProblems, ...chapter.assessmentProblems];
}

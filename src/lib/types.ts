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
      // 各頂点の内角ラベル（"45°"や答えを隠す"？"など）と、直角マークを表示する頂点
      angleLabels?: [string, string, string];
      rightAngleAt?: [boolean, boolean, boolean];
      // A,B,Cの実際の内角（度）。指定すると角度どおりの形（直角三角形なら直角三角形らしい形）で描く
      angles?: [number, number, number];
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
    }
  | {
      kind: "line-graph";
      unit: string;
      maxValue: number;
      yLabels: number[];
      points: { label: string; value: number }[];
    }
  | {
      kind: "quadrilateral";
      shape: "rectangle" | "square" | "rhombus" | "parallelogram" | "trapezoid";
      vertexLabels?: [string, string, string, string];
      sideLabels?: [string, string, string, string];
      equalMarks?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
      parallelMarks?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
      showRightAngles?: boolean;
      showDiagonals?: boolean;
    }
  | {
      kind: "angle";
      angleDegrees: number;
      label?: string;
      rayLabels?: [string, string];
    }
  | { kind: "soroban" }
  | {
      kind: "rectangular-prism";
      widthLabel?: string;
      heightLabel?: string;
      depthLabel?: string;
      isCube?: boolean;
    }
  | { kind: "long-division"; dividend: number; divisor: number }
  | { kind: "lines"; relation: "perpendicular" | "parallel" }
  | { kind: "fraction-bar"; numerator: number; denominator: number }
  | { kind: "area-model"; splitFactor: [number, number]; otherFactor: number }
  | { kind: "column-calculation"; operator: "+" | "-" | "×"; a: number; b: number };

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
      kind: "table";
      columns: string[];
      rows: { label: string; cells: (string | number)[] }[];
    }
  | {
      kind: "triangle";
      sideLabels: [string, string, string];
      equalMarks: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
      vertexLabels?: [string, string, string];
      angleLabels?: [string, string, string];
      rightAngleAt?: [boolean, boolean, boolean];
      angles?: [number, number, number];
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
    }
  | {
      kind: "line-graph";
      unit: string;
      maxValue: number;
      yLabels: number[];
      points: { label: string; value: number }[];
    }
  | {
      kind: "quadrilateral";
      shape: "rectangle" | "square" | "rhombus" | "parallelogram" | "trapezoid";
      vertexLabels?: [string, string, string, string];
      sideLabels?: [string, string, string, string];
      equalMarks?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
      parallelMarks?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
      showRightAngles?: boolean;
      showDiagonals?: boolean;
    }
  | {
      kind: "angle";
      angleDegrees: number;
      label?: string;
      rayLabels?: [string, string];
    }
  | { kind: "soroban" }
  | {
      kind: "rectangular-prism";
      widthLabel?: string;
      heightLabel?: string;
      depthLabel?: string;
      isCube?: boolean;
    }
  | { kind: "long-division"; dividend: number; divisor: number }
  | { kind: "lines"; relation: "perpendicular" | "parallel" }
  | { kind: "fraction-bar"; numerator: number; denominator: number }
  | { kind: "area-model"; splitFactor: [number, number]; otherFactor: number }
  | { kind: "column-calculation"; operator: "+" | "-" | "×"; a: number; b: number };

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
    // 1つの解説に複数の図を並べたいとき用（例：垂直の図＋平行の図）。diagramと併用可能。
    diagrams?: ExplanationDiagram[];
    notebookExample?: NotebookExample;
    // 練習問題を終えた直後、評価問題に入る前に挟む追加解説（難しい単元向け）。
    // 設定した単元だけ「簡単な問題→この解説→普通の問題」という流れになる。
    midCheckpoint?: {
      summary: string;
      keyPoints?: string[];
      diagram?: ExplanationDiagram;
      diagrams?: ExplanationDiagram[];
    };
  };
  practiceProblems: Problem[];
  assessmentProblems: Problem[];
}

export function allProblems(chapter: Chapter): Problem[] {
  return [...chapter.practiceProblems, ...chapter.assessmentProblems];
}

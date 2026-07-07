export type Difficulty = "easy" | "normal" | "hard";

export interface Problem {
  id: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  steps: string[];
  tags: string[];
}

export interface Chapter {
  id: string;
  grade: string;
  title: string;
  explanation: {
    summary: string;
    keyPoints: string[];
  };
  problems: Problem[];
}

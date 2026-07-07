export interface Database {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Tables: {
      students: {
        Row: {
          id: string;
          parent_id: string;
          name: string;
          grade: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          name: string;
          grade: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["students"]["Insert"]>;
        Relationships: [];
      };
      attempts: {
        Row: {
          id: string;
          student_id: string;
          chapter_id: string;
          problem_id: string;
          student_answer: string;
          correct: boolean;
          used_hint_levels: number;
          requested_reexplain: boolean;
          duration_ms: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          chapter_id: string;
          problem_id: string;
          student_answer: string;
          correct: boolean;
          used_hint_levels?: number;
          requested_reexplain?: boolean;
          duration_ms?: number | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["attempts"]["Insert"]>;
        Relationships: [];
      };
      chapter_progress: {
        Row: {
          student_id: string;
          chapter_id: string;
          completed_at: string | null;
        };
        Insert: {
          student_id: string;
          chapter_id: string;
          completed_at?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["chapter_progress"]["Insert"]
        >;
        Relationships: [];
      };
    };
  };
}

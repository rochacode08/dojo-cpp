export type Difficulty = "Fácil" | "Médio" | "Difícil";

export interface Profile {
  id: string;
  display_name: string;
  avatar_color: string;
  avatar_initials: string;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  starter_code: string;
  time_limit_ms: number;
  memory_limit_mb: number;
  order_index: number;
  hints: string[];
}

export interface TestCase {
  id: string;
  problem_id: string;
  input: string;
  expected_output: string;
  is_sample: boolean;
  order_index: number;
}

export type SubmissionStatus =
  | "pending"
  | "accepted"
  | "wrong_answer"
  | "compile_error"
  | "runtime_error";

/** "test" roda só os casos de exemplo e não conta como tentativa;
 *  "submit" roda todos os casos e registra a submissão. */
export type RunMode = "test" | "submit";

export interface TestResultRow {
  name: string;
  passed: boolean;
  status: string;
  time: string;
  input?: string;
  expected?: string;
  received?: string;
  /** Caso de exemplo (visível no enunciado) ou caso oculto. */
  isSample?: boolean;
  /** Aviso sobre formatação (quebra de linha faltando, espaços sobrando...). */
  warning?: string;
}

export interface RunCodeResponse {
  status: SubmissionStatus;
  results: TestResultRow[];
  mode: RunMode;
}

export interface SubmissionHistoryEntry {
  id: string;
  user_id: string;
  status: SubmissionStatus;
  created_at: string;
}

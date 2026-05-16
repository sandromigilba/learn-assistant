// ─── Types ─────────────────────────────────────────────────────

export type Mode = 'explain' | 'quiz' | 'summary';

export type Page = 'home' | 'chat';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

// ─── Groq / OpenAI-compatible API types ────────────────────────

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// ─── Types ─────────────────────────────────────────────────────

export type Mode = 'explain' | 'quiz' | 'summary';

export type Page = 'home' | 'chat';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface GeminiPart {
  text: string;
}

export interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

import type { Message, Mode, GroqMessage } from '../types';
import { SYSTEM_PROMPTS } from '../constants/systemPrompts';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;
const MODEL   = (import.meta.env.VITE_GROQ_MODEL as string) || 'llama-3.3-70b-versatile';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// ─── Format conversation history for Groq (OpenAI-compatible) ──
// Maps internal 'model' role → 'assistant' as required by the API
function buildMessages(
  systemPrompt: string,
  history: Message[],
  userText: string
): GroqMessage[] {
  return [
    { role: 'system', content: systemPrompt },
    ...history.map((msg): GroqMessage => ({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.content,
    })),
    { role: 'user', content: userText },
  ];
}

// ─── Main Groq API call ─────────────────────────────────────────
export async function sendMessage(
  userText: string,
  history: Message[],
  mode: Mode
): Promise<string> {
  if (!API_KEY || API_KEY === 'your_groq_api_key_here') {
    throw new Error(
      'VITE_GROQ_API_KEY belum diset. Tambahkan API key Groq ke file .env.\nDapatkan key gratis di: https://console.groq.com'
    );
  }

  const messages = buildMessages(SYSTEM_PROMPTS[mode], history, userText);

  const body = {
    model: MODEL,
    messages,
    temperature: mode === 'quiz' ? 0.8 : 0.7,
    max_tokens: 2048,
    top_p: 0.95,
    stream: false,
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      (errorData as { error?: { message?: string } })?.error?.message ??
      `HTTP ${response.status}`;
    throw new Error(`Groq API error: ${message}`);
  }

  const data = await response.json() as {
    choices?: Array<{
      message?: { content?: string };
      finish_reason?: string;
    }>;
  };

  const text = data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('Tidak ada respons dari Groq API.');
  }

  return text.trim();
}

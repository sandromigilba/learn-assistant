import type { Message, Mode, GeminiContent } from '../types';
import { SYSTEM_PROMPTS } from '../constants/systemPrompts';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const MODEL = (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-2.5-flash-lite';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// ─── Format conversation history for Gemini multi-turn API ─────
function formatHistory(messages: Message[]): GeminiContent[] {
  return messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));
}

// ─── Main Gemini API call ───────────────────────────────────────
export async function sendMessage(
  userText: string,
  history: Message[],
  mode: Mode
): Promise<string> {
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    throw new Error(
      'VITE_GEMINI_API_KEY is not set. Please add your Gemini API key to the .env file.'
    );
  }

  const systemPrompt = SYSTEM_PROMPTS[mode];

  // Build the contents array: history + new user message
  const contents: GeminiContent[] = [
    ...formatHistory(history),
    { role: 'user', parts: [{ text: userText }] },
  ];

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: mode === 'quiz' ? 0.8 : 0.7,
      maxOutputTokens: 2048,
      topP: 0.95,
      topK: 40,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = (errorData as { error?: { message?: string } })?.error?.message ?? `HTTP ${response.status}`;
    throw new Error(`Gemini API error: ${message}`);
  }

  const data = await response.json() as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
      finishReason?: string;
    }>;
  };

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No response content received from Gemini API.');
  }

  return text.trim();
}

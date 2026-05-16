import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Trash2, GraduationCap, AlertCircle } from 'lucide-react';
import type { Message, Mode } from '../types';
import { sendMessage } from '../services/geminiService';
import ModeSelector from './ModeSelector';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  messages: Message[];
  onMessagesChange: (msgs: Message[]) => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

const MODE_PLACEHOLDERS: Record<Mode, string> = {
  explain: 'Ask me to explain anything — e.g. "How does photosynthesis work?"',
  quiz: 'Give me a topic to quiz you on — e.g. "Quiz me on World War II"',
  summary: 'Paste text or a topic to summarize — e.g. "Summarize the French Revolution"',
};

const MODE_WELCOME: Record<Mode, string> = {
  explain: '👋 Welcome! I\'m in **Explain Mode**. Give me any topic and I\'ll break it down step-by-step with examples and analogies.',
  quiz: '🎯 Welcome! I\'m in **Quiz Mode**. Tell me a subject and I\'ll fire questions at you to test your knowledge!',
  summary: '📋 Welcome! I\'m in **Summary Mode**. Paste any text or topic and I\'ll distill it into clean, scannable bullet points.',
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatWindow({
  messages,
  onMessagesChange,
  mode,
  onModeChange,
}: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Auto-scroll to bottom ────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // ── Auto-resize textarea ─────────────────────────────
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [inputText]);

  // ── Handle send ──────────────────────────────────────
  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || isTyping) return;

    setError(null);
    setInputText('');

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const updatedHistory = [...messages, userMsg];
    onMessagesChange(updatedHistory);
    setIsTyping(true);

    try {
      const aiText = await sendMessage(text, messages, mode);
      const aiMsg: Message = {
        id: generateId(),
        role: 'model',
        content: aiText,
        timestamp: new Date(),
      };
      onMessagesChange([...updatedHistory, aiMsg]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(msg);
    } finally {
      setIsTyping(false);
    }
  }, [inputText, isTyping, messages, mode, onMessagesChange]);

  // ── Enter key: send; Shift+Enter: newline ────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Clear conversation ───────────────────────────────
  const handleClear = () => {
    onMessagesChange([]);
    setError(null);
  };

  const isInputEmpty = inputText.trim().length === 0;

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Top Bar ─────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 glass-dark border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{ background: 'linear-gradient(135deg, #7c7abf, #535280)' }}
          >
            <GraduationCap size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text">AI Study Tutor</p>
            <p className="text-[10px] text-brand-dark">Learn Assistant · Powered by Groq</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeSelector mode={mode} onChange={onModeChange} />
          {messages.length > 0 && (
            <button
              id="clear-chat"
              onClick={handleClear}
              title="Clear conversation"
              className="p-2 rounded-lg text-brand-dark hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ── Messages Area ───────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {/* Welcome message when chat is empty */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fade-in-up py-12">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white animate-glow-pulse"
              style={{ background: 'linear-gradient(135deg, #a5a3ff, #535280)' }}
            >
              <GraduationCap size={28} />
            </div>
            <div className="max-w-md space-y-2">
              <h2 className="text-xl font-bold text-brand-text">Ready to learn!</h2>
              <div className="ai-prose text-brand-medium text-sm">
                <p>{MODE_WELCOME[mode].replace(/\*\*/g, '')}</p>
              </div>
            </div>
            <div className="glass rounded-xl p-3 max-w-sm">
              <p className="text-xs text-brand-dark">
                💡 <span className="text-brand-medium">Tip:</span> Switch modes with the toggle above to change how I respond.
              </p>
            </div>
          </div>
        )}

        {/* Chat bubbles */}
        {messages.map((msg, i) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isLatest={i === messages.length - 1}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-xl animate-fade-in"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-red-400 mb-0.5">Error</p>
              <p className="text-xs text-red-300">{error}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ──────────────────────────────── */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2">
        <div
          className="flex items-end gap-2 p-2 rounded-2xl glass transition-all duration-200"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
        >
          <textarea
            ref={textareaRef}
            id="chat-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={MODE_PLACEHOLDERS[mode]}
            rows={1}
            disabled={isTyping}
            className={`
              flex-1 bg-transparent resize-none outline-none text-sm text-brand-text
              placeholder-brand-dark py-2 px-2 leading-relaxed
              disabled:opacity-50
            `}
            style={{ minHeight: '40px', maxHeight: '160px' }}
          />
          <button
            id="send-message"
            onClick={handleSend}
            disabled={isInputEmpty || isTyping}
            aria-label="Send message"
            className={`
              flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
              transition-all duration-200
              ${!isInputEmpty && !isTyping
                ? 'bg-brand-primary text-brand-bg hover:scale-105 active:scale-95'
                : 'bg-white/5 text-brand-dark cursor-not-allowed'}
            `}
            style={!isInputEmpty && !isTyping
              ? { boxShadow: '0 2px 12px rgba(165,163,255,0.4)' }
              : {}
            }
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-brand-dark text-center mt-1.5">
          Press <kbd className="px-1 py-0.5 rounded text-[9px]" style={{ background: 'rgba(165,163,255,0.1)' }}>Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded text-[9px]" style={{ background: 'rgba(165,163,255,0.1)' }}>Shift+Enter</kbd> for newline
        </p>
      </div>
    </div>
  );
}

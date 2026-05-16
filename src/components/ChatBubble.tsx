import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GraduationCap, User } from 'lucide-react';
import type { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
  isLatest?: boolean;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatBubble({ message, isLatest }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`
        flex items-end gap-2.5 w-full
        ${isUser ? 'flex-row-reverse' : 'flex-row'}
        ${isLatest ? 'animate-fade-in-up' : ''}
      `}
    >
      {/* ── Avatar ───────────────────────────── */}
      <div
        className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm
          ${isUser
            ? 'glass-primary text-brand-primary'
            : 'text-white'}
        `}
        style={!isUser ? { background: 'linear-gradient(135deg, #7c7abf, #535280)' } : {}}
      >
        {isUser ? <User size={15} /> : <GraduationCap size={15} />}
      </div>

      {/* ── Bubble ───────────────────────────── */}
      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`
            px-4 py-3 rounded-2xl text-sm leading-relaxed
            ${isUser
              ? 'glass-primary text-brand-text rounded-br-sm'
              : 'glass-dark text-brand-text rounded-bl-sm'}
          `}
          style={isUser
            ? { boxShadow: '0 2px 16px rgba(165,163,255,0.15)' }
            : { boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }
          }
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="ai-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* ── Timestamp ─────────────────────── */}
        <span className="text-[10px] text-brand-dark px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

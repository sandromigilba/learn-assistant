import { GraduationCap } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 animate-fade-in">
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
        style={{ background: 'linear-gradient(135deg, #7c7abf, #535280)' }}
      >
        <GraduationCap size={15} />
      </div>

      {/* Bubble */}
      <div
        className="px-4 py-3.5 rounded-2xl rounded-bl-sm glass-dark flex items-center gap-1.5"
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-2 h-2 rounded-full bg-brand-primary animate-bounce-dot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

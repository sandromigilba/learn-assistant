import { BookOpen, HelpCircle, ListChecks } from 'lucide-react';
import type { Mode } from '../types';

interface ModeSelectorProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const MODES: Array<{ id: Mode; label: string; icon: React.ReactNode; desc: string }> = [
  { id: 'explain', label: 'Explain', icon: <BookOpen size={15} />,    desc: 'Deep explanation' },
  { id: 'quiz',    label: 'Quiz',    icon: <HelpCircle size={15} />,  desc: 'Practice questions' },
  { id: 'summary', label: 'Summary', icon: <ListChecks size={15} />,  desc: 'Bullet-point summary' },
];

export default function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-1.5 p-1 rounded-xl glass" role="group" aria-label="Learning mode">
      {MODES.map(({ id, label, icon, desc }) => {
        const isActive = mode === id;
        return (
          <button
            key={id}
            id={`mode-${id}`}
            onClick={() => onChange(id)}
            title={desc}
            aria-pressed={isActive}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
              transition-all duration-200 select-none
              ${isActive
                ? 'bg-brand-primary text-brand-bg shadow-lg'
                : 'text-brand-medium hover:text-brand-text hover:bg-white/5'}
            `}
            style={isActive ? { boxShadow: '0 2px 12px rgba(165,163,255,0.4)' } : {}}
          >
            <span className={isActive ? 'text-brand-bg' : ''}>{icon}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

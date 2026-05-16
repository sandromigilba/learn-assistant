import { Home, MessageSquare, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const NAV_ITEMS: Array<{ id: Page; label: string; icon: React.ReactNode }> = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'chat', label: 'Chat', icon: <MessageSquare size={20} /> },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside
      className="relative flex flex-col h-full transition-all duration-300 ease-in-out glass-dark"
      style={{ width: collapsed ? '68px' : '220px', minWidth: collapsed ? '68px' : '220px' }}
    >
      {/* ── Brand Logo ─────────────────────────── */}
      <div className={`flex items-center gap-3 px-3 py-5 ${collapsed ? 'justify-center' : ''}`}>
        <div
          onClick={onToggleCollapse}
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center animate-glow-pulse"
          style={{ background: 'linear-gradient(135deg, #a5a3ff, #535280)' }}
        >
          <GraduationCap size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden">
            <p className="text-sm font-bold text-brand-primary leading-none">Learn Asisstant</p>
            <p className="text-[10px] text-brand-medium mt-0.5 leading-none">AI Study Tutor</p>
          </div>
        )}
      </div>

      {/* ── Divider ────────────────────────────── */}
      <div className="mx-3 mb-4 h-px" style={{ background: 'var(--glass-border)' }} />

      {/* ── Navigation ─────────────────────────── */}
      <nav className="flex flex-col gap-1 px-2 flex-1">
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <button
            key={id}
            id={`nav-${id}`}
            onClick={() => onNavigate(id)}
            className={`nav-item ${currentPage === id ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? label : undefined}
          >
            <span className="flex-shrink-0">{icon}</span>
            {!collapsed && (
              <span className="text-sm font-medium animate-fade-in">{label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* ── Collapse Toggle ─────────────────────── */}
      <div className="px-2 pb-5">
        <div className="mx-1 mb-3 h-px" style={{ background: 'var(--glass-border)' }} />
        <button
          id="sidebar-toggle"
          onClick={onToggleCollapse}
          className="nav-item w-full"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{ justifyContent: collapsed ? 'center' : 'flex-end' }}
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <>
              <span className="text-xs text-brand-medium animate-fade-in">Collapse</span>
              <ChevronLeft size={16} />
            </>
          )}
        </button>
      </div>

      {/* ── Right border glow ─────────────────── */}
      <div
        className="absolute right-0 top-8 bottom-8 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(165,163,255,0.25), transparent)' }}
      />
    </aside>
  );
}

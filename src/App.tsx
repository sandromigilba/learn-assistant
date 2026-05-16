import { useState } from 'react';
import './index.css';
import type { Page, Message, Mode } from './types';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import ChatWindow from './components/ChatWindow';

export default function App() {
  // ── Navigation state ──────────────────────────────────
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // ── Conversation state (persists across Home↔Chat navigation) ──
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<Mode>('explain');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1e1e30 0%, #111117ff 100%, #1a1a2e 100%)' }}
    >
      {/* ── Sidebar ───────────────────────────────────── */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      {/* ── Main Content ──────────────────────────────── */}
      <main className="flex-1 overflow-hidden">
        {currentPage === 'home' ? (
          <LandingPage onNavigate={handleNavigate} />
        ) : (
          <ChatWindow
            messages={messages}
            onMessagesChange={setMessages}
            mode={mode}
            onModeChange={setMode}
          />
        )}
      </main>
    </div>
  );
}

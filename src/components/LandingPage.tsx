import { BookOpen, HelpCircle, ListChecks, ArrowRight, Zap, Brain, GraduationCap } from 'lucide-react';
import type { Page } from '../types';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const FEATURES = [
  {
    id: 'explain',
    icon: <BookOpen size={24} />,
    title: 'Deep Explain',
    color: '#a5a3ff',
    gradient: 'linear-gradient(135deg, rgba(165,163,255,0.2), rgba(165,163,255,0.05))',
    description:
      'Get clear, layered explanations of any topic — from quantum physics to ancient history — using analogies that actually make sense.',
    badge: 'Explain Mode',
  },
  {
    id: 'quiz',
    icon: <HelpCircle size={24} />,
    title: 'Interactive Quiz',
    color: '#7c7abf',
    gradient: 'linear-gradient(135deg, rgba(124,122,191,0.2), rgba(124,122,191,0.05))',
    description:
      'Test your knowledge with AI-generated questions. Get instant feedback, hints, and explanations to reinforce what you\'ve learned.',
    badge: 'Quiz Mode',
  },
  {
    id: 'summary',
    icon: <ListChecks size={24} />,
    title: 'Smart Summary',
    color: '#535280',
    gradient: 'linear-gradient(135deg, rgba(83,82,128,0.35), rgba(83,82,128,0.1))',
    description:
      'Paste any text or describe a topic and get a structured, scannable summary with key points and a memorable hook.',
    badge: 'Summary Mode',
  },
];

const STATS = [
  { icon: <Brain size={18} />, label: '3 Learning Modes' },
  { icon: <Zap size={18} />, label: 'Instant AI Responses' },
  { icon: <GraduationCap size={18} />, label: 'Academic Precision' },
];

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="relative h-full overflow-y-auto">

      {/* ── Background Orbs ─────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="orb w-[500px] h-[500px] opacity-20"
          style={{ background: '#a5a3ff', top: '-10%', left: '-5%', animationDuration: '10s' }}
        />
        <div
          className="orb w-[400px] h-[400px] opacity-10"
          style={{ background: '#535280', bottom: '5%', right: '-5%', animationDuration: '13s', animationDelay: '2s' }}
        />
        <div
          className="orb w-[300px] h-[300px] opacity-15"
          style={{ background: '#7c7abf', top: '40%', right: '20%', animationDuration: '8s', animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">

        {/* ── Hero Section ────────────────────────────────── */}
        <div className="text-center mb-16 animate-fade-in-up">
          {/* Logo badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            style={{ border: '1px solid rgba(165,163,255,0.3)' }}
          >
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #a5a3ff, #535280)' }}
            >
              <GraduationCap size={12} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-brand-primary">Powered by Google Gemini</span>
          </div>

          <h1
            className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-none"
          >
            <span className="text-gradient">Learn Anything.</span>
            <br />
            <span className="text-brand-text opacity-90">Understand Everything.</span>
          </h1>

          <p className="text-lg text-brand-medium max-w-xl mx-auto leading-relaxed mb-10">
            Your personal AI tutor that explains, quizzes, and summarizes —
            adapting to your level with academic precision and genuine patience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="get-started"
              onClick={() => onNavigate('chat')}
              className="btn-primary flex items-center gap-2 text-base"
            >
              Get Started
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {STATS.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-brand-medium">
                <span className="text-brand-primary">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Feature Cards ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {FEATURES.map(({ id, icon, title, color, gradient, description, badge }, idx) => (
            <div
              key={id}
              id={`feature-${id}`}
              className="group relative rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{
                background: gradient,
                border: `1px solid ${color}30`,
                animationDelay: `${idx * 0.15}s`,
                boxShadow: `0 4px 24px ${color}10`,
              }}
              onClick={() => onNavigate('chat')}
            >
              {/* Badge */}
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold mb-4"
                style={{ background: `${color}20`, color }}
              >
                {badge}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}20`, color }}
              >
                {icon}
              </div>

              <h3 className="text-lg font-bold text-brand-text mb-2">{title}</h3>
              <p className="text-sm text-brand-medium leading-relaxed">{description}</p>

              {/* Hover arrow */}
              <div
                className="flex items-center gap-1 mt-4 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0"
                style={{ color }}
              >
                Try it now <ArrowRight size={12} />
              </div>

              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 40px ${color}08` }}
              />
            </div>
          ))}
        </div>

        {/* ── How It Works ─────────────────────────────────── */}
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-brand-text mb-2">How it works</h2>
          <p className="text-brand-medium text-sm mb-8">Three simple steps to accelerate your learning</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Choose a Mode', desc: 'Pick Explain, Quiz, or Summary based on what you need.' },
              { step: '02', title: 'Ask Away', desc: 'Type any topic, question, or paste text you want to study.' },
              { step: '03', title: 'Learn & Grow', desc: 'Receive rich, structured AI responses tailored to your needs.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-extrabold mb-3 text-brand-bg"
                  style={{ background: 'linear-gradient(135deg, #a5a3ff, #7c7abf)' }}
                >
                  {step}
                </div>
                <h3 className="font-semibold text-brand-text mb-1">{title}</h3>
                <p className="text-xs text-brand-medium leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────── */}
        <p className="text-center text-xs text-brand-dark mt-10">
          Built with React · Vite · Tailwind CSS · Google Gemini API
        </p>
      </div>
    </div>
  );
}

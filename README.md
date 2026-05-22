# LearnAI — AI-Powered Study Assistant

> Aplikasi web untuk belajar berbantuan AI dengan tiga mode: **Explain**, **Quiz**, dan **Summary** — didukung Google Gemini API.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Fitur

| Mode | Deskripsi |
|---|---|
| 📖 **Explain** | Penjelasan mendalam, berlapis, dengan analogi nyata |
| 🎯 **Quiz** | AI bertanya, evaluasi jawaban, berikan feedback |
| 📋 **Summary** | Ringkasan terstruktur dengan poin-poin utama |

- 💬 Chat interaktif dengan bubble User vs AI Tutor
- 🌐 AI menjawab dalam bahasa yang sama dengan pengguna
- 🎨 Desain Modern Glassmorphism (dark mode)
- 📱 Responsive — bisa digunakan di mobile maupun desktop
- ⚡ Hot reload dengan Vite

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v3 + Custom Glassmorphism
- **Icons:** Lucide React
- **AI:** Google Gemini API (`gemini-2.5-flash-lite`)
- **Markdown:** react-markdown + remark-gfm

---

## 🚀 Cara Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/sandromigilba/learn-assistant.git
cd learn-assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Konfigurasi API Key

```bash
# Salin file contoh
copy .env.example .env   # Windows
cp .env.example .env     # Mac/Linux
```

Buka file `.env` dan isi dengan API key dari [Google AI Studio](https://aistudio.google.com/app/apikey):

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 4. Jalankan aplikasi

```bash
npm run dev
```

Buka browser di **http://localhost:5173**

---

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Sidebar.tsx          # Navigasi sidebar (collapsible)
│   ├── LandingPage.tsx      # Halaman utama / hero
│   ├── ChatWindow.tsx       # Area chat utama
│   ├── ChatBubble.tsx       # Bubble pesan user & AI
│   ├── ModeSelector.tsx     # Toggle Explain/Quiz/Summary
│   └── TypingIndicator.tsx  # Animasi "AI sedang mengetik"
├── constants/
│   └── systemPrompts.ts     # System prompt per mode
├── services/
│   └── geminiService.ts     # Wrapper Gemini REST API
├── types/
│   └── index.ts             # TypeScript types
├── App.tsx                  # Root komponen + state global
└── index.css                # Tailwind + glassmorphism utilities
```

---

## 📝 Scripts

```bash
npm run dev      # Jalankan dev server
npm run build    # Build untuk production
npm run preview  # Preview hasil build
npm run lint     # Cek kode dengan ESLint
```

---

## 📄 Lisensi

MIT License — bebas digunakan dan dimodifikasi.

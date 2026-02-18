"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils";

/* ------------------------------------------------------------------ */
/*  Knowledge base – quick-reply topics                                */
/* ------------------------------------------------------------------ */

interface KBEntry {
  label: string;
  question: string;
  answer: string;
}

const TOPICS: KBEntry[] = [
  {
    label: "How do I add a plugin?",
    question: "How do I add a new plugin?",
    answer: `To add a plugin:

1. Create a folder: plugins/my-tool/
2. Add a manifest.json with name, slug, description, author, version, category, and tags.
3. Create an index.tsx that exports a default React component with "use client" at the top.
4. Register it in src/core/plugin-registry.ts by importing the manifest and adding a lazy-loaded entry.
5. Run npm run dev and visit /tools/my-tool to test.

The slug must be URL-safe (lowercase, hyphens, no spaces).`,
  },
  {
    label: "Project architecture",
    question: "What is the project architecture?",
    answer: `The project follows a modular plugin architecture built on Next.js (App Router):

  plugins/          Plugin source (one folder per tool)
  src/app/          Next.js pages & layouts
  src/components/   Shared UI primitives (Radix-based)
  src/core/         Plugin registry & loader
  src/types/        TypeScript interfaces
  src/utils/        Shared helpers (cn, etc.)

Each plugin is fully self-contained with its own manifest.json and index.tsx. Plugins are lazy-loaded and code-split automatically via dynamic imports.`,
  },
  {
    label: "Plugin guidelines",
    question: "What are the plugin guidelines?",
    answer: `Key rules for plugins:

- Must include "use client" directive at the top.
- Must export default a React component.
- Must be fully self-contained — no imports from other plugins.
- Use Tailwind CSS for styling; UI primitives from src/components/ui/ are available.
- Keep dependencies minimal — prefer browser-native APIs.
- TypeScript strict mode — avoid using "any".
- Make sure UI is accessible (labels, focus states, semantic HTML) and responsive.`,
  },
  {
    label: "How does the registry work?",
    question: "How does the plugin registry work?",
    answer: `The registry lives in src/core/plugin-registry.ts. It is an array of entries, each containing:

  manifest  — imported from plugins/<slug>/manifest.json
  load()    — a dynamic import function: () => import("../../plugins/<slug>")

Helper functions:
  getAllPlugins()          returns all manifests
  getPluginBySlug(slug)   finds an entry by slug
  getPluginsByCategory()  groups manifests by category

The tool page at /tools/[slug] uses getPluginBySlug to lazy-load the correct component at runtime.`,
  },
  {
    label: "How to submit a PR?",
    question: "How do I submit a pull request?",
    answer: `Pull request process:

1. Fork the repository.
2. Create a branch: feat/plugin-my-tool
3. Add your plugin following the contribution steps.
4. Run "npm run build" to verify there are no errors.
5. Open a PR with a clear description of your tool.

Make sure your plugin doesn't modify core files unless you're adding a new system-level feature.`,
  },
  {
    label: "Tech stack",
    question: "What tech stack does this project use?",
    answer: `The project is built with:

  Next.js 16 (App Router, Turbopack)
  React 19
  TypeScript (strict mode)
  Tailwind CSS 4
  Radix UI primitives (tabs, tooltip, dialog, etc.)
  class-variance-authority (CVA) for component variants

Everything runs 100% client-side — no backend or database required. Plugins use browser-native APIs.`,
  },
];

/* ------------------------------------------------------------------ */
/*  Chat message types                                                 */
/* ------------------------------------------------------------------ */

interface Message {
  id: number;
  role: "assistant" | "user";
  text: string;
}

const GREETING: Message = {
  id: 0,
  role: "assistant",
  text: "Hi! I can help you understand this project. Pick a topic below or type a question.",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function pushMessages(user: string, reply: string) {
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", text: user },
      { id: nextId.current++, role: "assistant", text: reply },
    ]);
  }

  function handleTopic(entry: KBEntry) {
    pushMessages(entry.question, entry.answer);
  }

  function handleSend() {
    const q = input.trim();
    if (!q) return;
    setInput("");

    const lower = q.toLowerCase();

    // Try to match a KB topic by keyword overlap
    const scored = TOPICS.map((t) => {
      const words = t.label.toLowerCase().split(/\s+/);
      const hits = words.filter((w) => lower.includes(w)).length;
      return { entry: t, hits };
    });
    scored.sort((a, b) => b.hits - a.hits);

    if (scored[0] && scored[0].hits >= 1) {
      pushMessages(q, scored[0].entry.answer);
    } else {
      pushMessages(
        q,
        "I don't have a specific answer for that. Try one of the quick topics below, or check the CONTRIBUTING.md file in the repository for full details."
      );
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close support chat" : "Open support chat"}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-200",
          open
            ? "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200"
            : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/25"
        )}
      >
        {open ? (
          /* X icon */
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        ) : (
          /* Chat icon */
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[360px] max-h-[520px] flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-200">Support</p>
              <p className="text-[11px] text-zinc-500">Contributing & Architecture</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0 max-h-[340px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line",
                  msg.role === "assistant"
                    ? "bg-zinc-800 text-zinc-300 self-start"
                    : "bg-indigo-600/20 text-indigo-200 ml-auto"
                )}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick topics */}
          <div className="px-4 py-2 border-t border-zinc-800/60">
            <div className="flex flex-wrap gap-1.5">
              {TOPICS.map((t) => (
                <button
                  key={t.label}
                  onClick={() => handleTopic(t)}
                  className="text-[11px] font-medium px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700/50 text-zinc-400 hover:text-zinc-200 hover:border-indigo-500/30 transition-colors"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-3 py-2.5 border-t border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 h-8 bg-zinc-800 border border-zinc-700/50 rounded-lg px-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/40"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

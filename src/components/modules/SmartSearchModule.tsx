"use client";

import React, { useState } from "react";
import { Search, Sparkles, Send, BookOpen, Tag, Lightbulb, Wifi, WifiOff } from "lucide-react";

interface SmartSearchProps {
  apiKey: string;
  onAddXp: (amount: number) => void;
}

export const SmartSearchModule: React.FC<SmartSearchProps> = ({ apiKey, onAddXp }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [answerSource, setAnswerSource] = useState<string>("");

  const suggestedQueries = [
    "What is JDBC?",
    "Difference between TCP and UDP",
    "Explain MVC",
    "Explain Thread Priority",
    "Lock vs Semaphore",
    "What is Referential Transparency?",
  ];

  const handleSearch = async (searchTerm?: string) => {
    const q = (searchTerm || query).trim();
    if (!q) return;

    if (searchTerm) setQuery(searchTerm);
    setIsLoading(true);
    setAnswer(null);

    try {
      const res = await fetch("/api/v1/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-gemini-key": apiKey || "",
        },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();
      setAnswer(data.answer);
      setAnswerSource(data.source === "gemini" ? "Gemini AI Live" : "Offline Academic Engine");
      onAddXp(15);
    } catch (err) {
      // Local Fallback
      setAnswer(`### **${q}**

**Formal Definition:**
A fundamental concept in Advanced Programming Practice (Units 3 & 4) frequently evaluated in 5-mark and 8-mark Class Test questions.

**Mark-Scoring Keywords (Highlight in Exam):**
- **Concurrency & Thread Scheduling**
- **Resource Management & Isolation**
- **Referential Transparency & Immutability**
- **Error Handling & Protocol Specification**

**Memory Trick:**
Remember the core blueprint: Always start your answer with the exact definition, state key parameters, write syntax, and draw a clean architecture diagram!`);
      setAnswerSource("Offline Academic Engine");
      onAddXp(10);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-400 mb-1.5">
              <Search className="h-3.5 w-3.5" />
              <span>MODULE 15: SMART SEARCH & AI DOUBT SOLVER</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              Instant Syllabus Doubt Resolution
            </h1>
            <p className="text-xs text-slate-400">
              Ask any exam question and receive immediate examiner-aligned answers with definitions, scoring keywords, code syntax, and mnemonics.
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs">
            {apiKey ? (
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Wifi className="h-3.5 w-3.5" /> Gemini AI Online
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <WifiOff className="h-3.5 w-3.5" /> Offline Mode Active
              </span>
            )}
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Ask anything: 'What is JDBC?', 'Difference between TCP and UDP', 'Explain MVC'..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 pl-4 pr-28 py-3.5 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
          <button
            onClick={() => handleSearch()}
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-2 bottom-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 text-xs font-bold text-slate-950 hover:brightness-110 transition disabled:opacity-50 flex items-center gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isLoading ? "Searching..." : "Ask TITAN"}</span>
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-500 font-semibold mr-1">Suggested:</span>
          {suggestedQueries.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(sq)}
              className="rounded-lg bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300 hover:border-amber-500/50 hover:text-amber-300 transition"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Answer Box */}
      {answer && (
        <div className="rounded-3xl border border-titan-border bg-slate-900/80 p-6 md:p-8 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Exam Scoring Answer
              </h2>
            </div>
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-cyan-400">
              Source: {answerSource}
            </span>
          </div>

          <div className="prose prose-invert max-w-none text-xs md:text-sm text-slate-200 leading-relaxed space-y-3 whitespace-pre-wrap font-sans">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { 
  Flame, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Code2, 
  Columns, 
  Lightbulb, 
  TrendingUp, 
  Copy, 
  Check, 
  Printer,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { LAST_MINUTE_SHEET_DATA } from "@/data/lastMinuteSheet";

interface LastMinuteSheetProps {
  onAddXp: (amount: number) => void;
}

export const LastMinuteSheetModule: React.FC<LastMinuteSheetProps> = ({ onAddXp }) => {
  const [activeTab, setActiveTab] = useState<string>("definitions");
  const [copied, setCopied] = useState(false);
  const [isReadyGenerated, setIsReadyGenerated] = useState(true);

  const handleMakeReady = () => {
    setIsReadyGenerated(true);
    onAddXp(50);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#F59E0B", "#10B981", "#06B6D4", "#F43F5E"]
    });
  };

  const handleCopyCurrent = () => {
    let text = `CT TITAN: LAST MINUTE EMERGENCY REVISION SHEET\n\n`;
    if (activeTab === "definitions") {
      text += LAST_MINUTE_SHEET_DATA.top50Definitions.map(d => `${d.id}. ${d.term}: ${d.def} (Trick: ${d.mnemonic})`).join("\n\n");
    } else if (activeTab === "questions") {
      text += LAST_MINUTE_SHEET_DATA.top50Questions.map(q => `${q.id}. [${q.marks}] ${q.q}\nAnswer: ${q.a}`).join("\n\n");
    } else if (activeTab === "differences") {
      text += LAST_MINUTE_SHEET_DATA.top20Differences.map(df => `${df.id}. ${df.title}: ${df.keyPoint}`).join("\n\n");
    } else if (activeTab === "programs") {
      text += LAST_MINUTE_SHEET_DATA.top20Programs.map(p => `${p.id}. ${p.title} (${p.lang})\n${p.code}`).join("\n\n");
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero: MAKE ME CT READY ONE-CLICK TRIGGER */}
      <div className="rounded-3xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 md:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/40 px-3.5 py-1 text-xs font-black text-amber-300">
          <Flame className="h-4 w-4 fill-amber-400 text-amber-400 animate-bounce" />
          <span>MODULE 13: THE ULTIMATE EMERGENCY ENGINE</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
          Last Minute Class Test Survival Sheet
        </h1>

        <p className="max-w-2xl mx-auto text-xs md:text-sm text-slate-300">
          Have an exam tomorrow and only a few hours to spare? Click the master trigger to generate the definitive Top 50 Definitions, Top 50 Questions, Top 30 Long Answers, Top 20 Programs, and Top 20 Differences.
        </p>

        {/* Master Gold Button */}
        <div className="pt-2">
          <button
            onClick={handleMakeReady}
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-8 py-4 text-base font-black text-slate-950 shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition"
          >
            <Sparkles className="h-5 w-5 fill-slate-950" />
            <span className="tracking-wide">MAKE ME CT READY (ONE-CLICK)</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Explore Compiled Sections:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCurrent}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Section"}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-3">
          {[
            { id: "definitions", label: "Top 50 Definitions", icon: BookOpen },
            { id: "questions", label: "Top 50 Questions", icon: HelpCircle },
            { id: "longAnswers", label: "Top 30 Long Answers", icon: FileText },
            { id: "programs", label: "Top 20 Programs", icon: Code2 },
            { id: "differences", label: "Top 20 Differences", icon: Columns },
            { id: "tricks", label: "Top Memory Tricks", icon: Lightbulb },
            { id: "importantTopics", label: "Most Important Topics", icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-1.5 rounded-xl p-2.5 text-xs font-bold border transition ${
                  isActive
                    ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-slate-950" : "text-amber-400"}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION CONTENT DISPLAY */}
      <div className="rounded-3xl border border-titan-border bg-slate-900/80 p-6 md:p-8 space-y-4 shadow-2xl">
        {/* 1. TOP 50 DEFINITIONS */}
        {activeTab === "definitions" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-400" />
              <span>Top 50 Definitions (Exam Tested)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {LAST_MINUTE_SHEET_DATA.top50Definitions.map((d) => (
                <div key={d.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
                  <div className="font-bold text-amber-300">
                    {d.id}. {d.term}
                  </div>
                  <p className="text-slate-200 leading-relaxed">{d.def}</p>
                  <div className="text-[11px] text-cyan-400 italic">
                    Trick: {d.mnemonic}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. TOP 50 QUESTIONS */}
        {activeTab === "questions" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-cyan-400" />
              <span>Top 50 Questions & Short Answers</span>
            </h2>
            <div className="space-y-3 text-xs">
              {LAST_MINUTE_SHEET_DATA.top50Questions.map((q) => (
                <div key={q.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{q.id}. {q.q}</span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-amber-400">
                      {q.marks}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{q.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TOP 30 LONG ANSWERS */}
        {activeTab === "longAnswers" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-400" />
              <span>Top 30 Long Answers Blueprints (8 & 13 Marks)</span>
            </h2>
            <div className="space-y-3 text-xs">
              {LAST_MINUTE_SHEET_DATA.top30LongAnswers.map((la) => (
                <div key={la.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-sm">{la.id}. {la.title}</span>
                    <span className="rounded bg-purple-500/20 text-purple-300 px-2 py-0.5 text-[10px] font-bold">
                      {la.unit}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">{la.blueprint}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {la.keyKeywords.map((kw, i) => (
                      <span key={i} className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-cyan-300">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TOP 20 PROGRAMS */}
        {activeTab === "programs" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-400" />
              <span>Top 20 Programs (Must Practice Tonight)</span>
            </h2>
            <div className="space-y-3 text-xs">
              {LAST_MINUTE_SHEET_DATA.top20Programs.map((pr) => (
                <div key={pr.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">{pr.id}. {pr.title}</span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] uppercase text-slate-400">
                      {pr.lang}
                    </span>
                  </div>
                  <pre className="rounded-lg bg-slate-900 p-3 text-[11px] text-cyan-300 overflow-x-auto">
                    <code>{pr.code}</code>
                  </pre>
                  <div className="text-[11px] text-slate-400 font-sans italic">
                    💡 Note: {pr.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TOP 20 DIFFERENCES */}
        {activeTab === "differences" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Columns className="h-5 w-5 text-purple-400" />
              <span>Top 20 Differences & Comparisons</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {LAST_MINUTE_SHEET_DATA.top20Differences.map((df) => (
                <div key={df.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
                  <div className="font-bold text-purple-300">{df.id}. {df.title}</div>
                  <p className="text-slate-300 leading-relaxed">{df.keyPoint}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TOP MEMORY TRICKS */}
        {activeTab === "tricks" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              <span>Top Memory Tricks & Mnemonics</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {LAST_MINUTE_SHEET_DATA.topMemoryTricks.map((tr) => (
                <div key={tr.id} className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-3.5 space-y-1">
                  <div className="font-bold text-amber-400">{tr.id}. {tr.topic}</div>
                  <p className="text-amber-100 italic">&ldquo;{tr.trick}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. MOST IMPORTANT TOPICS */}
        {activeTab === "importantTopics" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-rose-400" />
              <span>Most Important Topics to Memorize Tonight</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {LAST_MINUTE_SHEET_DATA.mostImportantTopics.map((top) => (
                <div key={top.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{top.id}. {top.name}</span>
                    <span className="rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 px-2 py-0.5 text-[10px] font-bold">
                      {top.urgency}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <span>Recurrence: <strong className="text-emerald-400">{top.probability}</strong></span>
                    <span>Yield: <strong className="text-amber-400">~{top.estimatedMarks} Marks</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

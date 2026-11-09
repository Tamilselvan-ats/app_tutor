"use client";

import React, { useState } from "react";
import { Moon, Clock, Lightbulb, BookOpen, Code2, Columns, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { ONE_NIGHT_REVISION_DATA, RevisionPlan } from "@/data/oneNightRevision";

interface OneNightRevisionProps {
  onAddXp: (amount: number) => void;
}

export const OneNightRevisionModule: React.FC<OneNightRevisionProps> = ({ onAddXp }) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("1 Hour");

  const plan: RevisionPlan = ONE_NIGHT_REVISION_DATA[selectedDuration] || ONE_NIGHT_REVISION_DATA["1 Hour"];

  const handleSelect = (dur: string) => {
    setSelectedDuration(dur);
    onAddXp(15);
  };

  return (
    <div className="space-y-6">
      {/* Header & Sprint Switcher */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs font-bold text-purple-400 mb-1.5">
              <Moon className="h-3.5 w-3.5" />
              <span>MODULE 7: ONE NIGHT REVISION ENGINE</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              Emergency Cramming & Time-Budget Sprints
            </h1>
            <p className="text-xs text-slate-400">
              Select your available study time tonight. CT TITAN generates a hyper-targeted sprint with definitions, FAQs, scoring concepts, comparisons, and programs.
            </p>
          </div>

          <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs font-bold text-purple-300">
            {plan.targetMarks}
          </span>
        </div>

        {/* The 4 Required Duration Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {["30 Minutes", "1 Hour", "2 Hours", "3 Hours"].map((dur) => (
            <button
              key={dur}
              onClick={() => handleSelect(dur)}
              className={`rounded-xl py-3 px-4 text-xs font-bold border transition flex items-center justify-center gap-2 ${
                selectedDuration === dur
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/20"
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>{dur} Sprint</span>
            </button>
          ))}
        </div>

        {/* Tagline */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs font-bold text-amber-300 text-center">
          {plan.tagline}
        </div>
      </div>

      {/* 1. Important Definitions */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-5 space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-amber-400" />
          <span>1. Important Definitions (Instant Marks)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {plan.definitions.map((d, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1.5">
              <div className="font-bold text-white text-sm">{d.term}</div>
              <p className="text-slate-300 leading-relaxed">{d.def}</p>
              <div className="text-[11px] text-amber-400 italic">
                🧠 Memory Trick: {d.mnemonic}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Frequently Asked Questions */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-5 space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
          <span>2. Frequently Asked Questions (CT Guaranteed)</span>
        </h2>
        <div className="space-y-2.5 text-xs">
          {plan.faqs.map((f, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 text-sm">{f.q}</span>
                <span className="rounded bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                  {f.marks}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Most Scoring Concepts */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-5 space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Zap className="h-4 w-4 text-emerald-400" />
          <span>3. Most Scoring Concepts (Maximum Marks Blueprint)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {plan.scoringConcepts.map((sc, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2">
              <div className="font-bold text-emerald-400 text-sm">{sc.title}</div>
              <p className="text-slate-300">{sc.strategy}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {sc.keywords.map((kw, j) => (
                  <span key={j} className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Comparisons */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-5 space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Columns className="h-4 w-4 text-purple-400" />
          <span>4. High-Yield Differences & Comparisons</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {plan.comparisons.map((c, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
              <div className="font-bold text-purple-300">{c.title}</div>
              <p className="text-slate-300">{c.keyDiff}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Coding Questions */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-5 space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Code2 className="h-4 w-4 text-amber-400" />
          <span>5. High-Impact Coding Blueprints</span>
        </h2>
        <div className="space-y-3 text-xs">
          {plan.codingQuestions.map((code, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">{code.title}</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] uppercase text-slate-400">
                  {code.lang}
                </span>
              </div>
              <pre className="rounded-lg bg-slate-900 p-3 text-[11px] text-cyan-300 overflow-x-auto">
                <code>{code.snippet}</code>
              </pre>
              <div className="text-[11px] text-rose-400 font-sans">
                ⚠️ <strong>Exam Trap to Avoid:</strong> {code.trapToAvoid}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

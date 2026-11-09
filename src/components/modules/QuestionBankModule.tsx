"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle, AlertTriangle, Search, BookOpen, Lightbulb, Zap, Tag } from "lucide-react";
import { QUESTIONS_BANK, QuestionItem } from "@/data/questions";

interface QuestionBankProps {
  onRecordWeakness: (topicId: string, topicName: string, unit: string, isWrong: boolean) => void;
  onAddXp: (amount: number) => void;
}

export const QuestionBankModule: React.FC<QuestionBankProps> = ({
  onRecordWeakness,
  onAddXp,
}) => {
  const [selectedMarks, setSelectedMarks] = useState<number | "all">("all");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>({});

  const filteredQuestions = QUESTIONS_BANK.filter((q) => {
    const matchMarks = selectedMarks === "all" || q.marks === selectedMarks;
    const matchUnit = selectedUnit === "all" || q.unit === selectedUnit;
    const matchSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.scoringKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchMarks && matchUnit && matchSearch;
  });

  const handleMaster = (q: QuestionItem) => {
    setMasteredIds((prev) => ({ ...prev, [q.id]: true }));
    onRecordWeakness(q.id, q.topic, q.unit, false);
    onAddXp(15);
  };

  const handleMarkWeak = (q: QuestionItem) => {
    setMasteredIds((prev) => ({ ...prev, [q.id]: false }));
    onRecordWeakness(q.id, q.topic, q.unit, true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Filters */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400 mb-1.5">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>MODULE 3: CT QUESTION BANK</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              University Pattern CT Question Vault
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Targeted 2M, 5M, 8M & 13M questions with highlighted scoring keywords, memory tricks, and diagrams.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question, keyword..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
          {/* Mark Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Marks:</span>
            {(["all", 2, 5, 8, 13] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMarks(m)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold border transition ${
                  selectedMarks === m
                    ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                {m === "all" ? "All Marks" : `${m} Marks`}
              </button>
            ))}
          </div>

          {/* Unit Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Unit:</span>
            {["all", "Unit 3", "Unit 4"].map((u) => (
              <button
                key={u}
                onClick={() => setSelectedUnit(u)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition ${
                  selectedUnit === u
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                    : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                {u === "all" ? "All Units" : u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400 text-sm">
            No questions found matching your filter criteria. Try searching another topic!
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isMastered = masteredIds[q.id];
            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all p-5 md:p-6 space-y-4 ${
                  isMastered
                    ? "border-emerald-500/30 bg-emerald-950/10"
                    : "border-titan-border bg-slate-900/70 hover:border-slate-700"
                }`}
              >
                {/* Question Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono border ${
                      q.marks === 13 ? "bg-purple-500/20 border-purple-500/40 text-purple-300" :
                      q.marks === 8 ? "bg-amber-500/20 border-amber-500/40 text-amber-300" :
                      q.marks === 5 ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" :
                      "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                    }`}>
                      {q.marks} MARKS
                    </span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                      {q.unit}
                    </span>
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                      &bull; {q.topic}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMaster(q)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition ${
                        isMastered
                          ? "bg-emerald-500 text-slate-950 border-emerald-500"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
                      }`}
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>{isMastered ? "Mastered" : "I Know This (+15 XP)"}</span>
                    </button>
                    <button
                      onClick={() => handleMarkWeak(q)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 transition"
                      title="Add to Weak Topics List"
                    >
                      Needs Review
                    </button>
                  </div>
                </div>

                {/* Question Title */}
                <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                  {q.question}
                </h3>

                {/* Model Answer */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                    <span>Examiner-Grade Model Answer:</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                    {q.answer}
                  </p>
                </div>

                {/* Key Points & Scoring Keywords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Key Points */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 space-y-1.5">
                    <div className="font-bold text-cyan-300 text-[11px] uppercase tracking-wider">
                      Key Exam Points:
                    </div>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {q.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 mt-0.5">&bull;</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mark-Scoring Technical Keywords */}
                  <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-3 space-y-1.5">
                    <div className="font-bold text-amber-400 text-[11px] uppercase tracking-wider flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      <span>Mark-Scoring Keywords (Must Underline):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {q.scoringKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Memory Trick / Diagram */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-300">Memory Trick: </span>
                      <span className="italic text-slate-300">{q.memoryTrick}</span>
                    </div>
                  </div>
                </div>

                {/* ASCII Diagram if present */}
                {q.diagramAscii && (
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-cyan-300 overflow-x-auto whitespace-pre">
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                      📐 Architecture Diagram to Sketch:
                    </div>
                    {q.diagramAscii}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { BookOpen, Search, Lightbulb, Copy, Check, Tag } from "lucide-react";
import { DEFINITIONS_DATA, DefinitionItem } from "@/data/definitions";

export const DefinitionsMasterModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = DEFINITIONS_DATA.filter((d) => {
    const matchUnit = selectedUnit === "all" || d.unit === selectedUnit;
    const matchSearch =
      d.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.memoryTrick.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchUnit && matchSearch;
  });

  const handleCopy = (d: DefinitionItem) => {
    const text = `${d.topic}\nDefinition: ${d.definition}\nSimple Explanation: ${d.simpleExplanation}\nMemory Trick: ${d.memoryTrick}`;
    navigator.clipboard.writeText(text);
    setCopiedId(d.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-400 mb-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              <span>MODULE 8: DEFINITIONS MASTER</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              Syllabus Terminology & Memory Mnemonics
            </h1>
            <p className="text-xs text-slate-400">
              For every topic: Formal Definition, Simple Plain-English Explanation, and One-Line Memory Trick.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search definition or term..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Unit Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Scope:</span>
          {["all", "Unit 3", "Unit 4"].map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={`rounded-lg px-3 py-1 text-xs font-bold border transition ${
                selectedUnit === u
                  ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20"
                  : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
            >
              {u === "all" ? "All Terms (50+)" : u}
            </button>
          ))}
          <span className="text-slate-500 ml-auto hidden sm:inline">
            Showing {filtered.length} terms
          </span>
        </div>
      </div>

      {/* Grid of Definitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="rounded-2xl border border-titan-border bg-slate-900/70 p-5 space-y-3.5 hover:border-slate-700 transition relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{d.topic}</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium">
                  {d.unit}
                </span>
              </div>
              <button
                onClick={() => handleCopy(d)}
                className="text-slate-400 hover:text-amber-400 transition p-1"
                title="Copy definition card"
              >
                {copiedId === d.id ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* Formal Definition */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Formal Academic Definition:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {d.definition}
              </p>
            </div>

            {/* Simple Explanation */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Simple Plain-English Explanation:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {d.simpleExplanation}
              </p>
            </div>

            {/* One-Line Memory Trick */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-3 flex items-start gap-2.5">
              <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                  One-Line Memory Trick:
                </span>
                <p className="text-xs text-amber-200 italic font-medium mt-0.5">
                  &ldquo;{d.memoryTrick}&rdquo;
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1 pt-1">
              {d.examKeywords.map((kw, i) => (
                <span key={i} className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] text-slate-400 font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

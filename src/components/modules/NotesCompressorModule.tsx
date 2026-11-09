"use client";

import React, { useState } from "react";
import { Minimize2, Copy, Check, Printer, Clock, FileText, Sparkles } from "lucide-react";
import { COMPRESSED_NOTES_DATA, CompressedNotesTier } from "@/data/notesCompressor";

export const NotesCompressorModule: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>("5-page");
  const [copied, setCopied] = useState(false);

  const activeTier: CompressedNotesTier = COMPRESSED_NOTES_DATA[selectedTier] || COMPRESSED_NOTES_DATA["5-page"];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTier.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-400 mb-1.5">
              <Minimize2 className="h-3.5 w-3.5" />
              <span>MODULE 12: AI NOTES COMPRESSOR</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              100-Page Syllabus Distillation Engine
            </h1>
            <p className="text-xs text-slate-400">
              Transform overwhelming textbook notes into dense, high-yield summary tiers based on your exact remaining study hours.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied" : "Copy Summary"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              <Printer className="h-4 w-4" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>

        {/* The 4 Required Summary Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-800">
          {[
            { id: "10-page", label: "10-Page Summary", time: "30 Mins Read" },
            { id: "5-page", label: "5-Page Summary", time: "15 Mins Read" },
            { id: "2-page", label: "2-Page Summary", time: "7 Mins Read" },
            { id: "1-page", label: "One-Page Revision", time: "3 Mins Cheat Sheet" },
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`rounded-2xl p-3 text-left border transition ${
                selectedTier === tier.id
                  ? "bg-amber-500 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/20 font-bold"
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              <div className="text-xs font-extrabold">{tier.label}</div>
              <div className={`text-[10px] mt-0.5 ${selectedTier === tier.id ? "text-slate-950/80 font-semibold" : "text-slate-400"}`}>
                {tier.time}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Compressed Document Display */}
      <div className="rounded-3xl border border-titan-border bg-slate-900/80 p-6 md:p-8 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-0.5 text-xs font-bold font-mono">
                {activeTier.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeTier.wordCount}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-1">
              {activeTier.name}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
            <Clock className="h-4 w-4" />
            <span>Estimated Reading Time: ~{activeTier.readingTimeMinutes} Minutes</span>
          </div>
        </div>

        {/* Content Box */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5 md:p-6 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto">
          {activeTier.content}
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw, ArrowRight, ShieldAlert, Sparkles, BookOpen } from "lucide-react";

interface WeaknessItem {
  id?: number;
  topic_id: string;
  topic_name: string;
  unit: string;
  wrong_count: number;
  revision_count: number;
  status: "weak" | "moderate" | "strong";
  last_reviewed?: string;
}

interface WeaknessDetectorProps {
  weaknesses: WeaknessItem[];
  onReviewTopic: (topicId: string, topicName: string, unit: string) => void;
  onAddXp: (amount: number) => void;
}

export const WeaknessDetectorModule: React.FC<WeaknessDetectorProps> = ({
  weaknesses,
  onReviewTopic,
  onAddXp,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = weaknesses.filter((w) => {
    if (filterStatus === "all") return true;
    return w.status === filterStatus;
  });

  const weakCount = weaknesses.filter((w) => w.status === "weak").length;
  const modCount = weaknesses.filter((w) => w.status === "moderate").length;
  const strongCount = weaknesses.filter((w) => w.status === "strong").length;

  const handleFix = (w: WeaknessItem) => {
    onReviewTopic(w.topic_id, w.topic_name, w.unit);
    onAddXp(20);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-bold text-rose-400">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>MODULE 6: WEAKNESS DETECTOR</span>
        </div>
        <h1 className="text-xl md:text-2xl font-black text-white">
          Active Diagnostic Weak Topics Ledger
        </h1>
        <p className="text-xs text-slate-400">
          Continuous tracking of wrong answers and forgotten concepts. Fix weak areas tonight to convert border-line grades into distinction marks.
        </p>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-center">
            <span className="text-rose-400 font-semibold text-[11px]">Weak (Urgent Action)</span>
            <div className="text-2xl font-black text-rose-400 font-mono mt-0.5">{weakCount}</div>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-center">
            <span className="text-amber-400 font-semibold text-[11px]">Moderate Review</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">{modCount}</div>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-center">
            <span className="text-emerald-400 font-semibold text-[11px]">Mastered / Strong</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{strongCount}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Filter:</span>
          {["all", "weak", "moderate", "strong"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition capitalize ${
                filterStatus === st
                  ? "bg-amber-500 text-slate-950 border-amber-500 font-bold"
                  : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Weak Topics List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400 text-xs">
            No topics currently in this status bracket.
          </div>
        ) : (
          filtered.map((w, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-4 sm:p-5 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                w.status === "weak"
                  ? "border-rose-500/30 bg-rose-950/10"
                  : w.status === "moderate"
                  ? "border-amber-500/30 bg-amber-950/10"
                  : "border-emerald-500/30 bg-emerald-950/10"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                    w.status === "weak"
                      ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                      : w.status === "moderate"
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                      : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  }`}>
                    {w.status}
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                    {w.unit}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {w.topic_name}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-0.5">
                  <span>Wrong Count: <strong className="text-rose-400 font-mono">{w.wrong_count}</strong></span>
                  <span>Revision Count: <strong className="text-cyan-400 font-mono">{w.revision_count}</strong></span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleFix(w)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  w.status === "strong"
                    ? "bg-slate-800 border border-slate-700 text-emerald-400 hover:bg-slate-750"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-110"
                }`}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{w.status === "strong" ? "Revise Again (+20 XP)" : "Fix This Weakness (+20 XP)"}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

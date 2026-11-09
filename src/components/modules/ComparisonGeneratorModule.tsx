"use client";

import React, { useState } from "react";
import { Columns, Copy, Check, Printer, Lightbulb, BookOpen } from "lucide-react";
import { COMPARISONS_DATA, ComparisonTable } from "@/data/comparisons";

export const ComparisonGeneratorModule: React.FC = () => {
  const [selectedTableId, setSelectedTableId] = useState<string>("thread-vs-process");
  const [copied, setCopied] = useState(false);

  const activeTable = COMPARISONS_DATA.find((t) => t.id === selectedTableId) || COMPARISONS_DATA[0];

  const handleCopyTable = () => {
    let text = `${activeTable.title} (${activeTable.examWeight})\n`;
    text += `Mnemonic: ${activeTable.summaryMemoryMnemonic}\n\n`;
    activeTable.rows.forEach((r) => {
      text += `[${r.parameter}]\n- ${activeTable.conceptA}: ${r.itemA}\n- ${activeTable.conceptB}: ${r.itemB}\n${r.itemC ? `- ${activeTable.conceptC}: ${r.itemC}\n` : ""}- Distinction: ${r.distinction}\n\n`;
    });

    navigator.clipboard.writeText(text);
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
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs font-bold text-purple-400 mb-1.5">
              <Columns className="h-3.5 w-3.5" />
              <span>MODULE 9: COMPARISON GENERATOR</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              CT Differences Matrix & Tabular Vault
            </h1>
            <p className="text-xs text-slate-400">
              Complete, examiner-aligned comparison tables for all 12 required syllabus topics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTable}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied" : "Copy Table"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Quick Select Buttons for All 12 Comparisons */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
          {COMPARISONS_DATA.map((tbl) => (
            <button
              key={tbl.id}
              onClick={() => setSelectedTableId(tbl.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition ${
                selectedTableId === tbl.id
                  ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20 font-bold"
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              {tbl.title}
            </button>
          ))}
        </div>
      </div>

      {/* Active Comparison Matrix */}
      <div className="rounded-3xl border border-titan-border bg-slate-900/80 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-0.5 text-xs font-bold font-mono">
                {activeTable.examWeight} &bull; {activeTable.unit}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1.5">
              {activeTable.title}
            </h2>
          </div>
        </div>

        {/* Memory Trick Banner */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
              Core Distinguishing Mnemonic for University Marks:
            </span>
            <p className="text-xs md:text-sm text-amber-100 font-medium mt-0.5 italic">
              &ldquo;{activeTable.summaryMemoryMnemonic}&rdquo;
            </p>
          </div>
        </div>

        {/* Rendered Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-950/90 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-3.5 w-1/5">Comparison Feature</th>
                <th className="p-3.5 text-amber-400">{activeTable.conceptA}</th>
                <th className="p-3.5 text-cyan-400">{activeTable.conceptB}</th>
                {activeTable.conceptC && (
                  <th className="p-3.5 text-purple-400">{activeTable.conceptC}</th>
                )}
                <th className="p-3.5 text-emerald-400 w-1/4">Key CT Distinction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/50">
              {activeTable.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-slate-200 bg-slate-950/30">
                    {row.parameter}
                  </td>
                  <td className="p-3.5 text-slate-300 leading-relaxed">
                    {row.itemA}
                  </td>
                  <td className="p-3.5 text-slate-300 leading-relaxed">
                    {row.itemB}
                  </td>
                  {row.itemC && (
                    <td className="p-3.5 text-slate-300 leading-relaxed">
                      {row.itemC}
                    </td>
                  )}
                  <td className="p-3.5 text-emerald-300 font-semibold bg-emerald-950/10">
                    {row.distinction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

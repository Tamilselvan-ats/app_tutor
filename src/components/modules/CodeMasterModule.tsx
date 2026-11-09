"use client";

import React, { useState } from "react";
import { Code2, Copy, Check, Terminal, BookOpen, AlertTriangle, Lightbulb, Play } from "lucide-react";
import { CODE_MASTER_DATA, CodeMasterItem } from "@/data/codeMaster";

interface CodeMasterProps {
  onAddXp: (amount: number) => void;
}

export const CodeMasterModule: React.FC<CodeMasterProps> = ({ onAddXp }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>("java-thread");
  const [copied, setCopied] = useState(false);
  const [langFilter, setLangFilter] = useState<string>("all");

  const filteredItems = CODE_MASTER_DATA.filter((item) => {
    if (langFilter === "all") return true;
    return item.language === langFilter;
  });

  const activeItem = CODE_MASTER_DATA.find((c) => c.id === selectedTopicId) || CODE_MASTER_DATA[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeItem.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelect = (id: string) => {
    setSelectedTopicId(id);
    onAddXp(10);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-400 mb-1.5">
              <Code2 className="h-3.5 w-3.5" />
              <span>MODULE 10: CODE MASTER VAULT</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              The 15 Exam Code Blueprints
            </h1>
            <p className="text-xs text-slate-400">
              Complete executable programs with Theory, Expected Terminal Output, Line-by-Line Explanations, and Examiner Traps.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {["all", "java", "python"].map((l) => (
              <button
                key={l}
                onClick={() => setLangFilter(l)}
                className={`rounded-lg px-3 py-1 font-semibold uppercase border transition ${
                  langFilter === l
                    ? "bg-amber-500 text-slate-950 border-amber-500 font-bold"
                    : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* 15 Topic Selector Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition ${
                selectedTopicId === item.id
                  ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20 font-bold"
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              {item.title.split(" ")[0]} {item.title.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Active Code Program Card */}
      <div className="rounded-3xl border border-titan-border bg-slate-900/80 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border uppercase ${
                activeItem.language === "java" ? "bg-orange-500/20 border-orange-500/40 text-orange-300" : "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
              }`}>
                {activeItem.language}
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                {activeItem.unit} &bull; {activeItem.category}
              </span>
              <span className="rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 text-xs font-mono font-bold">
                {activeItem.examWeight}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1.5">
              {activeItem.title}
            </h2>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied" : "Copy Code"}</span>
          </button>
        </div>

        {/* 1. Theory */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Theory & Technical Mechanism:</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {activeItem.theory}
          </p>
        </div>

        {/* 2. Source Code Block */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-900">
            <span className="font-mono text-[11px] text-amber-400">Complete Executable Source</span>
            <span className="uppercase text-[10px] font-bold">{activeItem.language}</span>
          </div>
          <pre className="text-xs text-cyan-300 overflow-x-auto leading-relaxed py-2 font-mono">
            <code>{activeItem.code}</code>
          </pre>
        </div>

        {/* 3. Output Box */}
        <div className="rounded-2xl border border-slate-800 bg-black/80 p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Terminal className="h-3.5 w-3.5" />
            <span>Expected Terminal Execution Output:</span>
          </div>
          <pre className="text-xs text-emerald-300 font-mono whitespace-pre-wrap leading-relaxed">
            {activeItem.output}
          </pre>
        </div>

        {/* 4. Line-by-Line Breakdown Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Line-by-Line Technical Explanation
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400">
                  <th className="p-3 w-1/3">Code Statement</th>
                  <th className="p-3 text-cyan-400">Technical Examination Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                {activeItem.lineByLine.map((line, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono text-amber-300 font-semibold bg-slate-950/40">
                      {line.lines}
                    </td>
                    <td className="p-3 text-slate-300 leading-relaxed">
                      {line.explanation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Exam Trap Warnings */}
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/15 p-4 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>Crucial Examiner Traps (Where Students Lose Marks):</span>
          </div>
          <ul className="space-y-1 text-xs text-rose-200">
            {activeItem.scoringTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-400 mt-0.5">&bull;</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

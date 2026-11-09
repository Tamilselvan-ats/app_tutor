"use client";

import React from "react";
import { 
  Zap, 
  Flame, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  FileText,
  AlertTriangle,
  Play
} from "lucide-react";
import { SYLLABUS_DATA } from "@/data/syllabus";
import { ModuleKey } from "../Sidebar";

interface DashboardProps {
  profile: {
    readiness: number;
    predictedMark: number;
    topicsCompleted: number;
    topicsRemaining: number;
    accuracy: number;
    streak: number;
    focusMinutes: number;
    confidenceScore: number;
    rank: string;
    xp: number;
  };
  weaknesses: any[];
  onSelectModule: (mod: ModuleKey) => void;
  onOpenFocus: () => void;
}

export const DashboardModule: React.FC<DashboardProps> = ({
  profile,
  weaknesses,
  onSelectModule,
  onOpenFocus,
}) => {
  // Helper for Green/Yellow/Red status
  const getStatusBadge = (score: number) => {
    if (score >= 80) {
      return {
        label: "STRONG",
        color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        badge: "bg-emerald-500",
      };
    } else if (score >= 50) {
      return {
        label: "MODERATE",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        badge: "bg-amber-500",
      };
    } else {
      return {
        label: "WEAK",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-400",
        badge: "bg-rose-500",
      };
    }
  };

  const readinessStatus = getStatusBadge(profile.readiness);
  const confidenceStatus = getStatusBadge(profile.confidenceScore);
  const accuracyStatus = getStatusBadge(profile.accuracy);

  return (
    <div className="space-y-6">
      {/* Hero Exam Status Alert */}
      <div className="relative overflow-hidden rounded-3xl border border-titan-border bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
              <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>CT COUNTDOWN: EXAM TOMORROW</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Advanced Programming Practice CT Weapon
            </h1>
            <p className="text-xs md:text-sm text-slate-300">
              Targeting full marks in Unit 3 (Multithreading & JDBC) and Unit 4 (Functional Programming, Sockets & Concurrency).
            </p>
          </div>

          {/* Emergency CT Action Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectModule("last-minute")}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-xl shadow-amber-500/25 hover:brightness-110 transition active:scale-95"
            >
              <Flame className="h-4 w-4 fill-slate-950" />
              <span>MAKE ME CT READY</span>
            </button>
            <button
              onClick={() => onSelectModule("simulator")}
              className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              <FileText className="h-4 w-4 text-cyan-400" />
              <span>Mock Simulator</span>
            </button>
          </div>
        </div>

        {/* Status Legend Indicator */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs">
          <span className="text-slate-400 font-medium">Evaluation Rubric:</span>
          <span className="flex items-center gap-1.5 font-bold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Green = Strong (&ge;80%)
          </span>
          <span className="flex items-center gap-1.5 font-bold text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Yellow = Moderate (50-79%)
          </span>
          <span className="flex items-center gap-1.5 font-bold text-rose-400">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Red = Weak (&lt;50%)
          </span>
        </div>
      </div>

      {/* Primary 8 Key CT Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: CT Readiness % */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>CT Readiness</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${readinessStatus.color}`}>
              {readinessStatus.label}
            </span>
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {profile.readiness}%
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${readinessStatus.badge}`}
              style={{ width: `${profile.readiness}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Preparedness for 50 mark test</p>
        </div>

        {/* Metric 2: Predicted Mark */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Predicted Mark</span>
            <Target className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-amber-400 font-mono">
              {profile.predictedMark}
            </span>
            <span className="text-sm font-semibold text-slate-400">/ 50</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-amber-500"
              style={{ width: `${(profile.predictedMark / 50) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Target: 45+ for Topper rank</p>
        </div>

        {/* Metric 3: Topics Completed vs Remaining */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Topics Done / Left</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400 font-mono">
              {profile.topicsCompleted}
            </span>
            <span className="text-xs text-slate-400">done</span>
            <span className="text-sm font-bold text-rose-400 font-mono ml-auto">
              {profile.topicsRemaining} left
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden flex">
            <div 
              className="h-full bg-emerald-500"
              style={{ width: `${(profile.topicsCompleted / (profile.topicsCompleted + profile.topicsRemaining)) * 100}%` }}
            />
            <div 
              className="h-full bg-rose-500"
              style={{ width: `${(profile.topicsRemaining / (profile.topicsCompleted + profile.topicsRemaining)) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Across Unit 3 & Unit 4</p>
        </div>

        {/* Metric 4: Accuracy % */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Accuracy</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${accuracyStatus.color}`}>
              {accuracyStatus.label}
            </span>
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {profile.accuracy}%
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className={`h-full ${accuracyStatus.badge}`}
              style={{ width: `${profile.accuracy}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Quiz & Flashcard precision</p>
        </div>

        {/* Metric 5: Study Streak */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Study Streak</span>
            <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
          </div>
          <div className="text-3xl font-black text-orange-400 font-mono">
            {profile.streak} <span className="text-sm font-semibold text-slate-300">Days</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">Unbroken study momentum</p>
        </div>

        {/* Metric 6: Focus Meter */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Focus Meter</span>
            <Clock className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400 font-mono">
            {profile.focusMinutes} <span className="text-sm font-semibold text-slate-300">Mins</span>
          </div>
          <button
            onClick={onOpenFocus}
            className="mt-2 text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <Play className="h-3 w-3 fill-amber-400" /> Start Sprint
          </button>
        </div>

        {/* Metric 7: Confidence Score */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Confidence Score</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${confidenceStatus.color}`}>
              {confidenceStatus.label}
            </span>
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {profile.confidenceScore}%
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className={`h-full ${confidenceStatus.badge}`}
              style={{ width: `${profile.confidenceScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Exam hall mindset index</p>
        </div>

        {/* Metric 8: XP & Rank Progress */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>XP Mastery</span>
            <Zap className="h-4 w-4 fill-cyan-400 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-300 font-mono">
            {profile.xp}
          </div>
          <div className="text-xs font-semibold text-amber-400 mt-1">
            Rank: {profile.rank}
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Next: Professor Slayer (5000 XP)</p>
        </div>
      </div>

      {/* Two Column Layout: Urgent Weaknesses & Syllabus Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Weakness Detector Quick View */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Priority Weak Topics (Action Required Tonight)
              </h2>
            </div>
            <button
              onClick={() => onSelectModule("weaknesses")}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {weaknesses.slice(0, 4).map((w, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2.5 text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-200">{w.topic_name}</div>
                  <div className="text-[11px] text-slate-500">{w.unit} &bull; {w.wrong_count} errors logged</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  w.status === "weak" 
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-400" 
                    : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                }`}>
                  {w.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onSelectModule("one-night")}
            className="w-full rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition flex items-center justify-center gap-2"
          >
            <span>Launch One Night Revision Sprint</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
          </button>
        </div>

        {/* Right: High Probability Syllabus Matrix */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                High Probability CT Topics (Unit 3 & 4)
              </h2>
            </div>
            <button
              onClick={() => onSelectModule("predicted-questions")}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              CT Trends <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {SYLLABUS_DATA.filter(t => t.probability === "High").slice(0, 4).map((top) => (
              <div
                key={top.id}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">{top.title}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                      {top.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {top.keyTerms.slice(0, 4).join(" • ")}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-400 font-mono">
                    {top.probabilityScore}% Prob.
                  </div>
                  <div className="text-[10px] text-amber-400 font-semibold">
                    ~{top.marksWeight} Marks
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">Exam Blueprint: 3 x 8M + 2 x 13M = 50 Marks</span>
            <button
              onClick={() => onSelectModule("question-bank")}
              className="font-bold text-amber-400 hover:underline"
            >
              Browse Question Bank &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

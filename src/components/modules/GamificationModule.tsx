"use client";

import React from "react";
import { Trophy, Zap, Award, Flame, CheckCircle2, Shield, Lock, Star } from "lucide-react";

interface GamificationProps {
  xp: number;
  rank: string;
  streak: number;
  focusMinutes: number;
}

export const GamificationModule: React.FC<GamificationProps> = ({
  xp,
  rank,
  streak,
  focusMinutes,
}) => {
  const ranksList = [
    { name: "Beginner", minXp: 0, maxXp: 200, desc: "Starting the Class Test preparation journey." },
    { name: "Apprentice", minXp: 201, maxXp: 600, desc: "Mastered fundamental concepts in Unit 3." },
    { name: "Scholar", minXp: 601, maxXp: 1200, desc: "Solid command of multithreading, JDBC, and functional theory." },
    { name: "Topper", minXp: 1201, maxXp: 2500, desc: "Consistent 40+ mock score; knows scoring keywords." },
    { name: "CT Monster", minXp: 2501, maxXp: 5000, desc: "Crushes both 8-mark and 13-mark questions with zero syntax errors." },
    { name: "Professor Slayer", minXp: 5001, maxXp: 99999, desc: "Flawless written execution; examiners cannot deduct a single mark." },
  ];

  const currentRankObj = ranksList.find((r) => r.name === rank) || ranksList[1];
  const nextRankObj = ranksList[ranksList.indexOf(currentRankObj) + 1] || currentRankObj;

  const xpProgressPercent = Math.min(
    100,
    Math.round(
      ((xp - currentRankObj.minXp) / Math.max(1, currentRankObj.maxXp - currentRankObj.minXp)) * 100
    )
  );

  const badges = [
    { title: "Thread Master", desc: "Mastered Thread lifecycle & Runnable", unlocked: xp >= 300, icon: Zap },
    { title: "Socket Guru", desc: "Completed TCP & UDP Client-Server implementations", unlocked: xp >= 600, icon: Star },
    { title: "JDBC Wizard", desc: "Answered PreparedStatement & Transaction CRUD", unlocked: xp >= 400, icon: Award },
    { title: "Night Owl Sprint", desc: "Revised during intense evening countdown", unlocked: streak >= 3, icon: Flame },
    { title: "Simulation Victor", desc: "Submitted a 50-mark full CT Mock Exam", unlocked: xp >= 800, icon: Trophy },
    { title: "Professor Slayer", desc: "Attained highest academic exam tier", unlocked: xp >= 5000, icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400 mb-1.5">
              <Trophy className="h-3.5 w-3.5" />
              <span>MODULE 14: GAMIFICATION & RANKS</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              Academic Progression Ladder
            </h1>
            <p className="text-xs text-slate-400">
              Climb the ranks from Beginner to Professor Slayer by reviewing cards, fixing weak topics, and completing mock exams.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-slate-950 border border-amber-500/30 px-5 py-3">
            <Zap className="h-6 w-6 text-amber-400 fill-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">CURRENT XP</div>
              <div className="text-2xl font-black text-white font-mono">{xp} XP</div>
            </div>
          </div>
        </div>

        {/* Current Rank Showcase & Progress Bar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Active Tier:</span>
              <span className="text-base font-extrabold text-amber-400 font-mono">{rank}</span>
            </div>
            <div className="text-xs text-cyan-400 font-mono font-semibold">
              Next Rank: {nextRankObj.name} ({nextRankObj.minXp} XP)
            </div>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-700"
              style={{ width: `${xpProgressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>{currentRankObj.minXp} XP</span>
            <span>{xpProgressPercent}% completed towards {nextRankObj.name}</span>
            <span>{currentRankObj.maxXp} XP</span>
          </div>
        </div>
      </div>

      {/* Ranks Hierarchy Breakdown */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-6 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          The 6 Rank Tiers of CT TITAN
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {ranksList.map((r, idx) => {
            const isReached = xp >= r.minXp;
            const isCurrent = r.name === rank;
            return (
              <div
                key={r.name}
                className={`rounded-xl border p-4 space-y-1.5 transition ${
                  isCurrent
                    ? "border-amber-500/60 bg-amber-950/20 shadow-lg shadow-amber-500/10"
                    : isReached
                    ? "border-slate-800 bg-slate-950/80 text-slate-300"
                    : "border-slate-800/60 bg-slate-950/30 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-black font-mono text-sm ${isCurrent ? "text-amber-400" : isReached ? "text-white" : "text-slate-500"}`}>
                    {r.name}
                  </span>
                  {isCurrent ? (
                    <span className="rounded bg-amber-500 text-slate-950 px-2 py-0.5 text-[10px] font-bold">
                      CURRENT
                    </span>
                  ) : isReached ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Lock className="h-3.5 w-3.5 text-slate-600" />
                  )}
                </div>
                <div className="text-[11px] font-mono text-cyan-400 font-semibold">
                  {r.minXp} - {r.maxXp} XP
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Achievements */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-6 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-400" />
          <span>CT Exam Badges & Achievements</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className={`rounded-xl border p-4 flex items-start gap-3 transition ${
                  b.unlocked
                    ? "border-emerald-500/30 bg-emerald-950/15"
                    : "border-slate-800 bg-slate-950/40 opacity-50"
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${b.unlocked ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-600"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className={`font-bold text-sm ${b.unlocked ? "text-white" : "text-slate-500"}`}>
                    {b.title}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.desc}</p>
                  <div className="text-[10px] font-semibold mt-1">
                    {b.unlocked ? (
                      <span className="text-emerald-400">Unlocked &bull; Active</span>
                    ) : (
                      <span className="text-slate-500">Locked</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

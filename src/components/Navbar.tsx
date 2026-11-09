"use client";

import React, { useState } from "react";
import { 
  Zap, 
  Flame, 
  Clock, 
  Key, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Trophy,
  Wifi,
  WifiOff
} from "lucide-react";

interface NavbarProps {
  xp: number;
  rank: string;
  streak: number;
  focusMinutes: number;
  apiKey: string;
  onOpenApiKeyModal: () => void;
  onOpenSearch: () => void;
  onToggleFocus: () => void;
  isFocusActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  xp,
  rank,
  streak,
  focusMinutes,
  apiKey,
  onOpenApiKeyModal,
  onOpenSearch,
  onToggleFocus,
  isFocusActive,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-titan-border bg-titan-bg/90 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 font-black text-slate-950 shadow-lg shadow-amber-500/20">
            <span className="text-xl tracking-tighter">CT</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-white text-lg font-mono">
                CT TITAN
              </span>
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30">
                APP EXAM WEAPON
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Unit 3 & 4 Class Test Optimization
            </p>
          </div>
        </div>

        {/* Center: Quick Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-400 hover:border-amber-500/50 hover:text-slate-200 transition-all w-72"
        >
          <Search className="h-4 w-4 text-amber-400" />
          <span className="text-xs">Ask: &quot;What is JDBC?&quot;, &quot;TCP vs UDP&quot;...</span>
          <kbd className="ml-auto rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 border border-slate-700">
            /
          </kbd>
        </button>

        {/* Right: Gamification, Streak & AI Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Focus Timer Button */}
          <button
            onClick={onToggleFocus}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-all ${
              isFocusActive
                ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600"
            }`}
            title="Focus Timer / Pomodoro"
          >
            <Clock className={`h-3.5 w-3.5 ${isFocusActive ? "text-rose-400" : "text-amber-400"}`} />
            <span className="hidden sm:inline">Focus</span>
            <span className="font-bold text-slate-100">{focusMinutes}m</span>
          </button>

          {/* Streak Indicator */}
          <div className="flex items-center gap-1 rounded-lg bg-orange-500/10 border border-orange-500/20 px-2.5 py-1.5 text-xs text-orange-400 font-semibold">
            <Flame className="h-4 w-4 fill-orange-500 text-orange-500 animate-bounce" />
            <span>{streak} Day Streak</span>
          </div>

          {/* XP & Rank Badge */}
          <div className="hidden lg:flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
            <Trophy className="h-4 w-4 text-amber-400" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 leading-none">RANK</span>
              <span className="text-xs font-bold text-amber-300 leading-tight">{rank}</span>
            </div>
            <div className="h-4 w-px bg-slate-700 mx-1" />
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-400">
              <Zap className="h-3.5 w-3.5 fill-cyan-400" />
              <span>{xp} XP</span>
            </div>
          </div>

          {/* AI Status / Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
              apiKey
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                : "bg-slate-800/80 border-slate-700 text-amber-300 hover:border-amber-500/40"
            }`}
          >
            {apiKey ? (
              <>
                <Wifi className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Gemini AI Active</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">Offline Mode</span>
              </>
            )}
            <Key className="h-3 w-3 opacity-60 ml-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

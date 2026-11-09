"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Flame, CheckCircle, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";

interface FocusTimerProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete: (minutes: number) => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({
  isOpen,
  onClose,
  onSessionComplete,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 mins default
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTarget, setSessionTarget] = useState(25);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      onSessionComplete(sessionTarget);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, sessionTarget, onSessionComplete]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const setTimerPreset = (mins: number) => {
    setIsRunning(false);
    setSessionTarget(mins);
    setSecondsLeft(mins * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(sessionTarget * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-sm rounded-3xl border border-titan-border bg-slate-900 p-6 text-center shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xs font-semibold text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-bold text-rose-400 mb-4">
          <Flame className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
          <span>INTENSE EXAM FOCUS SPRINT</span>
        </div>

        {/* Circular Countdown Display */}
        <div className="my-4 flex items-center justify-center">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-slate-800 bg-slate-950 shadow-inner">
            <div className={`absolute inset-0 rounded-full border-4 border-amber-500/40 ${isRunning ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
            <div className="flex flex-col items-center z-10">
              <span className="font-mono text-4xl font-black text-white tracking-wider">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                {isRunning ? "Deep Studying" : "Paused"}
              </span>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[15, 25, 45].map((m) => (
            <button
              key={m}
              onClick={() => setTimerPreset(m)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold border transition ${
                sessionTarget === m
                  ? "bg-amber-500/20 border-amber-500 text-amber-300"
                  : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
            >
              {m} Mins
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 transition"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-slate-950" />}
            <span>{isRunning ? "Pause Sprint" : "Start Sprint"}</span>
          </button>
          <button
            onClick={handleReset}
            className="rounded-2xl border border-slate-700 bg-slate-800 p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-[11px] text-slate-500">
          Completing a 25-minute sprint awards <span className="text-cyan-400 font-bold">+50 XP</span> & boosts CT Readiness!
        </p>
      </div>
    </div>
  );
};

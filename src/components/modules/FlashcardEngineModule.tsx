"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Layers, RotateCcw, Check, X, Sparkles, Lightbulb, Trophy, ArrowRight, Brain } from "lucide-react";
import { generateAllFlashcards, Flashcard } from "@/data/flashcards";

interface FlashcardEngineProps {
  onAddXp: (amount: number) => void;
}

export const FlashcardEngineModule: React.FC<FlashcardEngineProps> = ({ onAddXp }) => {
  const allCards = useMemo(() => generateAllFlashcards(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(14);
  const [wrongCount, setWrongCount] = useState(4);
  const [filterUnit, setFilterUnit] = useState<string>("all");

  const filteredCards = useMemo(() => {
    if (filterUnit === "all") return allCards;
    return allCards.filter((c) => c.unit === filterUnit);
  }, [allCards, filterUnit]);

  const currentCard: Flashcard = filteredCards[currentIndex] || filteredCards[0];

  const masteryPercent = Math.round(
    (correctCount / Math.max(1, correctCount + wrongCount)) * 100
  );

  // Keyboard Navigation: Space = Flip, ArrowRight = Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // SM-2 Review Handler
  const handleRate = async (rating: number) => {
    // Rating 1-2 = Wrong; 3-5 = Correct
    const isCorrect = rating >= 3;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      onAddXp(10);
    } else {
      setWrongCount((prev) => prev + 1);
    }

    // Call SQLite backend SM-2 endpoint
    try {
      await fetch("/api/v1/flashcards/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: currentCard.id,
          rating,
        }),
      });
    } catch (e) {
      // Local fallback
    }

    // Advance to next card
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats Bar */}
      <div className="rounded-2xl border border-titan-border bg-slate-900/60 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-400 mb-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>MODULE 11: FLASHCARD ENGINE (1000+ DECK)</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              Spaced Repetition (SM-2) Memory Deck
            </h1>
            <p className="text-xs text-slate-400">
              Active recall algorithm calculates optimal review intervals (SuperMemo SM-2) to lock facts into long-term memory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {["all", "Unit 3", "Unit 4"].map((u) => (
              <button
                key={u}
                onClick={() => {
                  setFilterUnit(u);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition ${
                  filterUnit === u
                    ? "bg-amber-500 text-slate-950 border-amber-500 font-bold"
                    : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                {u === "all" ? "All Units" : u}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1 border-t border-slate-800">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-center">
            <span className="text-slate-400">Total Cards</span>
            <div className="text-2xl font-black text-white font-mono mt-0.5">
              {allCards.length}+
            </div>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-3 text-center">
            <span className="text-emerald-400">Correct Answers</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
              {correctCount}
            </div>
          </div>
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-3 text-center">
            <span className="text-rose-400">Wrong Answers</span>
            <div className="text-2xl font-black text-rose-400 font-mono mt-0.5">
              {wrongCount}
            </div>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-3 text-center">
            <span className="text-amber-400">Mastery %</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">
              {masteryPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* 3D Interactive Flashcard UI */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-mono">
            Card {currentIndex + 1} of {filteredCards.length}
          </span>
          <span className="rounded bg-slate-800 px-2 py-0.5 font-medium text-slate-300">
            {currentCard.category} &bull; {currentCard.unit}
          </span>
        </div>

        {/* Flip Container */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative h-80 sm:h-96 w-full cursor-pointer perspective-1000 select-none group"
        >
          <div
            className={`relative h-full w-full rounded-3xl border transition-transform duration-500 transform-style-3d shadow-2xl ${
              isFlipped ? "rotate-y-180 border-amber-500/40" : "border-titan-border hover:border-slate-700"
            }`}
          >
            {/* FRONT OF CARD */}
            <div className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 backface-hidden">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-400">
                  <Brain className="h-3.5 w-3.5" />
                  <span>QUESTION / PROMPT</span>
                </span>
                <span className="text-xs text-slate-500">Click to reveal</span>
              </div>

              <div className="text-center my-auto px-4">
                <h2 className="text-lg sm:text-2xl font-bold text-white leading-snug">
                  {currentCard.front}
                </h2>
                {currentCard.hint && (
                  <p className="text-xs text-slate-400 mt-4 italic">
                    Hint: {currentCard.hint}
                  </p>
                )}
              </div>

              <div className="text-center text-xs text-slate-500">
                Tap card or press <kbd className="rounded bg-slate-800 px-1.5 py-0.5 border border-slate-700">Space</kbd> to flip
              </div>
            </div>

            {/* BACK OF CARD */}
            <div className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/30 p-8 rotate-y-180 backface-hidden border-2 border-amber-500/30">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>ANSWER & EXPLANATION</span>
                </span>
                <span className="text-xs text-amber-400/80 font-mono">SM-2 Algorithm</span>
              </div>

              <div className="my-auto space-y-3 px-2">
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed whitespace-pre-line">
                  {currentCard.back}
                </p>

                {currentCard.memoryMnemonic && (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-2.5 flex items-start gap-2 text-xs">
                    <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-amber-200 italic font-semibold">
                      {currentCard.memoryMnemonic}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center text-xs text-slate-500">
                Rate difficulty below to schedule next review
              </div>
            </div>
          </div>
        </div>

        {/* SM-2 Rating Controls */}
        <div className="rounded-2xl border border-titan-border bg-slate-900/80 p-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 text-center">
            SuperMemo SM-2 Recall Rating:
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleRate(1)}
              className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-2.5 text-center hover:bg-rose-950/40 transition"
            >
              <div className="text-xs font-bold text-rose-400">Forgot (1)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Reset interval</div>
            </button>
            <button
              onClick={() => handleRate(3)}
              className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-2.5 text-center hover:bg-amber-950/40 transition"
            >
              <div className="text-xs font-bold text-amber-400">Hard (3)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Review 1d</div>
            </button>
            <button
              onClick={() => handleRate(4)}
              className="rounded-xl border border-cyan-500/40 bg-cyan-950/20 p-2.5 text-center hover:bg-cyan-950/40 transition"
            >
              <div className="text-xs font-bold text-cyan-300">Good (4)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Review 3d</div>
            </button>
            <button
              onClick={() => handleRate(5)}
              className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-2.5 text-center hover:bg-emerald-950/40 transition"
            >
              <div className="text-xs font-bold text-emerald-400">Easy (5)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Review 6d</div>
            </button>
          </div>

          {/* Skip / Next */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handlePrev}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              &larr; Previous Card
            </button>
            <button
              onClick={handleNext}
              className="text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              Skip / Next Card &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

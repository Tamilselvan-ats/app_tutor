"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Lightbulb,
  Trophy
} from "lucide-react";
import confetti from "canvas-confetti";
import { SAMPLE_EXAM_PAPERS, evaluateExamAnswers, ExamPaper } from "@/data/examSimulator";

interface ExamSimulatorProps {
  onAddXp: (amount: number) => void;
  onRecordExamSubmission: (examData: any) => void;
}

export const ExamSimulatorModule: React.FC<ExamSimulatorProps> = ({
  onAddXp,
  onRecordExamSubmission,
}) => {
  const paper: ExamPaper = SAMPLE_EXAM_PAPERS[0];
  const allQuestions = [...paper.sectionA, ...paper.sectionB];

  const [activeIdx, setActiveIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(paper.durationMinutes * 60);
  const [isExamActive, setIsExamActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examResult, setExamResult] = useState<any>(null);

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isExamActive && !isSubmitted && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isExamActive && !isSubmitted) {
      // Auto Submit on Timer Expiry
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [isExamActive, isSubmitted, secondsLeft]);

  const handleStartExam = () => {
    setIsExamActive(true);
    setIsSubmitted(false);
    setExamResult(null);
    setAnswers({});
    setSecondsLeft(paper.durationMinutes * 60);
  };

  const handleFastExam = (mins: number) => {
    setIsExamActive(true);
    setIsSubmitted(false);
    setExamResult(null);
    setAnswers({});
    setSecondsLeft(mins * 60);
  };

  const handleAnswerChange = (qId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: text }));
  };

  const handleSubmit = async () => {
    setIsExamActive(false);
    setIsSubmitted(true);

    const result = evaluateExamAnswers(answers, paper);
    setExamResult(result);

    // Reward XP
    const xpReward = Math.round(result.totalScore * 8) + 150;
    onAddXp(xpReward);

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Save to backend SQLite
    try {
      await fetch("/api/v1/exams/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: result.totalScore,
          maxScore: result.maxMarks,
          timeTakenSeconds: paper.durationMinutes * 60 - secondsLeft,
          feedback: result.overallReport,
          answers,
        }),
      });
      onRecordExamSubmission(result);
    } catch (e) {
      console.warn("Backend offline, exam result recorded locally.");
    }
  };

  const currentQ = allQuestions[activeIdx];
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="space-y-6">
      {/* Start / Intro State */}
      {!isExamActive && !isSubmitted && (
        <div className="rounded-3xl border border-titan-border bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-6 md:p-10 space-y-6 shadow-2xl">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
              <FileText className="h-4 w-4" />
              <span>MODULE 5: REAL CT EXAM SIMULATOR</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Full CT Mock Examination (50 Marks)
            </h1>
            <p className="text-xs md:text-sm text-slate-300">
              Exact university Class Test pattern: Section A (3 &times; 8 Marks = 24 Marks) and Section B (2 &times; 13 Marks = 26 Marks).
              Includes live countdown timer, auto-submit, keyword matching rubric, and instant score prediction!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-center">
              <div className="text-slate-400">Total Marks</div>
              <div className="text-xl font-bold text-amber-400 font-mono mt-1">50 Marks</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-center">
              <div className="text-slate-400">Standard Duration</div>
              <div className="text-xl font-bold text-cyan-400 font-mono mt-1">90 Mins</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-center">
              <div className="text-slate-400">Section A</div>
              <div className="text-xl font-bold text-white font-mono mt-1">3 &times; 8 Marks</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-center">
              <div className="text-slate-400">Section B</div>
              <div className="text-xl font-bold text-white font-mono mt-1">2 &times; 13 Marks</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleStartExam}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/25 hover:brightness-110 transition active:scale-95"
            >
              <Clock className="h-4 w-4" />
              <span>Start 90-Minute Standard CT Exam</span>
            </button>
            <button
              onClick={() => handleFastExam(15)}
              className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              <span>15-Minute Rapid Mock Sprint</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Exam Hall Mode */}
      {isExamActive && (
        <div className="space-y-4">
          {/* Sticky Exam Control Bar */}
          <div className="sticky top-[61px] z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-md px-5 py-3 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-white text-sm">CT Examination in Progress</span>
              <span className="rounded bg-slate-800 text-slate-300 px-2 py-0.5 text-xs font-mono">
                Q{activeIdx + 1} of {allQuestions.length}
              </span>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-mono text-sm font-black border ${
              secondsLeft < 300 
                ? "bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse" 
                : "bg-slate-950 border-slate-700 text-amber-400"
            }`}>
              <Clock className="h-4 w-4" />
              <span>
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-slate-400 font-sans">
                {secondsLeft < 300 ? "Low Time!" : "Remaining"}
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-1.5 text-xs font-bold text-slate-950 hover:brightness-110 transition shadow-md shadow-emerald-500/20"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit & Auto-Grade</span>
            </button>
          </div>

          {/* Question Palette */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-400 mr-1">Questions:</span>
            {allQuestions.map((q, idx) => {
              const isAnswered = !!(answers[q.id] && answers[q.id].trim().length > 0);
              const isActive = activeIdx === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex items-center justify-center h-8 w-10 rounded-lg text-xs font-mono font-bold border transition ${
                    isActive
                      ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20"
                      : isAnswered
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : "bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {q.qNum}
                </button>
              );
            })}
          </div>

          {/* Active Question Workplace */}
          <div className="rounded-2xl border border-titan-border bg-slate-900/70 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-xs font-mono font-bold text-amber-300">
                  {currentQ.marks} MARKS
                </span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                  {currentQ.section} &bull; {currentQ.unit}
                </span>
              </div>
              <span className="text-xs text-slate-500">
                Word Count: {(answers[currentQ.id] || "").trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <h2 className="text-base md:text-lg font-bold text-white">
              {currentQ.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {currentQ.description}
            </p>

            {/* Technical Keywords Hint */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                Examiner Expectation (Rubric Highlights):
              </span>
              <p className="text-[11px] text-slate-400">
                Include definitions, syntax, and keywords like: {currentQ.rubricKeywords.slice(0, 5).join(", ")}.
              </p>
            </div>

            {/* Answer Editor */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Your Answer (Write definitions, explanations, diagrams, or code):
              </label>
              <textarea
                value={answers[currentQ.id] || ""}
                onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                rows={10}
                placeholder="Type your examination answer here... (Tip: Structure with headings, bullet points, and code blocks for maximum marks)"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-xs text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                disabled={activeIdx === 0}
                className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>

              {activeIdx < allQuestions.length - 1 ? (
                <button
                  onClick={() => setActiveIdx((prev) => Math.min(allQuestions.length - 1, prev + 1))}
                  className="flex items-center gap-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 transition"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2 text-xs font-bold text-slate-950 hover:brightness-110 transition"
                >
                  <Send className="h-3.5 w-3.5" /> Submit Exam
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submitted Performance Report */}
      {isSubmitted && examResult && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-titan-border bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 mb-1.5">
                  <Award className="h-3.5 w-3.5" />
                  <span>PERFORMANCE REPORT & SCORE PREDICTION</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white">
                  CT Exam Diagnostic Evaluation
                </h2>
              </div>

              <button
                onClick={handleStartExam}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retake Exam</span>
              </button>
            </div>

            {/* Score Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 text-center">
                <span className="text-xs text-amber-300 font-semibold">Predicted CT Score</span>
                <div className="text-4xl font-black text-amber-400 font-mono mt-1">
                  {examResult.totalScore} <span className="text-xl text-slate-400">/ {examResult.maxMarks}</span>
                </div>
                <p className="text-[11px] text-amber-400/80 mt-1">{examResult.percentage}% Accuracy</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-center">
                <span className="text-xs text-slate-400 font-semibold">Rank Tier</span>
                <div className="text-2xl font-bold text-white mt-1">
                  {examResult.grade}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Class Test Benchmark</p>
              </div>

              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 text-center">
                <span className="text-xs text-cyan-300 font-semibold">XP Earned</span>
                <div className="text-3xl font-black text-cyan-300 font-mono mt-1">
                  +{Math.round(examResult.totalScore * 8) + 150} XP
                </div>
                <p className="text-[11px] text-cyan-400/80 mt-1">Added to progression</p>
              </div>
            </div>

            {/* Overall Report Feedback */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 leading-relaxed">
              {examResult.overallReport}
            </div>

            {/* Question Breakdown */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Question-by-Question Rubric Diagnostics
              </h3>

              <div className="space-y-3">
                {examResult.questionScores.map((qs: any, idx: number) => {
                  const qObj = allQuestions[idx];
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white font-mono">
                          {qs.qNum}: {qObj.title}
                        </span>
                        <span className="rounded bg-slate-800 px-2 py-0.5 font-bold font-mono text-amber-400">
                          {qs.score} / {qs.maxScore} Marks
                        </span>
                      </div>

                      <p className="text-slate-400">{qs.feedback}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[11px]">
                        <div className="rounded bg-emerald-950/20 border border-emerald-500/20 p-2">
                          <span className="font-bold text-emerald-400">Matched Keywords: </span>
                          <span className="text-slate-300">
                            {qs.matchedKeywords.length > 0 ? qs.matchedKeywords.join(", ") : "None detected"}
                          </span>
                        </div>
                        <div className="rounded bg-rose-950/20 border border-rose-500/20 p-2">
                          <span className="font-bold text-rose-400">Missed Keywords: </span>
                          <span className="text-slate-300">
                            {qs.missedKeywords.length > 0 ? qs.missedKeywords.join(", ") : "None! Full technical score"}
                          </span>
                        </div>
                      </div>

                      {/* Model Answer accordion */}
                      <details className="mt-2 text-slate-400">
                        <summary className="cursor-pointer text-amber-400 font-semibold hover:underline">
                          View Model Answer for {qs.qNum}
                        </summary>
                        <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 whitespace-pre-line font-mono text-[11px]">
                          {qObj.modelAnswer}
                        </div>
                      </details>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

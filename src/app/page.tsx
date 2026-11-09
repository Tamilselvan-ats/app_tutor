"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar, ModuleKey } from "@/components/Sidebar";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { FocusTimer } from "@/components/FocusTimer";

// Modules
import { DashboardModule } from "@/components/modules/DashboardModule";
import { AiAnalyzerModule } from "@/components/modules/AiAnalyzerModule";
import { QuestionBankModule } from "@/components/modules/QuestionBankModule";
import { PatternEngineModule } from "@/components/modules/PatternEngineModule";
import { ExamSimulatorModule } from "@/components/modules/ExamSimulatorModule";
import { WeaknessDetectorModule } from "@/components/modules/WeaknessDetectorModule";
import { OneNightRevisionModule } from "@/components/modules/OneNightRevisionModule";
import { DefinitionsMasterModule } from "@/components/modules/DefinitionsMasterModule";
import { ComparisonGeneratorModule } from "@/components/modules/ComparisonGeneratorModule";
import { CodeMasterModule } from "@/components/modules/CodeMasterModule";
import { FlashcardEngineModule } from "@/components/modules/FlashcardEngineModule";
import { NotesCompressorModule } from "@/components/modules/NotesCompressorModule";
import { LastMinuteSheetModule } from "@/components/modules/LastMinuteSheetModule";
import { GamificationModule } from "@/components/modules/GamificationModule";
import { SmartSearchModule } from "@/components/modules/SmartSearchModule";

export default function Home() {
  const [currentModule, setCurrentModule] = useState<ModuleKey>("dashboard");
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [isFocusActive, setIsFocusActive] = useState(false);

  // User Profile State
  const [profile, setProfile] = useState({
    readiness: 76,
    predictedMark: 41,
    topicsCompleted: 18,
    topicsRemaining: 6,
    accuracy: 82,
    streak: 4,
    focusMinutes: 50,
    confidenceScore: 78,
    rank: "Scholar",
    xp: 680,
  });

  const [weaknesses, setWeaknesses] = useState<any[]>([
    { topic_id: "u3-jdbc-statement", topic_name: "CallableStatement vs PreparedStatement", unit: "Unit 3", wrong_count: 3, revision_count: 1, status: "weak" },
    { topic_id: "u4-sync-rlock", topic_name: "Lock vs RLock vs Semaphore", unit: "Unit 4", wrong_count: 4, revision_count: 0, status: "weak" },
    { topic_id: "u4-func-referential", topic_name: "Referential Transparency & Closures", unit: "Unit 4", wrong_count: 2, revision_count: 2, status: "moderate" },
    { topic_id: "u3-thread-lifecycle", topic_name: "Thread Priority & Daemon Threads", unit: "Unit 3", wrong_count: 2, revision_count: 1, status: "moderate" },
    { topic_id: "u4-tcp-udp", topic_name: "TCP vs UDP Socket Implementations", unit: "Unit 4", wrong_count: 1, revision_count: 3, status: "strong" },
  ]);

  const [apiKey, setApiKey] = useState("");

  // Load initial profile and API key from localStorage and Express Backend
  useEffect(() => {
    const savedKey = localStorage.getItem("titan_gemini_key") || "";
    setApiKey(savedKey);

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/v1/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err) {
        console.warn("Backend API offline; running in standalone local mode.");
      }
    };

    const fetchWeaknesses = async () => {
      try {
        const res = await fetch("/api/v1/weaknesses");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setWeaknesses(data);
          }
        }
      } catch (err) {
        console.warn("Backend weaknesses API offline.");
      }
    };

    fetchProfile();
    fetchWeaknesses();
  }, []);

  // Save Key Handler
  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("titan_gemini_key", key);
  };

  // Add XP Handler
  const handleAddXp = async (amount: number) => {
    setProfile((prev) => {
      const newXp = prev.xp + amount;
      let newRank = prev.rank;
      if (newXp >= 5000) newRank = "Professor Slayer";
      else if (newXp >= 2500) newRank = "CT Monster";
      else if (newXp >= 1200) newRank = "Topper";
      else if (newXp >= 600) newRank = "Scholar";
      else if (newXp >= 200) newRank = "Apprentice";

      return {
        ...prev,
        xp: newXp,
        rank: newRank,
        readiness: Math.min(99, prev.readiness + 1),
      };
    });

    try {
      await fetch("/api/v1/profile/add-xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, minutes: 2 }),
      });
    } catch (e) {
      // Local fallback
    }
  };

  // Record Weakness / Revision Handler
  const handleRecordWeakness = async (
    topicId: string,
    topicName: string,
    unit: string,
    isWrong: boolean
  ) => {
    setWeaknesses((prev) => {
      const existing = prev.find((w) => w.topic_id === topicId);
      if (existing) {
        return prev.map((w) => {
          if (w.topic_id === topicId) {
            const wrong = isWrong ? w.wrong_count + 1 : w.wrong_count;
            const rev = isWrong ? w.revision_count : w.revision_count + 1;
            const status = rev >= 3 ? "strong" : wrong >= 3 ? "weak" : "moderate";
            return { ...w, wrong_count: wrong, revision_count: rev, status };
          }
          return w;
        });
      } else {
        return [
          ...prev,
          {
            topic_id: topicId,
            topic_name: topicName,
            unit,
            wrong_count: isWrong ? 1 : 0,
            revision_count: isWrong ? 0 : 1,
            status: isWrong ? "weak" : "moderate",
          },
        ];
      }
    });

    try {
      await fetch("/api/v1/weaknesses/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, topicName, unit, isWrong }),
      });
    } catch (e) {
      // Local fallback
    }
  };

  // Focus Session Complete
  const handleFocusSessionComplete = (minutes: number) => {
    setIsFocusActive(false);
    setIsFocusModalOpen(false);
    setProfile((prev) => ({
      ...prev,
      focusMinutes: prev.focusMinutes + minutes,
      confidenceScore: Math.min(98, prev.confidenceScore + 5),
    }));
    handleAddXp(50);
  };

  return (
    <div className="min-h-screen bg-titan-bg text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        xp={profile.xp}
        rank={profile.rank}
        streak={profile.streak}
        focusMinutes={profile.focusMinutes}
        apiKey={apiKey}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenSearch={() => setCurrentModule("smart-search")}
        onToggleFocus={() => setIsFocusModalOpen(true)}
        isFocusActive={isFocusActive}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <Sidebar
          currentModule={currentModule}
          onSelectModule={(mod) => setCurrentModule(mod)}
          isOpenMobile={isOpenMobile}
          onCloseMobile={() => setIsOpenMobile(false)}
        />

        {/* Dynamic Module Content Viewport */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Mobile menu toggle bar */}
          <div className="lg:hidden flex items-center justify-between pb-2 border-b border-slate-800">
            <button
              onClick={() => setIsOpenMobile(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-200"
            >
              <span>☰ All 15 Modules</span>
            </button>
            <span className="text-xs font-bold text-amber-400 capitalize">
              {currentModule.replace("-", " ")}
            </span>
          </div>

          {/* Module 1: CT Dashboard */}
          {currentModule === "dashboard" && (
            <DashboardModule
              profile={profile}
              weaknesses={weaknesses}
              onSelectModule={(mod) => setCurrentModule(mod)}
              onOpenFocus={() => setIsFocusModalOpen(true)}
            />
          )}

          {/* Module 2: AI CT Analyzer */}
          {currentModule === "ai-analyzer" && (
            <AiAnalyzerModule
              apiKey={apiKey}
              onAddXp={handleAddXp}
            />
          )}

          {/* Module 3: CT Question Bank */}
          {currentModule === "question-bank" && (
            <QuestionBankModule
              onRecordWeakness={handleRecordWeakness}
              onAddXp={handleAddXp}
            />
          )}

          {/* Module 4: Previous CT Pattern Engine */}
          {currentModule === "predicted-questions" && (
            <PatternEngineModule
              onAddXp={handleAddXp}
            />
          )}

          {/* Module 5: Exam Simulator */}
          {currentModule === "simulator" && (
            <ExamSimulatorModule
              onAddXp={handleAddXp}
              onRecordExamSubmission={() => {}}
            />
          )}

          {/* Module 6: Weakness Detector */}
          {currentModule === "weaknesses" && (
            <WeaknessDetectorModule
              weaknesses={weaknesses}
              onReviewTopic={(tId, tName, u) => handleRecordWeakness(tId, tName, u, false)}
              onAddXp={handleAddXp}
            />
          )}

          {/* Module 7: One Night Revision */}
          {currentModule === "one-night" && (
            <OneNightRevisionModule
              onAddXp={handleAddXp}
            />
          )}

          {/* Module 8: Definitions Master */}
          {currentModule === "definitions" && (
            <DefinitionsMasterModule />
          )}

          {/* Module 9: Comparison Generator */}
          {currentModule === "comparisons" && (
            <ComparisonGeneratorModule />
          )}

          {/* Module 10: Code Master */}
          {currentModule === "code-master" && (
            <CodeMasterModule
              onAddXp={handleAddXp}
            />
          )}

          {/* Module 11: Flashcard Engine */}
          {currentModule === "flashcards" && (
            <FlashcardEngineModule
              onAddXp={handleAddXp}
            />
          )}

          {/* Module 12: AI Notes Compressor */}
          {currentModule === "notes-compressor" && (
            <NotesCompressorModule />
          )}

          {/* Module 13: Last Minute Sheet ("MAKE ME CT READY") */}
          {currentModule === "last-minute" && (
            <LastMinuteSheetModule
              onAddXp={handleAddXp}
            />
          )}

          {/* Module 14: Gamification */}
          {currentModule === "gamification" && (
            <GamificationModule
              xp={profile.xp}
              rank={profile.rank}
              streak={profile.streak}
              focusMinutes={profile.focusMinutes}
            />
          )}

          {/* Module 15: Smart Search */}
          {currentModule === "smart-search" && (
            <SmartSearchModule
              apiKey={apiKey}
              onAddXp={handleAddXp}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveKey}
      />

      <FocusTimer
        isOpen={isFocusModalOpen}
        onClose={() => setIsFocusModalOpen(false)}
        onSessionComplete={handleFocusSessionComplete}
      />
    </div>
  );
}

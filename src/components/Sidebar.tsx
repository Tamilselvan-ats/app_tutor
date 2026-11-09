"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Sparkles, 
  HelpCircle, 
  TrendingUp, 
  FileText, 
  AlertTriangle, 
  Moon, 
  BookOpen, 
  Columns, 
  Code2, 
  Layers, 
  Minimize2, 
  Flame, 
  Trophy, 
  Search 
} from "lucide-react";

export type ModuleKey = 
  | "dashboard"
  | "last-minute"
  | "one-night"
  | "simulator"
  | "predicted-questions"
  | "question-bank"
  | "weaknesses"
  | "definitions"
  | "comparisons"
  | "code-master"
  | "flashcards"
  | "ai-analyzer"
  | "notes-compressor"
  | "smart-search"
  | "gamification";

interface SidebarProps {
  currentModule: ModuleKey;
  onSelectModule: (module: ModuleKey) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navSections = [
    {
      heading: "CRITICAL REVISION",
      items: [
        { key: "dashboard" as ModuleKey, label: "CT Dashboard", icon: LayoutDashboard, badge: "Hub" },
        { key: "last-minute" as ModuleKey, label: "MAKE ME CT READY", icon: Flame, badge: "🔥 Emergency", highlight: true },
        { key: "one-night" as ModuleKey, label: "One Night Revision", icon: Moon, badge: "Sprints" },
      ]
    },
    {
      heading: "EXAM WEAPONS",
      items: [
        { key: "simulator" as ModuleKey, label: "Exam Simulator", icon: FileText, badge: "3x8M + 2x13M" },
        { key: "predicted-questions" as ModuleKey, label: "Previous CT Patterns", icon: TrendingUp, badge: "Trends" },
        { key: "question-bank" as ModuleKey, label: "CT Question Bank", icon: HelpCircle, badge: "2,5,8,13M" },
        { key: "weaknesses" as ModuleKey, label: "Weakness Detector", icon: AlertTriangle, badge: "Tracker" },
      ]
    },
    {
      heading: "MASTERY LABS",
      items: [
        { key: "definitions" as ModuleKey, label: "Definitions Master", icon: BookOpen, badge: "50+ Terms" },
        { key: "comparisons" as ModuleKey, label: "Comparison Generator", icon: Columns, badge: "12 Tables" },
        { key: "code-master" as ModuleKey, label: "Code Master", icon: Code2, badge: "15 Programs" },
        { key: "flashcards" as ModuleKey, label: "Flashcard Engine", icon: Layers, badge: "SM-2 Algo" },
      ]
    },
    {
      heading: "AI & INTELLIGENCE",
      items: [
        { key: "ai-analyzer" as ModuleKey, label: "AI CT Analyzer", icon: Sparkles, badge: "Upload" },
        { key: "notes-compressor" as ModuleKey, label: "Notes Compressor", icon: Minimize2, badge: "100p->1p" },
        { key: "smart-search" as ModuleKey, label: "Smart Search & AI", icon: Search, badge: "Doubt Solver" },
        { key: "gamification" as ModuleKey, label: "Gamification & XP", icon: Trophy, badge: "Ranks" },
      ]
    }
  ];

  const handleSelect = (key: ModuleKey) => {
    onSelectModule(key);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 h-screen lg:h-[calc(100vh-61px)]
        w-72 border-r border-titan-border bg-titan-bg/95 backdrop-blur-xl p-4 overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="space-y-6">
          {navSections.map((sec, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                {sec.heading}
              </h3>
              <nav className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentModule === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      className={`
                        w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all
                        ${item.highlight 
                          ? (isActive 
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20" 
                              : "bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20")
                          : (isActive
                              ? "bg-slate-800 text-amber-400 border border-slate-700 shadow-sm"
                              : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100")
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 ${isActive ? (item.highlight ? "text-slate-950" : "text-amber-400") : "text-slate-400"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`
                          text-[10px] px-1.5 py-0.5 rounded-full font-semibold
                          ${item.highlight 
                            ? (isActive ? "bg-slate-950/30 text-slate-950" : "bg-amber-500/20 text-amber-300")
                            : (isActive ? "bg-amber-400/20 text-amber-300" : "bg-slate-800 text-slate-400")
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Syllabus Tag */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-[11px] font-semibold text-slate-300">
            Advanced Programming Practice
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Unit 3 (Concurrency & JDBC) + Unit 4 (Functional & Sockets)
          </div>
        </div>
      </aside>
    </>
  );
};

"use client";

import React, { useState } from "react";
import { X, Key, CheckCircle2, AlertCircle, WifiOff, Sparkles, Shield } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    if (!inputKey.trim()) {
      setTestStatus({
        success: false,
        message: "Please enter an API key to test.",
      });
      return;
    }

    setIsTesting(true);
    setTestStatus(null);

    try {
      const res = await fetch("/api/v1/ai/test-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: inputKey.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setTestStatus({
          success: true,
          message: "API Key Verified! Live Gemini AI is active.",
        });
      } else {
        setTestStatus({
          success: false,
          message: data.error || "Failed to verify key with Gemini API.",
        });
      }
    } catch (err: any) {
      setTestStatus({
        success: false,
        message: "Network error or backend unreachable. Testing local connectivity...",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    onSaveKey(inputKey.trim());
    onClose();
  };

  const handleClear = () => {
    setInputKey("");
    onSaveKey("");
    setTestStatus({
      success: true,
      message: "Switched to 100% Offline Study Mode.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-md rounded-2xl border border-titan-border bg-slate-900 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Gemini AI Configuration</h2>
            <p className="text-xs text-slate-400">Custom API Key or Offline Study Mode</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Offline Mode Note */}
          <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 text-xs text-slate-300 flex items-start gap-2.5">
            <Shield className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-cyan-300">Offline Study Mode Guaranteed:</span>
              <p className="mt-0.5 text-slate-400">
                If no API key is entered, CT TITAN runs completely offline with rich pre-compiled Unit 3 & 4 answers, code, comparisons, and grading rubrics!
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Enter Gemini API Key
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Stored locally in your browser and used securely for live question parsing.
            </p>
          </div>

          {testStatus && (
            <div
              className={`rounded-xl p-3 text-xs flex items-center gap-2 border ${
                testStatus.success
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
              }`}
            >
              {testStatus.success ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              )}
              <span>{testStatus.message}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleTestKey}
              disabled={isTesting}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition disabled:opacity-50"
            >
              {isTesting ? "Testing Key..." : "Test Connection"}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-slate-950 hover:brightness-110 transition shadow-lg shadow-amber-500/20"
            >
              Save Key
            </button>
          </div>

          {apiKey && (
            <button
              onClick={handleClear}
              className="w-full text-center text-xs text-rose-400 hover:text-rose-300 hover:underline pt-1"
            >
              Switch to Offline Study Mode (Clear Key)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

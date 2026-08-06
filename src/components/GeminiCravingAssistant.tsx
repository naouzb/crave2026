import React, { useState } from 'react';
import { Sparkles, Bot, Send, Flame, X } from 'lucide-react';
import { askGeminiSensoryAI } from '@/lib/gemini';

export const GeminiCravingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setAiResponse(null);

    const res = await askGeminiSensoryAI(prompt.trim());
    setAiResponse(res.text);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Gemini AI Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-neon-gradient text-white font-extrabold text-xs shadow-neon hover:scale-105 transition-all animate-pulse"
      >
        <Sparkles className="w-4 h-4" />
        <span>Ask Gemini AI Concierge</span>
      </button>

      {/* Gemini AI Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-surface text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neon-gradient p-0.5 shadow-neon flex items-center justify-center">
                <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-1.5">
                  <span>CRAVE2026 Gemini AI Concierge</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-bold">
                    v1.5 Flash
                  </span>
                </h3>
                <p className="text-xs text-gray-400 font-medium">Ask anything about sensory cravings, wine pairings, or chef menus</p>
              </div>
            </div>

            {/* AI Response Display */}
            {aiResponse && (
              <div className="p-4 rounded-2xl bg-surface border border-primary/40 text-xs text-gray-200 leading-relaxed space-y-2 max-h-60 overflow-y-auto">
                <div className="flex items-center gap-1 text-primary font-bold">
                  <Flame className="w-4 h-4" />
                  <span>Gemini Sensory Recommendation:</span>
                </div>
                <p className="whitespace-pre-line">{aiResponse}</p>
              </div>
            )}

            {/* Query Form */}
            <form onSubmit={handleAsk} className="space-y-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. I want romantic 900° woodfire pizza with Pinot Noir pairing..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-surface border border-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 p-2 rounded-lg bg-neon-gradient text-white shadow-neon hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {loading && (
                <div className="text-center text-xs text-primary font-bold animate-pulse">
                  ✨ Gemini AI is analyzing flavor profiles & sensory pairings...
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

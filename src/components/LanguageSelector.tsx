import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Language } from '@/types';
import { Globe, ChevronDown } from 'lucide-react';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'EN', label: 'English', flag: '🇺🇸' },
  { code: 'UZ', label: 'O\'zbekcha', flag: '🇺🇿' },
  { code: 'RU', label: 'Русский', flag: '🇷🇺' },
  { code: 'JP', label: '日本語', flag: '🇯🇵' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-border/40 hover:bg-border border border-border/80 text-xs font-semibold text-gray-200 transition-all shadow-sm"
      >
        <Globe className="w-3.5 h-3.5 text-primary" />
        <span>{currentLang.flag}</span>
        <span>{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-card border border-border shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left font-medium transition-colors ${
                language === lang.code
                  ? 'bg-primary/20 text-primary font-bold'
                  : 'text-gray-300 hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

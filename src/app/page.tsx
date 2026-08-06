'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SpotCard } from '@/components/SpotCard';
import { SpotDetailModal } from '@/components/SpotDetailModal';
import { GeminiCravingAssistant } from '@/components/GeminiCravingAssistant';
import { AuthModal } from '@/components/AuthModal';
import { AddSpotModal } from '@/components/AddSpotModal';
import { ChatDrawer } from '@/components/ChatDrawer';
import { useSpotStore } from '@/store/useSpotStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Spot } from '@/types';
import { Flame, Utensils, Compass } from 'lucide-react';

export default function Home() {
  const { spots, searchQuery, selectedCategory } = useSpotStore();
  const { language, role } = useAuthStore();
  const [selectedSpotModal, setSelectedSpotModal] = useState<Spot | null>(null);

  const filteredSpots = spots.filter((spot) => {
    const matchesSearch =
      spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || spot.category === selectedCategory;

    if (role === 'CLIENT') {
      return matchesSearch && matchesCategory && spot.status === 'APPROVED';
    }
    return matchesSearch && matchesCategory;
  });

  const t = {
    EN: {
      gridTitle: "Sensory Dining Spots",
      gridSubtitle: "Live verified gastronomy places ranked by real gourmet activity",
      empty: "No sensory spots found matching your craving search criteria.",
      footer: "CRAVE2026 - Production Ready Sensory Food & Dining Engine.",
    },
    UZ: {
      gridTitle: "Sensory Gastronomik Maskanlar",
      gridSubtitle: "Gurmanlar faolligi bo'yicha tasdiqlangan eng saralangan maskanlar",
      empty: "Qidiruvingizga mos keladigan maskanlar topilmadi.",
      footer: "CRAVE2026 - Tizim Toliq Ishchi Holatda.",
    },
    RU: {
      gridTitle: "Сенсорные Заведения",
      gridSubtitle: "Проверенные гастрономические локации с высоким рейтингом",
      empty: "По вашему запросу заведений не найдено.",
      footer: "CRAVE2026 - Платформа нового поколения.",
    },
    JP: {
      gridTitle: "五感で愉しむレストラン一覧",
      gridSubtitle: "リアルタイムで認証された最高峰のグルメスポット",
      empty: "検索条件に一致するレストランが見つかりませんでした。",
      footer: "CRAVE2026 - 次世代グルメディスカバリーエンジン",
    }
  }[language];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-white">
      <div>
        {/* Sticky Header */}
        <Header />

        {/* Hero Section with Glassmorphic Search & Appetite Placeholders */}
        <HeroSection />

        {/* Sensory Spots Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary animate-spin-slow" />
                <h2 className="text-2xl sm:text-3xl font-black text-white">{t.gridTitle}</h2>
              </div>
              <p className="text-xs text-gray-400 font-medium mt-1">{t.gridSubtitle}</p>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-gray-300">
              Showing <strong className="text-primary">{filteredSpots.length}</strong> Spots
            </div>
          </div>

          {filteredSpots.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-card border border-border space-y-4">
              <Utensils className="w-12 h-12 text-gray-500 mx-auto animate-bounce" />
              <p className="text-sm font-bold text-gray-300">{t.empty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredSpots.map((spot) => (
                <SpotCard
                  key={spot.id}
                  spot={spot}
                  onOpenDetail={(s) => setSelectedSpotModal(s)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Interactive Floating Gemini AI Assistant */}
      <GeminiCravingAssistant />

      {/* Spot Detail Modal */}
      <SpotDetailModal
        spot={selectedSpotModal}
        onClose={() => setSelectedSpotModal(null)}
      />

      {/* Global Interactive Modals */}
      <AuthModal />
      <AddSpotModal />
      <ChatDrawer />

      {/* Footer */}
      <footer className="border-t border-border/80 bg-surface/40 py-8 px-4 text-center text-xs text-gray-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary fill-primary" />
            <span className="font-extrabold text-white">CRAVE2026</span>
            <span>— {t.footer}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-primary transition-colors cursor-pointer">API Integration</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

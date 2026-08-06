import React, { useState, useEffect } from 'react';
import { useSpotStore } from '@/store/useSpotStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Search, Flame, Sparkles } from 'lucide-react';

const APPETITE_PLACEHOLDERS = [
  "Craving 45-day Himalayan salt dry-aged Wagyu?...",
  "Looking for romantic 900° woodfire Neapolitan pizza?...",
  "Craving wild Toyosu Bluefin Toro Omakase?...",
  "Need 24-hour slow-cooked spicy Tonkotsu ramen?...",
  "Searching for artisanal French patisserie & soufflé?..."
];

export const HeroSection: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useSpotStore();
  const { language } = useAuthStore();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % APPETITE_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    'All',
    'Omakase & Sushi',
    'Neapolitan Pizza',
    'Dry-Aged Steak',
    'Craft Ramen',
    'Artisanal Pastry'
  ];

  const t = {
    EN: {
      badge: "Sensory Food Discovery Redefined",
      headline: "Curated Culinary Artistry for True Gourmets",
      subtitle: "Explore high-gastronomy spots, woodfire pizzerias, and private chef omakases in real time.",
      allCategories: "🔥 All Categories",
    },
    UZ: {
      badge: "Sensory Oziq-Ovqat Kashfiyoti Qaytadan Yaratildi",
      headline: "Haqiqiy Gurmanlar Uchun Saralangan Oshxona San'ati",
      subtitle: "Yuqori gastronomik maskanlar, o'tin pechida yopilgan pitsalar va xususiy oshpazlarni jonli muloqotda kashf eting.",
      allCategories: "🔥 Barcha Kategoriyalar",
    },
    RU: {
      badge: "Сенсорный Поиск Заведений Redefined",
      headline: "Авторская Кулинария Для Настоящих Гурманов",
      subtitle: "Исследуйте заведения высокой кухни, дровяные пиццерии и приватные омакасе в реальном времени.",
      allCategories: "🔥 Все Категории",
    },
    JP: {
      badge: "五感で味わう新しいグルメ発見プラットフォーム",
      headline: "本物を求める人のための厳選された料理芸術",
      subtitle: "最高峰のおまかせ、薪窯ピッツァ、熟成肉をリアルタイムで検索・体験。",
      allCategories: "🔥 すべてのカテゴリー",
    }
  }[language];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-border/40 overflow-hidden bg-gradient-to-b from-background via-surface/40 to-background">
      {/* Ambient Lighting Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-red-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/40 text-xs font-black text-primary uppercase shadow-neon">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
          {t.headline}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
          {t.subtitle}
        </p>

        {/* Glassmorphic Search Bar with Dynamic Typewriter Placeholder */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative group">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={APPETITE_PLACEHOLDERS[placeholderIndex]}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:border-primary/80 focus:ring-2 focus:ring-primary/20 shadow-2xl transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-neon-gradient text-white shadow-neon scale-105'
                    : 'bg-surface/80 border border-border text-gray-400 hover:text-white hover:border-primary/40'
                }`}
              >
                {cat === 'All' ? t.allCategories : cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

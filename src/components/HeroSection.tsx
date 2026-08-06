import React from 'react';
import { useSpotStore } from '@/store/useSpotStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Search, Sparkles, Flame, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Omakase & Sushi',
  'Neapolitan Pizza',
  'Dry-Aged Steak',
  'Craft Ramen',
  'Artisanal Pastry',
];

export const HeroSection: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useSpotStore();
  const { language } = useAuthStore();

  const t = {
    EN: {
      badge: "Sensory Food Discovery Redefined",
      headline: "Curated Culinary Artistry for True Gourmets",
      subtitle: "Explore high-gastronomy spots, woodfire pizzerias, and private chef omakases in real time.",
      searchPlaceholder: "What are you craving today? (e.g. Omakase, Neapolitan, Wagyu)...",
    },
    UZ: {
      badge: "Sensory Oziq-Ovqat Kashfiyoti Qaytadan Yaratildi",
      headline: "Haqiqiy Gurmanlar Uchun Saralangan Oshxona San'ati",
      subtitle: "Yuqori gastronomik maskanlar, o'tin pechida yopilgan pitsalar va xususiy oshpazlarni jonli muloqotda kashf eting.",
      searchPlaceholder: "Bugun nimani tamaddidan xohlaysiz? (masalan: Omakase, Pitsa, Wagyu)...",
    },
    RU: {
      badge: "Сенсорный Поиск Заведений Redefined",
      headline: "Авторская Кулинария Для Настоящих Гурманов",
      subtitle: "Исследуйте заведения высокой кухни, дровяные пиццерии и приватные омакасе в реальном времени.",
      searchPlaceholder: "Что вы хотите попробовать сегодня? (например, Суши, Пицца, Стейк)...",
    },
    JP: {
      badge: "五感で味わう新しいグルメ発見プラットフォーム",
      headline: "本物を求める人のための厳選された料理芸術",
      subtitle: "最高峰のおまかせ、薪窯ピッツァ、熟成肉をリアルタイムで検索・体験。",
      searchPlaceholder: "今日のごちそうは何ですか？（おまかせ、ラーメン、ピッツァ）...",
    }
  }[language];

  return (
    <section className="relative w-full overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-surface/40 to-background border-b border-border/50">
      {/* Background Ambient Food Art & Glow */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80')` }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-primary/40 text-xs font-black text-primary shadow-neon">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">{t.badge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
          {t.headline.split(' ').map((word, i) => (
            <span key={i} className={i % 3 === 1 ? 'text-gradient font-black' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-medium">
          {t.subtitle}
        </p>

        {/* Dynamic Search Bar */}
        <div className="relative max-w-2xl mx-auto pt-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-14 py-4 rounded-2xl bg-card/90 border border-border/80 text-white text-sm placeholder-gray-500 shadow-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all"
            />
            <div className="absolute right-3 p-2 rounded-xl bg-surface border border-border text-gray-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Filter Chips / Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-neon-gradient text-white shadow-neon scale-105'
                  : 'bg-card border border-border text-gray-400 hover:text-white hover:border-gray-600'
              }`}
            >
              {cat === 'All' ? '🔥 All Craving Categories' : cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

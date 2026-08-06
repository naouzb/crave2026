import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useSpotStore } from '@/store/useSpotStore';
import { useChatStore } from '@/store/useChatStore';
import { LanguageSelector } from './LanguageSelector';
import { 
  Flame, 
  Plus, 
  ShieldCheck, 
  Eye, 
  UtensilsCrossed, 
  MessageSquare, 
  User as UserIcon, 
  LogOut,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, role, setRole, openAuthModal, logout, language } = useAuthStore();
  const { spots, openAddSpotModal } = useSpotStore();
  const { unreadCount, isChatOpen, markMessagesAsRead } = useChatStore();

  const totalViewsToday = spots.reduce((acc, s) => acc + s.viewsToday, 0);
  const activeSpotsCount = spots.filter((s) => s.status === 'APPROVED').length;

  const t = {
    EN: {
      adminMode: "ADMIN MODE ACTIVE",
      businessMode: "BUSINESS OWNER MODE",
      activeSpots: "Active Spots",
      viewsToday: "Total Views Today",
      addNewSpot: "Add New Spot",
      login: "Sign In / Register",
      logout: "Sign Out",
      foodieRole: "Hungry Foodie",
      ownerRole: "Restaurant Owner",
      adminRole: "Super Admin",
    },
    UZ: {
      adminMode: "ADMIN REJIM FAOL",
      businessMode: "RESTORAN EGASI REJIMI",
      activeSpots: "Faol Maskanlar",
      viewsToday: "Bugungi Ko'rishlar",
      addNewSpot: "+ Yangi Maskan Qo'shish",
      login: "Kirish / Ro'yxatdan O'tish",
      logout: "Chiqish",
      foodieRole: "Mijoz (Foodie)",
      ownerRole: "Restoran Egasi",
      adminRole: "Super Admin",
    },
    RU: {
      adminMode: "АДМИН РЕЖИМ АКТИВЕН",
      businessMode: "РЕЖИМ ВЛАДЕЛЬЦА",
      activeSpots: "Активные Заведения",
      viewsToday: "Просмотров За День",
      addNewSpot: "+ Добавить Заведение",
      login: "Войти / Регистрация",
      logout: "Выйти",
      foodieRole: "Гурман (Клиент)",
      ownerRole: "Владелец Заведения",
      adminRole: "Супер Админ",
    },
    JP: {
      adminMode: "管理者モード アクティブ",
      businessMode: "店舗オーナーモード",
      activeSpots: "アクティブな店舗",
      viewsToday: "本日の閲覧数",
      addNewSpot: "+ 新規スポット追加",
      login: "ログイン / 登録",
      logout: "ログアウト",
      foodieRole: "グルメクライアント",
      ownerRole: "レストランオーナー",
      adminRole: "スーパー管理者",
    }
  }[language];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/90 border-b border-border shadow-xl">
      {/* Secondary Dynamic Extension Bar for BUSINESS / ADMIN Mode */}
      {(role === 'BUSINESS' || role === 'ADMIN') && (
        <div className="w-full bg-gradient-to-r from-orange-950/80 via-red-950/70 to-background border-b border-orange-500/30 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 font-extrabold border border-orange-500/40 shadow-neon">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              {role === 'ADMIN' ? t.adminMode : t.businessMode}
            </span>

            <div className="flex items-center gap-4 text-gray-300 font-medium">
              <span className="flex items-center gap-1.5">
                <UtensilsCrossed className="w-3.5 h-3.5 text-orange-400" />
                <span>{t.activeSpots}:</span>
                <strong className="text-white font-bold">{activeSpotsCount}</strong>
              </span>

              <span className="hidden sm:flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-red-400" />
                <span>{t.viewsToday}:</span>
                <strong className="text-white font-bold">{totalViewsToday.toLocaleString()}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddSpotModal}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neon-gradient text-white font-bold shadow-neon hover:scale-105 active:scale-95 transition-all text-xs"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{t.addNewSpot}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Standard Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon-gradient p-0.5 shadow-neon flex items-center justify-center">
            <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary fill-primary animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white font-sans">
                CRAVE<span className="text-primary font-extrabold">2026</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-bold uppercase tracking-wider">
                Sensory
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide hidden md:block">
              Sensory Food Discovery & Dining Engine
            </p>
          </div>
        </div>

        {/* Role Quick Selector Toggle (Interactive Demo Bar) */}
        <div className="hidden lg:flex items-center bg-card border border-border rounded-xl p-1 gap-1">
          <button
            onClick={() => setRole('CLIENT')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              role === 'CLIENT'
                ? 'bg-primary text-white shadow-sm font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🍕 {t.foodieRole}
          </button>
          <button
            onClick={() => setRole('BUSINESS')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              role === 'BUSINESS'
                ? 'bg-primary text-white shadow-sm font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🧑‍🍳 {t.ownerRole}
          </button>
          <button
            onClick={() => setRole('ADMIN')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              role === 'ADMIN'
                ? 'bg-red-600 text-white shadow-sm font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚡ {t.adminRole}
          </button>
        </div>

        {/* Right Action Icons & Auth Profile */}
        <div className="flex items-center gap-3">
          <LanguageSelector />

          {/* Unread Chat Badge Icon */}
          <div className="relative">
            <button
              onClick={markMessagesAsRead}
              className="p-2 rounded-xl bg-card border border-border hover:border-primary/50 text-gray-300 hover:text-white transition-all"
              title="Real-Time Sensory Messages"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center animate-bounce shadow-neon">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Auth Button or User Avatar */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-card border border-border">
                <div className="w-7 h-7 rounded-lg bg-neon-gradient text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-white line-clamp-1">{currentUser.name}</p>
                  <p className="text-[10px] text-primary font-semibold uppercase">{role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl bg-card border border-border hover:bg-red-500/20 hover:border-red-500/40 text-gray-400 hover:text-red-400 transition-all"
                title={t.logout}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-gradient text-white text-xs font-bold shadow-neon hover:scale-105 active:scale-95 transition-all"
            >
              <UserIcon className="w-4 h-4" />
              <span>{t.login}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

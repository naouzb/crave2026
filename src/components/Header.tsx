'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useSpotStore } from '@/store/useSpotStore';
import { useChatStore } from '@/store/useChatStore';
import { LanguageSelector } from './LanguageSelector';
import { 
  Flame, 
  Plus, 
  MessageSquare, 
  LogOut,
  LogIn,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const { currentUser, openAuthModal, logout, language } = useAuthStore();
  const { spots, openAddSpotModal } = useSpotStore();
  const { unreadCount, markMessagesAsRead } = useChatStore();

  const isBusinessUser = currentUser?.role === 'BUSINESS' || currentUser?.role === 'ADMIN';
  const isAdmin = currentUser?.role === 'ADMIN' || currentUser?.email === 'naouzb11@gmail.com';
  const totalViewsToday = spots.reduce((acc, s) => acc + s.viewsToday, 0);
  const activeSpotsCount = spots.filter((s) => s.status === 'APPROVED').length;

  const t = {
    EN: {
      signIn: "Sign In",
      signUp: "Sign Up",
      logout: "Log Out",
      activeSpots: "Active Spots",
      viewsToday: "Total Views Today",
      addNewSpot: "Add New Spot",
      adminPanel: "Admin Panel",
    },
    UZ: {
      signIn: "Kirish",
      signUp: "Registratsiya",
      logout: "Chiqish",
      activeSpots: "Faol Maskanlar",
      viewsToday: "Bugungi Ko'rishlar",
      addNewSpot: "+ Yangi Maskan Qo'shish",
      adminPanel: "Admin Paneli",
    },
    RU: {
      signIn: "Войти",
      signUp: "Регистрация",
      logout: "Выйти",
      activeSpots: "Активные Заведения",
      viewsToday: "Просмотров За День",
      addNewSpot: "+ Добавить Заведение",
      adminPanel: "Панель Админа",
    },
    JP: {
      signIn: "ログイン",
      signUp: "新規登録",
      logout: "ログアウト",
      activeSpots: "アクティブ店舗",
      viewsToday: "本日の閲覧数",
      addNewSpot: "+ 新規スポット追加",
      adminPanel: "管理者パネル",
    }
  }[language];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/90 border-b border-border shadow-xl relative pointer-events-auto">
      {/* Optional Business Extension Top Bar for Business Owners */}
      {isBusinessUser && (
        <div className="w-full bg-gradient-to-r from-orange-950/80 via-red-950/70 to-background border-b border-orange-500/30 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-gray-300 font-medium">
            <span>{t.activeSpots}: <strong className="text-white font-bold">{activeSpotsCount}</strong></span>
            <span>{t.viewsToday}: <strong className="text-white font-bold">{totalViewsToday.toLocaleString()}</strong></span>
          </div>

          <button
            onClick={openAddSpotModal}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neon-gradient text-white font-bold shadow-neon hover:scale-105 transition-all text-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t.addNewSpot}</span>
          </button>
        </div>
      )}

      {/* Main Clean Standard Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
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
          </div>
        </Link>

        {/* Right Action Icons & Standard Authentication Buttons */}
        <div className="flex items-center gap-3 relative z-50 pointer-events-auto">
          <LanguageSelector />

          {/* Admin Panel Direct Link (If Admin) */}
          {isAdmin && (
            <Link
              href="/admin"
              className="px-3.5 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-extrabold text-xs shadow-neon hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>{t.adminPanel}</span>
            </Link>
          )}

          {/* Unread Chat Badge Icon */}
          <div className="relative">
            <button
              onClick={markMessagesAsRead}
              className="p-2 rounded-xl bg-card border border-border hover:border-primary/50 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Sensory Chef Chat"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center animate-bounce shadow-neon">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Standard Authentication Header Flow */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-card border border-border">
                <div className="w-7 h-7 rounded-lg bg-neon-gradient text-white flex items-center justify-center font-black text-xs shadow-neon">
                  {currentUser.firstName ? currentUser.firstName.charAt(0) : currentUser.name?.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-white leading-tight">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <p className="text-[10px] text-primary font-semibold uppercase">{currentUser.role}</p>
                </div>
              </div>

              {/* Log Out Button */}
              <button
                onClick={logout}
                className="p-2 rounded-xl bg-card border border-border hover:bg-red-500/20 hover:border-red-500/40 text-gray-400 hover:text-red-400 transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
                title={t.logout}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">{t.logout}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 relative z-50 pointer-events-auto">
              {/* Sign In Button */}
              <button
                onClick={() => openAuthModal('signin')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface border border-border hover:border-primary/60 text-white text-xs font-bold transition-all cursor-pointer relative z-50 pointer-events-auto hover:scale-105 active:scale-95"
              >
                <LogIn className="w-4 h-4 text-primary" />
                <span>{t.signIn}</span>
              </button>

              {/* Sign Up Button */}
              <button
                onClick={() => openAuthModal('signup')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neon-gradient text-white text-xs font-extrabold shadow-neon hover:scale-105 active:scale-95 transition-all cursor-pointer relative z-50 pointer-events-auto"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.signUp}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

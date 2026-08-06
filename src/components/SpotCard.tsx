'use client';

import React, { useState } from 'react';
import { Spot } from '@/types';
import { useSpotStore } from '@/store/useSpotStore';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Star, 
  Eye, 
  MessageCircle, 
  CheckCircle2, 
  Flame, 
  Tag, 
  MapPin, 
  Phone, 
  Share2, 
  ShoppingBag, 
  Sparkles,
  Lock
} from 'lucide-react';

interface SpotCardProps {
  spot: Spot;
  onOpenDetail?: (spot: Spot) => void;
}

export const SpotCard: React.FC<SpotCardProps> = ({ spot, onOpenDetail }) => {
  const { incrementViews } = useSpotStore();
  const { openChatForSpot } = useChatStore();
  const { currentUser, openAuthModal, language } = useAuthStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCardClick = () => {
    incrementViews(spot.id);
    if (onOpenDetail) {
      onOpenDetail(spot);
    }
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openChatForSpot(spot);
  };

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerToast("🚀 Ordering and Table Reservations are launching very soon! Stay tuned.");
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: spot.title,
          text: spot.description,
          url: window.location.href,
        });
      } catch (err) {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("🔗 Restaurant link copied to clipboard!");
    }
  };

  const handleRatingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      triggerToast("🔒 Please log in to rate this spot.");
      openAuthModal('signin');
    } else if (onOpenDetail) {
      onOpenDetail(spot);
    }
  };

  const t = {
    EN: {
      verified: "VERIFIED SPOT",
      chat: "Chat with Owner",
      order: "Order",
      looking: "looking right now",
    },
    UZ: {
      verified: "TASDIQLANGAN MASKAN",
      chat: "Muloqot",
      order: "Buyurtma",
      looking: "kishi kuzatmoqda",
    },
    RU: {
      verified: "ПРОВЕРЕНО",
      chat: "Чат с Шефом",
      order: "Заказать",
      looking: "смотрят сейчас",
    },
    JP: {
      verified: "認証済み店舗",
      chat: "チャット",
      order: "注文",
      looking: "人が閲覧中",
    }
  }[language];

  return (
    <div
      onClick={handleCardClick}
      className="group relative rounded-3xl bg-card border border-border overflow-hidden flex flex-col justify-between hover:border-primary/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 cursor-pointer"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-4 right-4 z-50 px-4 py-2.5 rounded-xl bg-neon-gradient text-white text-xs font-black shadow-neon animate-in fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cover Image & Badges Overlay */}
      <div className="relative h-56 w-full bg-surface overflow-hidden">
        <img
          src={spot.coverImage}
          alt={spot.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-wider shadow-lg">
            {spot.category}
          </span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white transition-all shadow-lg hover:scale-110"
          title="Share Spot"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>

        {/* Neuromarketing FOMO Social Proof Badge */}
        <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-primary/40 text-[10px] font-black text-primary flex items-center gap-1.5 shadow-neon">
          <Flame className="w-3.5 h-3.5 fill-primary animate-pulse" />
          <span>{spot.fomoText || `🔥 14 ${t.looking}`}</span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Header Row: Rating & Verified Badge */}
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-black text-emerald-400 uppercase tracking-wide">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{t.verified}</span>
            </span>

            {/* Auth-Gated Rating Badge */}
            <button
              onClick={handleRatingClick}
              className="flex items-center gap-1 font-bold text-yellow-400 hover:scale-105 transition-transform"
            >
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              <span>⭐ {spot.rating || 4.8}</span>
              <span className="text-[10px] text-gray-400 font-medium">({spot.reviewsCount || 215})</span>
            </button>
          </div>

          {/* Title */}
          <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors line-clamp-1">
            {spot.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-400 line-clamp-2 font-medium leading-relaxed">
            {spot.description}
          </p>

          {/* Micro-Icons Data Bar: Price, Location, Phone, Calories */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-gray-300 font-bold border-t border-border/60">
            <div className="flex items-center gap-1.5 truncate">
              <Tag className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{spot.priceInfo || 'Avg 150,000 UZS'}</span>
            </div>

            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="truncate">{spot.location || 'Central Promenade'}</span>
            </div>

            <div className="flex items-center gap-1.5 truncate">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{spot.phoneNumber || '+998 90 999 88 77'}</span>
            </div>

            <div className="flex items-center gap-1.5 truncate">
              <Flame className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="truncate">{spot.calories || '850 kcal'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-4 border-t border-border/80 grid grid-cols-2 gap-2">
          <button
            onClick={handleChatClick}
            className="py-2.5 px-3 rounded-xl bg-surface border border-primary/40 hover:bg-neon-gradient text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md group/btn"
          >
            <MessageCircle className="w-3.5 h-3.5 text-primary group-hover/btn:text-white transition-colors" />
            <span className="truncate">{t.chat}</span>
          </button>

          <button
            onClick={handleOrderClick}
            className="py-2.5 px-3 rounded-xl bg-neon-gradient text-white text-xs font-black shadow-neon flex items-center justify-center gap-1.5 hover:scale-105 transition-all duration-300"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.order}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

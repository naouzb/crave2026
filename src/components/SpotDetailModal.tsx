import React, { useState } from 'react';
import { Spot } from '@/types';
import { useSpotStore } from '@/store/useSpotStore';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { X, Star, MapPin, Eye, ChefHat, MessageCircle, Clock, Utensils, Trash2, Award } from 'lucide-react';

interface SpotDetailModalProps {
  spot: Spot | null;
  onClose: () => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({ spot, onClose }) => {
  const { openChatForSpot } = useChatStore();
  const { language, currentUser, openAuthModal } = useAuthStore();
  const { rateSpot, removeRating } = useSpotStore();
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  if (!spot) return null;

  const userRatingObj = spot.ratingsList?.find((r) => r.userId === currentUser?.id);
  const currentUserRating = userRatingObj?.rating || null;

  const handleStarClick = (starValue: number) => {
    if (!currentUser) {
      openAuthModal('signin');
      return;
    }
    rateSpot(spot.id, currentUser.id, starValue);
  };

  const handleRemoveRating = () => {
    if (!currentUser) return;
    removeRating(spot.id, currentUser.id);
  };

  const t = {
    EN: {
      tastingMenu: "Signature Sensory Tasting Menu",
      chatChef: "Chat Directly with Chef & Host",
      openingHours: "Open Daily: 5:00 PM – 11:30 PM",
      location: "Location & Neighborhood",
      ratingTitle: "Rate this Sensory Spot",
      yourRating: "Your Current Rating:",
      removeRatingBtn: "Remove Rating (Bahoni o'chirish)",
      signInToRate: "Sign in to rate this spot",
      reviews: "Gourmet Reviews",
    },
    UZ: {
      tastingMenu: "Mualliflik Sensory Taomlar Menyusi",
      chatChef: "Oshpaz Bilan Muloqot Qilish",
      openingHours: "Har kuni ochiq: 17:00 – 23:30",
      location: "Manzil va Hudud",
      ratingTitle: "Ushbu Restoranga Baho Bering",
      yourRating: "Sizning Bahongiz:",
      removeRatingBtn: "Bahoni o'chirish (Remove Rating)",
      signInToRate: "Baho berish uchun tizimga kiring",
      reviews: "Gurmanlar Sharhlari",
    },
    RU: {
      tastingMenu: "Дегустационное Меню Шефа",
      chatChef: "Чат с Шефом и Хостес",
      openingHours: "Ежедневно: 17:00 – 23:30",
      location: "Локация и Адрес",
      ratingTitle: "Оцените заведение",
      yourRating: "Ваша текущая оценка:",
      removeRatingBtn: "Удалить оценку (Bahoni o'chirish)",
      signInToRate: "Войдите, чтобы поставить оценку",
      reviews: "Отзывы Гурманов",
    },
    JP: {
      tastingMenu: "シグネチャーコースメニュー",
      chatChef: "シェフとダイレクトチャット",
      openingHours: "営業時間: 17:00 – 23:30",
      location: "所在地",
      ratingTitle: "スポットを評価する",
      yourRating: "あなたの評価:",
      removeRatingBtn: "評価を削除する",
      signInToRate: "評価するにはログインしてください",
      reviews: "グルメレビュー",
    }
  }[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-surface border border-border hover:bg-border text-gray-400 hover:text-white transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-surface border border-border shadow-inner">
          <img src={spot.coverImage} alt={spot.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-black/30 to-black/50" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-black text-white">
              {spot.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 text-yellow-400 text-sm font-black mb-1">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>⭐ {spot.rating || 4.8}</span>
                <span className="text-xs text-gray-300 font-normal">({spot.reviewsCount || 215} {t.reviews})</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">{spot.title}</h2>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-border text-xs font-bold text-gray-300">
              <Eye className="w-4 h-4 text-primary" />
              <span>{spot.viewsToday} {t.viewsToday || 'views'}</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Details & Interactive Rating */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Sensory Concept</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{spot.description}</p>
            </div>

            {/* Interactive Rating Component */}
            <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>{t.ratingTitle}</span>
              </h4>

              {/* Star Rating Inputs */}
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating !== null ? hoverRating >= star : (currentUserRating || 0) >= star);
                  return (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => handleStarClick(star)}
                      className="p-1 text-yellow-400 hover:scale-125 transition-transform focus:outline-none"
                    >
                      <Star className={`w-7 h-7 ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                    </button>
                  );
                })}

                {currentUserRating && (
                  <span className="text-xs font-black text-yellow-400 ml-2">
                    {t.yourRating} ⭐ {currentUserRating}/5
                  </span>
                )}
              </div>

              {/* Remove Rating Button (Bahoni o'chirish) */}
              {currentUserRating ? (
                <div className="pt-2">
                  <button
                    onClick={handleRemoveRating}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 text-xs font-extrabold transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.removeRatingBtn}</span>
                  </button>
                </div>
              ) : !currentUser ? (
                <p className="text-[11px] text-gray-500 font-medium">{t.signInToRate}</p>
              ) : null}
            </div>

            {/* Signature Tasting Highlights */}
            <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
              <h4 className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                <span>{t.tastingMenu}</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">01.</span>
                  <span><strong>Wild Toyosu Bluefin Toro:</strong> 7-day aged Otoro with freshly grated Wasabi root and smoked Shoyu glaze.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">02.</span>
                  <span><strong>Vesuvian Volcanic Stone Pizza:</strong> San Marzano DOP, Bufala Mozzarella & 48hr fermented sourdough.</span>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-white font-bold">{t.location}:</span>
                <span>{spot.location || 'Central Downtown Promenade'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>{t.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Chef Chat */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-surface border border-border space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neon-gradient p-0.5 shadow-neon flex items-center justify-center">
                  <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center font-bold text-xs text-white">
                    <ChefHat className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">{spot.ownerName || 'Master Chef'}</h4>
                  <span className="text-[10px] text-emerald-400 font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online for Chat
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  openChatForSpot(spot);
                }}
                className="w-full py-3 rounded-xl bg-neon-gradient text-white text-xs font-extrabold shadow-neon hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.chatChef}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

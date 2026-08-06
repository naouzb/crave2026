import React from 'react';
import { Spot } from '@/types';
import { useSpotStore } from '@/store/useSpotStore';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { X, Star, MapPin, Eye, ChefHat, MessageCircle, Calendar, ShieldCheck, Sparkles, Phone, Clock, Utensils } from 'lucide-react';

interface SpotDetailModalProps {
  spot: Spot | null;
  onClose: () => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({ spot, onClose }) => {
  const { openChatForSpot } = useChatStore();
  const { language, role } = useAuthStore();
  const { approveSpot } = useSpotStore();

  if (!spot) return null;

  const t = {
    EN: {
      tastingMenu: "Signature Sensory Tasting Menu",
      reservation: "Request Reservation / Inquiry",
      chatChef: "Chat Directly with Chef & Host",
      openingHours: "Open Daily: 5:00 PM – 11:30 PM",
      location: "Location & Neighborhood",
      reviews: "Gourmet Reviews & Ratings",
      approveBtn: "Approve Spot (Admin Action)",
    },
    UZ: {
      tastingMenu: "Mualliflik Sensory Taomlar Menyusi",
      reservation: "Stol Bron Qilish / So'rov",
      chatChef: "Oshpaz Bilan Muloqot Qilish",
      openingHours: "Har kuni ochiq: 17:00 – 23:30",
      location: "Manzil va Hudud",
      reviews: "Gurmanlar Sharhlari",
      approveBtn: "Maskanni Tasdiqlash (Admin)",
    },
    RU: {
      tastingMenu: "Дегустационное Меню Шефа",
      reservation: "Забронировать Стол",
      chatChef: "Чат с Шефом и Хостес",
      openingHours: "Ежедневно: 17:00 – 23:30",
      location: "Локация и Адрес",
      reviews: "Отзывы Гурманов",
      approveBtn: "Одобрить Заведение (Админ)",
    },
    JP: {
      tastingMenu: "シグネチャーコースメニュー",
      reservation: "ご予約・お問い合わせ",
      chatChef: "シェフとダイレクトチャット",
      openingHours: "営業時間: 17:00 – 23:30",
      location: "所在地",
      reviews: "グルメレビュー",
      approveBtn: "承認する（管理者行動）",
    }
  }[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-surface border border-border hover:bg-border text-gray-400 hover:text-white transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Cover Image Banner */}
        <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-surface border border-border shadow-inner">
          <img src={spot.coverImage} alt={spot.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-black/30 to-black/50" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-black text-white">
              {spot.category}
            </span>
            {spot.isFeatured && (
              <span className="px-3 py-1 rounded-full bg-neon-gradient text-white text-xs font-black shadow-neon flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Featured Spot
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 text-yellow-400 text-sm font-black mb-1">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>{spot.rating || 4.9}</span>
                <span className="text-xs text-gray-300 font-normal">({spot.reviewsCount || 120} Verified Gourmet Reviews)</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">{spot.title}</h2>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-border text-xs font-bold text-gray-300">
              <Eye className="w-4 h-4 text-primary" />
              <span>{spot.viewsToday} views today</span>
            </div>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left 2 columns: Details & Tasting Menu */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-black text-gray-300 uppercase tracking-wider mb-2">Sensory Concept</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{spot.description}</p>
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
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">03.</span>
                  <span><strong>A5 Miyazaki Wagyu:</strong> Salt-block seared with Binchotan charcoal smoke infusion.</span>
                </li>
              </ul>
            </div>

            {/* Location & Operating Details */}
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

          {/* Right Column: Actions & Direct Host Chat */}
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

              {role === 'ADMIN' && spot.status === 'PENDING' && (
                <button
                  onClick={() => {
                    approveSpot(spot.id);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg transition-all"
                >
                  {t.approveBtn}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

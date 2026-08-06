import React from 'react';
import { Spot } from '@/types';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useSpotStore } from '@/store/useSpotStore';
import { Eye, MessageCircle, Star, MapPin, CheckCircle, ShieldAlert, Sparkles, ChefHat } from 'lucide-react';

interface SpotCardProps {
  spot: Spot;
}

export const SpotCard: React.FC<SpotCardProps> = ({ spot }) => {
  const { openChatForSpot } = useChatStore();
  const { role, language } = useAuthStore();
  const { approveSpot, incrementViews } = useSpotStore();

  const handleCardClick = () => {
    incrementViews(spot.id);
  };

  const t = {
    EN: {
      chatWithOwner: "Chat with Owner",
      pendingApproval: "PENDING APPROVAL",
      approved: "VERIFIED SPOT",
      approveBtn: "Approve Spot (Admin)",
      views: "views today",
      chef: "Owner / Chef",
    },
    UZ: {
      chatWithOwner: "Restoran Egasi Bilan Muloqot",
      pendingApproval: "TASDIQLANISHI KUTILMOQDA",
      approved: "TASDIQLANGAN MASKAN",
      approveBtn: "Maskanni Tasdiqlash (Admin)",
      views: "bugun ko'rildi",
      chef: "Restoran Egasi / Oshpaz",
    },
    RU: {
      chatWithOwner: "Чат с Владельцем",
      pendingApproval: "НА ПРОВЕРКЕ",
      approved: "ПРОВЕРЕННОЕ ЗАВЕДЕНИЕ",
      approveBtn: "Одобрить (Админ)",
      views: "просмотров",
      chef: "Шеф / Владелец",
    },
    JP: {
      chatWithOwner: "オーナーとチャット",
      pendingApproval: "承認待ち",
      approved: "認証済み店舗",
      approveBtn: "承認する（管理者）",
      views: "本日の閲覧",
      chef: "シェフ / オーナー",
    }
  }[language];

  return (
    <div 
      onClick={handleCardClick}
      className="group relative rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/60 transition-all duration-300 hover:shadow-neon flex flex-col justify-between"
    >
      {/* Top Image Banner */}
      <div className="relative h-52 w-full overflow-hidden bg-surface">
        <img
          src={spot.coverImage}
          alt={spot.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-black/40" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-extrabold text-white">
          {spot.category}
        </div>

        {/* Featured Badge */}
        {spot.isFeatured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-neon-gradient text-white text-[10px] font-black shadow-neon uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}

        {/* Views Counter */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-border text-[11px] font-bold text-gray-300">
          <Eye className="w-3.5 h-3.5 text-primary" />
          <span>{spot.viewsToday} {t.views}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Status Badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {spot.status === 'PENDING' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-yellow-400 bg-yellow-500/10 px-2.5 py-0.5 rounded-md border border-yellow-500/30">
                <ShieldAlert className="w-3 h-3" />
                {t.pendingApproval}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                <CheckCircle className="w-3 h-3" />
                {t.approved}
              </span>
            )}

            {spot.rating && (
              <div className="flex items-center gap-1 text-xs font-black text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <span>{spot.rating}</span>
                <span className="text-[10px] text-gray-500 font-normal">({spot.reviewsCount})</span>
              </div>
            )}
          </div>

          <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors line-clamp-1">
            {spot.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {spot.description}
          </p>
        </div>

        {/* Location & Owner info */}
        <div className="pt-3 border-t border-border/60 space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1 text-gray-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="line-clamp-1">{spot.location || 'Central Gourmet Hub'}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-300 font-bold">
              <ChefHat className="w-3.5 h-3.5 text-orange-400" />
              <span>{spot.ownerName || 'Master Chef'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openChatForSpot(spot);
              }}
              className="w-full py-2.5 rounded-xl bg-surface border border-primary/40 hover:bg-primary hover:border-primary text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm group-hover:bg-primary"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.chatWithOwner}</span>
            </button>

            {/* Admin Approval Button */}
            {role === 'ADMIN' && spot.status === 'PENDING' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  approveSpot(spot.id);
                }}
                className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg transition-all"
                title={t.approveBtn}
              >
                Approve
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

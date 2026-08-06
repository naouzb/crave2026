import React from 'react';
import { Spot } from '@/types';
import { useChatStore } from '@/store/useChatStore';
import { useSpotStore } from '@/store/useSpotStore';
import { Star, MessageCircle, CheckCircle } from 'lucide-react';

interface SpotCardProps {
  spot: Spot;
  onOpenDetail?: (spot: Spot) => void;
}

export const SpotCard: React.FC<SpotCardProps> = ({ spot, onOpenDetail }) => {
  const { openChatForSpot } = useChatStore();
  const { incrementViews } = useSpotStore();

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

  // Psychological Social Proof Triggers (FOMO)
  const fomoTriggers = [
    `🔥 ${Math.floor(Math.random() * 8) + 12} people looking right now`,
    `⚡ High Demand Today`,
    `🔥 9 tables booked in the last hour`,
    `⚡ 3 dining slots left for tonight`,
  ];
  const currentFomo = fomoTriggers[Math.floor(spot.viewsToday % fomoTriggers.length)];

  return (
    <div
      onClick={handleCardClick}
      className="group relative rounded-3xl bg-card border border-border overflow-hidden flex flex-col justify-between hover:border-primary/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 cursor-pointer"
    >
      {/* Cover Image Container */}
      <div className="relative h-52 bg-surface overflow-hidden">
        <img
          src={spot.coverImage}
          alt={spot.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-black/40 opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-black text-white">
          {spot.category}
        </div>

        {/* Dynamic Social Proof FOMO Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-orange-500/30 text-[10px] font-extrabold text-orange-400 shadow-neon">
          <span>{currentFomo}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> VERIFIED SPOT
            </span>
            <div className="flex items-center gap-1 font-bold text-yellow-400">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>⭐ {spot.rating || 4.8} ({spot.reviewsCount || 215})</span>
            </div>
          </div>

          <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors leading-snug line-clamp-1">
            {spot.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-medium">
            {spot.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-border/60 flex items-center gap-2">
          <button
            onClick={handleChatClick}
            className="w-full py-2.5 rounded-xl bg-surface border border-primary/40 hover:bg-neon-gradient hover:border-transparent text-white text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly with Chef</span>
          </button>
        </div>
      </div>
    </div>
  );
};

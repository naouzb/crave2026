import React, { useState } from 'react';
import { Spot } from '@/types';
import { useSpotStore } from '@/store/useSpotStore';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  X, 
  Star, 
  MapPin, 
  Eye, 
  ChefHat, 
  MessageCircle, 
  Lock, 
  Phone, 
  Tag, 
  Truck, 
  ShoppingBag, 
  Sparkles,
  CheckCircle,
  Edit,
  Trash2,
  ImageIcon,
  UserIcon,
  LogIn
} from 'lucide-react';

interface SpotDetailModalProps {
  spot: Spot | null;
  onClose: () => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({ spot, onClose }) => {
  const { openChatForSpot } = useChatStore();
  const { language, currentUser, openAuthModal } = useAuthStore();
  const { addReview, editReview, deleteReview } = useSpotStore();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  if (!spot) return null;

  const userReview = spot.reviewsList?.find((r) => r.userId === currentUser?.id);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOrderClick = () => {
    triggerToast("🚀 Ordering and Table Reservations are launching very soon! Stay tuned.");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (isEditing || userReview) {
      editReview(spot.id, currentUser.id, rating, reviewText.trim());
      setIsEditing(false);
      triggerToast("✨ Your review has been updated!");
    } else {
      addReview(spot.id, currentUser.id, `${currentUser.firstName} ${currentUser.lastName}`, rating, reviewText.trim());
      triggerToast("🌟 Thank you! Your review has been published.");
    }
    setReviewText('');
  };

  const handleDeleteReview = () => {
    if (!currentUser) return;
    deleteReview(spot.id, currentUser.id);
    setIsEditing(false);
    triggerToast("🗑️ Your review has been deleted.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-neon-gradient text-white text-xs font-black shadow-neon animate-in fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-surface border border-border hover:bg-border text-gray-400 hover:text-white transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Cover Image & Title */}
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
                <span className="text-xs text-gray-300 font-medium">({spot.reviewsCount || 215} reviews)</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">{spot.title}</h2>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-border text-xs font-bold text-gray-300">
              <Eye className="w-4 h-4 text-primary" />
              <span>{spot.viewsToday} views today</span>
            </div>
          </div>
        </div>

        {/* AUTH-GATING LOCK SCREEN (When User is NOT Logged In) */}
        {!currentUser ? (
          <div className="relative rounded-2xl bg-surface border border-border p-8 text-center overflow-hidden shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-neon animate-bounce mx-auto">
              <Lock className="w-7 h-7 text-primary" />
            </div>

            <h3 className="text-xl font-black text-white">Exclusive Spot Information Locked</h3>

            <p className="text-xs text-gray-300 max-w-sm mx-auto font-medium leading-relaxed">
              Please Log In or Register to view phone numbers, prices, and exclusive reviews.
            </p>

            <button
              onClick={() => {
                onClose();
                openAuthModal('signin');
              }}
              className="px-6 py-3 rounded-xl bg-neon-gradient text-white text-xs font-black shadow-neon hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Please Log In or Register</span>
            </button>
          </div>
        ) : (
          /* AUTHENTICATED USER FULL VIEW */
          <div className="space-y-6">
            {/* Delivery Coming Soon Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-950/80 via-red-950/70 to-background border border-orange-500/40 flex items-center justify-between shadow-neon">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-orange-400 animate-pulse" />
                <div>
                  <h4 className="text-xs font-black text-white">🚚 Delivery & Direct Courier: <span className="text-orange-400">Coming Soon</span></h4>
                  <p className="text-[10px] text-gray-400">Live order tracking and express thermal box delivery launching shortly.</p>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-surface border border-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>Phone Number</span>
                </div>
                <p className="text-xs font-black text-white">{spot.phoneNumber || '+998 90 999 88 77'}</p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Price Info</span>
                </div>
                <p className="text-xs font-black text-white">{spot.priceInfo || 'Avg 180,000 UZS'}</p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>Neighborhood</span>
                </div>
                <p className="text-xs font-black text-white">{spot.location || 'Central Downtown'}</p>
              </div>
            </div>

            {/* Features Tags */}
            <div className="p-4 rounded-2xl bg-surface border border-border space-y-2">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Features & Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {(spot.features || ['Free WiFi', 'Halal', 'Parking', 'Woodfire Oven']).map((ft, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-card border border-border text-xs font-bold text-gray-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-primary" />
                    <span>{ft}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onClose();
                  openChatForSpot(spot);
                }}
                className="py-3 rounded-xl bg-surface border border-primary/50 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all hover:bg-surface/80"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span>💬 Chat Directly with Chef ({spot.ownerName || 'Chef'})</span>
              </button>

              <button
                onClick={handleOrderClick}
                className="py-3 rounded-xl bg-neon-gradient text-white text-xs font-black shadow-neon flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>🛒 Order / Book (Coming Soon)</span>
              </button>
            </div>

            {/* Review Section */}
            <div className="p-5 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <span>🌟 Reviews & Ratings</span>
                  <span className="text-xs text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/30">
                    ⭐ {spot.rating || 4.8} / 5
                  </span>
                </h3>
              </div>

              {/* Review Form */}
              {(!userReview || isEditing) && (
                <form onSubmit={handleReviewSubmit} className="p-4 rounded-xl bg-surface border border-border space-y-3">
                  <h4 className="text-xs font-black text-white uppercase">{isEditing ? 'Edit Review' : 'Write a Review'}</h4>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} type="button" onClick={() => setRating(s)} className="p-1 hover:scale-125 transition-transform">
                        <Star className={`w-5 h-5 ${rating >= s ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-yellow-400 ml-2">{rating}/5</span>
                  </div>
                  <textarea
                    required
                    rows={2}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your dining notes..."
                    className="w-full p-3 rounded-xl bg-card border border-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                  <div className="flex justify-end gap-2">
                    {isEditing && <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-xs text-gray-400 font-bold">Cancel</button>}
                    <button type="submit" className="px-4 py-2 rounded-xl bg-neon-gradient text-white text-xs font-extrabold shadow-neon">
                      {isEditing ? 'Save' : 'Publish Review'}
                    </button>
                  </div>
                </form>
              )}

              {/* Highlighted Existing User Review */}
              {userReview && !isEditing && (
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-neon-gradient text-white flex items-center justify-center font-black text-xs">
                        {currentUser.firstName ? currentUser.firstName.charAt(0) : 'U'}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">{currentUser.firstName} {currentUser.lastName} (You)</h4>
                        <div className="text-yellow-400 text-[10px]">{'★'.repeat(userReview.rating)} ({userReview.rating}/5)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setRating(userReview.rating); setReviewText(userReview.text || ''); setIsEditing(true); }} className="px-2.5 py-1 rounded-lg bg-card text-xs text-gray-300 hover:text-white flex items-center gap-1 font-bold">
                        <Edit className="w-3 h-3 text-primary" /> Edit
                      </button>
                      <button onClick={handleDeleteReview} className="px-2.5 py-1 rounded-lg bg-red-500/20 text-xs text-red-400 hover:text-white flex items-center gap-1 font-bold">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-200 font-medium">{userReview.text}</p>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-3">
                {(spot.reviewsList || []).map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-surface border border-border space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-card text-primary flex items-center justify-center font-bold text-[10px]">
                          <UserIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-white">{rev.userName || 'Gourmet Foodie'}</span>
                      </div>
                      <div className="text-yellow-400 text-[10px]">{'★'.repeat(rev.rating)}</div>
                    </div>
                    {rev.text && <p className="text-xs text-gray-300 font-medium">{rev.text}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

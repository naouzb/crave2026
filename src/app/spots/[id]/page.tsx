'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSpotStore } from '@/store/useSpotStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { Header } from '@/components/Header';
import { AuthModal } from '@/components/AuthModal';
import { 
  Star, 
  MapPin, 
  Eye, 
  ChefHat, 
  MessageCircle, 
  Clock, 
  Lock, 
  Phone, 
  Tag, 
  Truck, 
  ShoppingBag, 
  Sparkles,
  CheckCircle,
  Edit,
  Trash2,
  Image as ImageIcon,
  User as UserIcon,
  LogIn
} from 'lucide-react';

export default function SpotDetailPage() {
  const { id } = useParams();
  const spotId = Array.isArray(id) ? id[0] : id;

  const { spots, addReview, editReview, deleteReview } = useSpotStore();
  const { currentUser, openAuthModal } = useAuthStore();
  const { openChatForSpot } = useChatStore();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const spot = spots.find((s) => s.id === spotId) || spots[0];

  const userReview = spot?.reviewsList?.find((r) => r.userId === currentUser?.id);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOrderClick = () => {
    triggerToast("🚀 Ordering and Table Reservations are launching very soon! Stay tuned.");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !spot) return;

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
    if (!currentUser || !spot) return;
    deleteReview(spot.id, currentUser.id);
    setIsEditing(false);
    triggerToast("🗑️ Your review has been deleted.");
  };

  if (!spot) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <p className="text-gray-400">Loading spot details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col justify-between">
      <Header />
      <AuthModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3.5 rounded-2xl bg-neon-gradient text-white text-xs font-black shadow-neon animate-in fade-in slide-in-from-top-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Hero Banner Section */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-surface border border-border shadow-2xl">
          <img src={spot.coverImage} alt={spot.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-black text-white">
              {spot.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 text-yellow-400 text-sm font-black mb-1">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>⭐ {spot.rating || 4.8}</span>
                <span className="text-xs text-gray-300 font-medium">({spot.reviewsCount || 215} reviews)</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">{spot.title}</h1>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-border text-xs font-bold text-gray-300">
              <Eye className="w-4 h-4 text-primary" />
              <span>{spot.viewsToday} views today</span>
            </div>
          </div>
        </div>

        {/* AUTH-GATING LOCK SCREEN (When User is NOT Logged In) */}
        {!currentUser ? (
          <div className="relative rounded-3xl bg-card border border-border p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
            {/* Blurred Backdrop Overlay */}
            <div className="absolute inset-0 bg-[#0f0f11]/85 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-neon animate-bounce">
                <Lock className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white max-w-lg">
                Exclusive Sensory Spot Information
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 max-w-md font-medium leading-relaxed">
                Please Log In or Register to view phone numbers, pricing details, chef tasting menus, and verified gourmet reviews.
              </p>

              <button
                onClick={() => openAuthModal('signin')}
                className="mt-2 px-8 py-3.5 rounded-2xl bg-neon-gradient text-white text-xs font-black uppercase tracking-wider shadow-neon hover:scale-105 transition-all flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Please Log In or Register</span>
              </button>
            </div>

            {/* Dummy blurred content behind lock screen */}
            <div className="blur-sm opacity-30 pointer-events-none space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-surface rounded-2xl"></div>
                <div className="h-20 bg-surface rounded-2xl"></div>
                <div className="h-20 bg-surface rounded-2xl"></div>
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED USER FULL DETAILED VIEW */
          <div className="space-y-8">
            {/* Delivery Coming Soon Glowing Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/80 via-red-950/70 to-background border border-orange-500/40 flex items-center justify-between shadow-neon">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-orange-400 animate-pulse" />
                <div>
                  <h4 className="text-xs font-black text-white">🚚 Delivery & Direct Express Courier: <span className="text-orange-400">Coming Soon</span></h4>
                  <p className="text-[11px] text-gray-400">Live order tracking and express thermal box delivery launching shortly.</p>
                </div>
              </div>
            </div>

            {/* Info Grid Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-surface border border-border space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Direct Reservations</span>
                </div>
                <p className="text-sm font-black text-white">{spot.phoneNumber || '+998 90 999 88 77'}</p>
              </div>

              <div className="p-5 rounded-2xl bg-surface border border-border space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <Tag className="w-4 h-4 text-emerald-400" />
                  <span>Price Range</span>
                </div>
                <p className="text-sm font-black text-white">{spot.priceInfo || 'Avg 180,000 UZS / guest'}</p>
              </div>

              <div className="p-5 rounded-2xl bg-surface border border-border space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>Location</span>
                </div>
                <p className="text-sm font-black text-white">{spot.location || 'Central Promenade'}</p>
              </div>
            </div>

            {/* Features Tags */}
            <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Spot Features & Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {(spot.features || ['Free WiFi', 'Halal', 'Parking', 'Woodfire Oven']).map((ft, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-bold text-gray-200 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    <span>{ft}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons Area: Side-by-side Chat & Order/Book Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => openChatForSpot(spot)}
                className="py-4 rounded-2xl bg-surface border border-primary/50 hover:bg-surface/80 text-white text-xs font-extrabold shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span>💬 Chat Directly with Owner ({spot.ownerName || 'Chef'})</span>
              </button>

              <button
                onClick={handleOrderClick}
                className="py-4 rounded-2xl bg-neon-gradient text-white text-xs font-black shadow-neon hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>🛒 Order / Book (Coming Soon)</span>
              </button>
            </div>

            {/* Interactive Review Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>🌟 Gourmet Reviews & Ratings</span>
                  <span className="text-xs text-yellow-400 font-bold bg-yellow-400/10 px-2.5 py-0.5 rounded border border-yellow-400/30">
                    ⭐ {spot.rating || 4.8} / 5
                  </span>
                </h3>
              </div>

              {/* User Review Form (Shown if NO review exists OR user is editing) */}
              {(!userReview || isEditing) && (
                <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-surface border border-border space-y-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    {isEditing ? 'Edit Your Review' : 'Write a Review'}
                  </h4>

                  {/* Interactive Star Rating */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-yellow-400 hover:scale-125 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-yellow-400 ml-2">{rating}/5 Stars</span>
                  </div>

                  {/* Textarea */}
                  <textarea
                    required
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your culinary experience, flavor notes, or atmosphere rating..."
                    className="w-full p-3.5 rounded-xl bg-card border border-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-primary"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => triggerToast("📷 Photo upload feature launching with CDN integration.")}
                      className="px-3.5 py-2 rounded-xl bg-card border border-border text-gray-400 hover:text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Upload Photos</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 rounded-xl bg-surface text-gray-400 text-xs font-bold"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-neon-gradient text-white text-xs font-extrabold shadow-neon"
                      >
                        {isEditing ? 'Save Changes' : 'Submit Review'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* User's Existing Review Highlighted */}
              {userReview && !isEditing && (
                <div className="p-5 rounded-2xl bg-primary/10 border border-primary/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-neon-gradient text-white flex items-center justify-center font-black text-xs">
                        {currentUser.firstName ? currentUser.firstName.charAt(0) : 'U'}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">{currentUser.firstName} {currentUser.lastName} (You)</h4>
                        <div className="flex items-center gap-1 text-yellow-400 text-[10px] font-bold">
                          {'★'.repeat(userReview.rating)} ({userReview.rating}/5)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setRating(userReview.rating);
                          setReviewText(userReview.text || '');
                          setIsEditing(true);
                        }}
                        className="p-2 rounded-xl bg-card border border-border text-gray-300 hover:text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5 text-primary" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={handleDeleteReview}
                        className="p-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-200 leading-relaxed font-medium">{userReview.text}</p>
                </div>
              )}

              {/* List of All Reviews */}
              <div className="space-y-4">
                {(spot.reviewsList || []).map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-surface border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-card border border-border text-gray-300 flex items-center justify-center font-bold text-xs">
                          <UserIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{rev.userName || 'Gourmet Foodie'}</h5>
                          <div className="flex items-center text-yellow-400 text-[10px]">
                            {'★'.repeat(rev.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {rev.text && <p className="text-xs text-gray-300 font-medium leading-relaxed">{rev.text}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-6 px-4 text-center text-xs text-gray-500 font-medium">
        CRAVE2026 — Production Ready Spot Detail Engine.
      </footer>
    </div>
  );
}

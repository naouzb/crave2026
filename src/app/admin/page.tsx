'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useSpotStore } from '@/store/useSpotStore';
import { Header } from '@/components/Header';
import { AuthModal } from '@/components/AuthModal';
import { 
  ShieldCheck, 
  Users, 
  Compass, 
  Star, 
  Eye, 
  BarChart3, 
  PlusCircle, 
  Trash2, 
  Sparkles,
  AlertTriangle,
  ArrowLeft,
  LayoutDashboard,
  MessageSquare,
  BadgeCheck,
  Flame,
  Tag,
  MapPin,
  Phone
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { currentUser, role } = useAuthStore();
  const { spots, addSpot, approveSpot, rejectSpot, deleteSpot, updateSpot } = useSpotStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'spots' | 'addSpot' | 'reviews'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state for Add Spot
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Omakase & Sushi');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80');
  const [priceInfo, setPriceInfo] = useState('Avg 180,000 UZS');
  const [location, setLocation] = useState('Ginza Promenade / Downtown');
  const [phoneNumber, setPhoneNumber] = useState('+998 90 999 88 77');
  const [calories, setCalories] = useState('850 kcal');
  const [address, setAddress] = useState('4-Chome Ginza District, Tokyo Promenade');
  const [mapEmbedUrl, setMapEmbedUrl] = useState('https://maps.google.com/maps?q=Ginza,Tokyo&t=&z=13&ie=UTF8&iwloc=&output=embed');

  // Managed Users list
  const [usersList, setUsersList] = useState([
    { id: 'usr_admin', name: 'Super Admin', email: 'naouzb11@gmail.com', role: 'ADMIN' },
    { id: 'usr_1', name: 'Chef Kenji Takahashi', email: 'kenji@omakase.io', role: 'BUSINESS' },
    { id: 'usr_2', name: 'Alex Mercer', email: 'alex@foodie.com', role: 'CLIENT' },
    { id: 'usr_3', name: 'Marco Rossi', email: 'marco@woodfire.io', role: 'BUSINESS' },
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addSpot({
      ownerId: currentUser?.id || 'usr_admin',
      ownerName: currentUser?.name || 'Super Admin',
      title: title.trim(),
      category,
      description: description.trim(),
      coverImage,
      priceInfo,
      location,
      phoneNumber,
      calories,
      address,
      mapEmbedUrl,
      features: ['Halal Options', 'Free WiFi', 'Valet Parking', 'Chef Counter'],
      viewsToday: 120,
      fomoText: '🔥 Newly Added Spot',
      isFeatured: true,
      status: 'APPROVED',
      rating: 5.0,
      reviewsCount: 1,
    });

    // Reset Form
    setTitle('');
    setDescription('');
    triggerToast("✨ New Restaurant Spot published directly to live feed!");
    setActiveTab('spots');
  };

  const handleRoleToggle = (userId: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const nextRole = u.role === 'CLIENT' ? 'BUSINESS' : u.role === 'BUSINESS' ? 'ADMIN' : 'CLIENT';
        return { ...u, role: nextRole };
      })
    );
    triggerToast("✨ User role updated successfully!");
  };

  const handleDeleteUser = (userId: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== userId));
    triggerToast("🗑️ User account deleted.");
  };

  const allReviews = spots.flatMap((s) => (s.reviewsList || []).map((r) => ({ ...r, spotTitle: s.title })));
  const totalViews = spots.reduce((acc, s) => acc + s.viewsToday, 0);

  // GOD-MODE LOCK
  const isGodAdmin = currentUser?.email === 'naouzb11@gmail.com' || currentUser?.role === 'ADMIN' || role === 'ADMIN';

  if (!isGodAdmin) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col justify-between">
        <Header />
        <AuthModal />
        <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6 flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shadow-neon animate-bounce">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-3xl font-black text-white">403 — God-Mode Restricted</h2>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            This Control Center is strictly locked for God-Mode Administrator (`naouzb11@gmail.com`).
          </p>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-surface border border-border hover:border-primary text-xs font-bold text-white inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col justify-between selection:bg-primary selection:text-white">
      <Header />
      <AuthModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3.5 rounded-2xl bg-neon-gradient text-white text-xs font-black shadow-neon animate-in fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-xs font-black text-purple-400 uppercase mb-2 shadow-neon">
              <ShieldCheck className="w-4 h-4" />
              <span>God-Mode Admin Panel (naouzb11@gmail.com)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">CRAVE2026 Control Center</h1>
          </div>

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-surface border border-border hover:border-primary text-xs font-bold text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Feed</span>
          </Link>
        </div>

        {/* Sidebar & Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-4 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${activeTab === 'overview' ? 'bg-neon-gradient text-white shadow-neon' : 'bg-card border border-border text-gray-400 hover:text-white'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('addSpot')}
              className={`w-full p-4 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${activeTab === 'addSpot' ? 'bg-neon-gradient text-white shadow-neon' : 'bg-card border border-border text-gray-400 hover:text-white'}`}
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>+ Create New Spot</span>
            </button>

            <button
              onClick={() => setActiveTab('spots')}
              className={`w-full p-4 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${activeTab === 'spots' ? 'bg-neon-gradient text-white shadow-neon' : 'bg-card border border-border text-gray-400 hover:text-white'}`}
            >
              <Compass className="w-4 h-4" />
              <span>Manage Spots ({spots.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full p-4 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${activeTab === 'users' ? 'bg-neon-gradient text-white shadow-neon' : 'bg-card border border-border text-gray-400 hover:text-white'}`}
            >
              <Users className="w-4 h-4" />
              <span>Manage Users ({usersList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full p-4 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${activeTab === 'reviews' ? 'bg-neon-gradient text-white shadow-neon' : 'bg-card border border-border text-gray-400 hover:text-white'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Review Moderation ({allReviews.length})</span>
            </button>
          </div>

          {/* Main Dashboard Panel Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* TAB 1: OVERVIEW ANALYTICS */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
                    <span className="text-gray-400 text-xs font-bold">Total Users</span>
                    <p className="text-3xl font-black text-white">{usersList.length}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
                    <span className="text-gray-400 text-xs font-bold">Active Spots</span>
                    <p className="text-3xl font-black text-white">{spots.length}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
                    <span className="text-gray-400 text-xs font-bold">Gourmet Reviews</span>
                    <p className="text-3xl font-black text-white">{allReviews.length + 954}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
                    <span className="text-gray-400 text-xs font-bold">Views Today</span>
                    <p className="text-3xl font-black text-white">{totalViews.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CREATE NEW SPOT FORM */}
            {activeTab === 'addSpot' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 animate-in fade-in shadow-2xl">
                <div className="flex items-center gap-3">
                  <PlusCircle className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-xl font-black text-white">Create New Spot (Admin Direct Publish)</h2>
                </div>

                <form onSubmit={handleCreateSpot} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Spot Title *</label>
                      <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Le Cirque Wagyu Grill" className="w-full p-3 rounded-xl bg-surface border border-border text-white text-xs" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 rounded-xl bg-surface border border-border text-white text-xs font-bold">
                        <option value="Omakase & Sushi">Omakase & Sushi</option>
                        <option value="Neapolitan Pizza">Neapolitan Pizza</option>
                        <option value="Dry-Aged Steak">Dry-Aged Steak</option>
                        <option value="Craft Ramen">Craft Ramen</option>
                        <option value="Artisanal Pastry">Artisanal Pastry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Description *</label>
                    <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Sensory dining details..." className="w-full p-3 rounded-xl bg-surface border border-border text-white text-xs" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Cover Image URL</label>
                      <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full p-3 rounded-xl bg-surface border border-border text-white text-xs" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Price Info</label>
                      <input type="text" value={priceInfo} onChange={(e) => setPriceInfo(e.target.value)} placeholder="e.g., Avg 180,000 UZS" className="w-full p-3 rounded-xl bg-surface border border-border text-white text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Location / Neighborhood</label>
                      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Ginza Promenade" className="w-full p-3 rounded-xl bg-surface border border-border text-white text-xs" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Phone Number</label>
                      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+998 90 999 88 77" className="w-full p-3 rounded-xl bg-surface border border-border text-white text-xs" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Calories</label>
                      <input type="text" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="e.g., 850 kcal" className="w-full p-3 rounded-xl bg-surface border border-border text-white text-xs" />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-3.5 rounded-2xl bg-neon-gradient text-white font-black text-xs uppercase shadow-neon hover:scale-[1.02] transition-all">
                    ✨ Publish Spot Directly to Feed
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: SPOTS MANAGEMENT */}
            {activeTab === 'spots' && (
              <div className="p-6 rounded-3xl bg-card border border-border space-y-4 animate-in fade-in">
                <h3 className="text-lg font-black text-white">Manage & Moderate Spots ({spots.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-surface text-gray-400 font-extrabold uppercase border-b border-border">
                      <tr>
                        <th className="p-3">Title</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Calories</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {spots.map((spot) => (
                        <tr key={spot.id} className="hover:bg-surface/50 transition-colors">
                          <td className="p-3 font-bold text-white">{spot.title}</td>
                          <td className="p-3 text-gray-300">{spot.category}</td>
                          <td className="p-3 text-orange-400 font-bold">{spot.calories || '850 kcal'}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {spot.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => { deleteSpot(spot.id); triggerToast(`🗑️ "${spot.title}" deleted.`); }} className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: USERS MANAGEMENT */}
            {activeTab === 'users' && (
              <div className="p-6 rounded-3xl bg-card border border-border space-y-4 animate-in fade-in">
                <h3 className="text-lg font-black text-white">User Accounts Control ({usersList.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-surface text-gray-400 font-extrabold uppercase border-b border-border">
                      <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Role</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {usersList.map((u) => (
                        <tr key={u.id} className="hover:bg-surface/50 transition-colors">
                          <td className="p-3 font-mono text-[11px] text-gray-400">{u.id}</td>
                          <td className="p-3 font-bold text-white">{u.name}</td>
                          <td className="p-3 text-gray-300">{u.email}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => handleRoleToggle(u.id)} className="px-3 py-1 rounded-lg bg-surface border border-border hover:border-primary text-xs font-bold text-white">Switch Role</button>
                            {u.email !== 'naouzb11@gmail.com' && (
                              <button onClick={() => handleDeleteUser(u.id)} className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:text-white text-xs font-bold">Delete</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 px-4 text-center text-xs text-gray-500 font-medium">
        CRAVE2026 — God-Mode Admin Control Center.
      </footer>
    </div>
  );
}

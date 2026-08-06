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
  CheckCircle, 
  XCircle, 
  Trash2, 
  Sparkles,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { currentUser, role } = useAuthStore();
  const { spots, approveSpot, rejectSpot, deleteSpot } = useSpotStore();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock managed users state for Admin Dashboard
  const [usersList, setUsersList] = useState([
    { id: 'usr_1', name: 'Chef Kenji Takahashi', email: 'kenji@omakase.io', role: 'BUSINESS' },
    { id: 'usr_2', name: 'Alex Mercer', email: 'alex@foodie.com', role: 'CLIENT' },
    { id: 'usr_3', name: 'Marco Rossi', email: 'marco@woodfire.io', role: 'BUSINESS' },
    { id: 'usr_4', name: 'Super Admin', email: 'admin@crave2026.io', role: 'ADMIN' },
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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

  // Protected route check
  const isAdmin = currentUser?.role === 'ADMIN' || role === 'ADMIN';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col justify-between">
        <Header />
        <AuthModal />
        <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6 flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shadow-neon">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-3xl font-black text-white">403 — Access Restricted</h2>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            This page is reserved strictly for CRAVE2026 System Administrators (`role === 'ADMIN'`).
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
    <div className="min-h-screen bg-background text-white flex flex-col justify-between">
      <Header />
      <AuthModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3.5 rounded-2xl bg-neon-gradient text-white text-xs font-black shadow-neon animate-in fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        {/* Admin Header Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/40 text-xs font-black text-primary uppercase mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Super Admin Management Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">CRAVE2026 Admin Control Panel</h1>
          </div>

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-surface border border-border hover:border-primary text-xs font-bold text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Feed</span>
          </Link>
        </div>

        {/* Section 1: Manage Users Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-black text-white">1. Manage User Accounts ({usersList.length})</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-surface text-gray-400 font-extrabold uppercase border-b border-border">
                <tr>
                  <th className="p-3.5">User ID</th>
                  <th className="p-3.5">Full Name</th>
                  <th className="p-3.5">Email Address</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] text-gray-400">{u.id}</td>
                    <td className="p-3.5 font-bold text-white">{u.name}</td>
                    <td className="p-3.5 text-gray-300">{u.email}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${u.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : u.role === 'BUSINESS' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleRoleToggle(u.id)}
                        className="px-3 py-1.5 rounded-lg bg-surface border border-border hover:border-primary text-xs font-bold text-white"
                      >
                        Switch Role
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:text-white text-xs font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Manage Spots Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-black text-white">2. Moderation & Spot Approvals ({spots.length})</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-surface text-gray-400 font-extrabold uppercase border-b border-border">
                <tr>
                  <th className="p-3.5">Spot Title</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Owner</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {spots.map((spot) => (
                  <tr key={spot.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-3.5 font-bold text-white">{spot.title}</td>
                    <td className="p-3.5 text-gray-300">{spot.category}</td>
                    <td className="p-3.5 text-gray-400">{spot.ownerName || 'Chef'}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${spot.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : spot.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                        {spot.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {spot.status !== 'APPROVED' && (
                        <button
                          onClick={() => {
                            approveSpot(spot.id);
                            triggerToast(`✓ "${spot.title}" approved!`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:text-white text-xs font-bold inline-flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                      )}
                      {spot.status !== 'REJECTED' && (
                        <button
                          onClick={() => {
                            rejectSpot(spot.id);
                            triggerToast(`✕ "${spot.title}" rejected.`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 hover:text-white text-xs font-bold inline-flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      )}
                      <button
                        onClick={() => {
                          deleteSpot(spot.id);
                          triggerToast(`🗑️ "${spot.title}" deleted.`);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:text-white text-xs font-bold inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 px-4 text-center text-xs text-gray-500 font-medium">
        CRAVE2026 — Administrator Control Engine.
      </footer>
    </div>
  );
}

import { create } from 'zustand';
import { User, Language, Role } from '@/types';

interface AuthState {
  currentUser: User | null;
  role: Role;
  language: Language;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  setLanguage: (lang: Language) => void;
  setRole: (role: Role) => void;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: {
    id: 'usr_admin',
    firstName: 'Super',
    lastName: 'Admin',
    name: 'Super Admin',
    email: 'naouzb11@gmail.com',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
  },
  role: 'ADMIN',
  language: 'EN',
  isAuthModalOpen: false,
  authModalMode: 'signin',

  setLanguage: (lang: Language) => set({ language: lang }),
  setRole: (role: Role) => set({ role }),
  openAuthModal: (mode = 'signin') => set({ isAuthModalOpen: true, authModalMode: mode }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  login: (user: User) => set({ currentUser: user, role: user.role, isAuthModalOpen: false }),
  logout: () => set({ currentUser: null, role: 'CLIENT', isAuthModalOpen: false }),
}));

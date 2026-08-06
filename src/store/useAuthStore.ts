import { create } from 'zustand';
import { Role, Language, User } from '@/types';

interface AuthState {
  currentUser: User | null;
  usersList: User[];
  role: Role;
  language: Language;
  isAuthModalOpen: boolean;
  setRole: (role: Role) => void;
  setLanguage: (lang: Language) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  registerUser: (name: string, email: string, role: Role) => User;
  loginAs: (user: User) => void;
  logout: () => void;
}

const INITIAL_USERS: User[] = [
  {
    id: 'usr_1',
    name: 'Chef Kenji Takahashi',
    email: 'kenji@omakase.io',
    role: 'BUSINESS',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr_2',
    name: 'Alex Mercer (Foodie)',
    email: 'alex@foodie.com',
    role: 'CLIENT',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr_3',
    name: 'Super Admin',
    email: 'admin@crave2026.io',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: INITIAL_USERS[0],
  usersList: INITIAL_USERS,
  role: 'BUSINESS',
  language: 'EN',
  isAuthModalOpen: false,

  setRole: (role: Role) => set((state) => ({
    role,
    currentUser: state.currentUser ? { ...state.currentUser, role } : null
  })),

  setLanguage: (language: Language) => set({ language }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  registerUser: (name: string, email: string, role: Role) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      usersList: [newUser, ...state.usersList],
      currentUser: newUser,
      role: newUser.role,
      isAuthModalOpen: false,
    }));

    return newUser;
  },

  loginAs: (user: User) => set({
    currentUser: user,
    role: user.role,
    isAuthModalOpen: false,
  }),

  logout: () => set({
    currentUser: null,
    role: 'CLIENT',
  }),
}));

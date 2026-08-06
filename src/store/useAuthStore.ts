import { create } from 'zustand';
import { Role, Language, User } from '@/types';

interface AuthState {
  currentUser: User | null;
  usersList: User[];
  language: Language;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  setLanguage: (lang: Language) => void;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  signUpUser: (firstName: string, lastName: string, email: string, role?: Role) => User;
  signInUser: (email: string) => boolean;
  logout: () => void;
}

const INITIAL_USERS: User[] = [
  {
    id: 'usr_1',
    firstName: 'Kenji',
    lastName: 'Takahashi',
    name: 'Kenji Takahashi',
    email: 'kenji@omakase.io',
    role: 'BUSINESS',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr_2',
    firstName: 'Alex',
    lastName: 'Mercer',
    name: 'Alex Mercer',
    email: 'alex@foodie.com',
    role: 'CLIENT',
    createdAt: new Date().toISOString(),
  }
];

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: INITIAL_USERS[1], // Default logged-in as Alex Mercer (Client)
  usersList: INITIAL_USERS,
  language: 'EN',
  isAuthModalOpen: false,
  authModalMode: 'signin',

  setLanguage: (language: Language) => set({ language }),

  openAuthModal: (mode = 'signin') => set({
    isAuthModalOpen: true,
    authModalMode: mode,
  }),

  closeAuthModal: () => set({ isAuthModalOpen: false }),

  signUpUser: (firstName: string, lastName: string, email: string, role: Role = 'CLIENT') => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      usersList: [newUser, ...state.usersList],
      currentUser: newUser,
      isAuthModalOpen: false,
    }));

    return newUser;
  },

  signInUser: (email: string) => {
    const users = get().usersList;
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      set({ currentUser: existing, isAuthModalOpen: false });
      return true;
    }

    // Auto-create user for smooth demo experience
    const nameParts = email.split('@')[0].split('.');
    const firstName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'Gourmet';
    const lastName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 'User';

    const newUser: User = {
      id: `usr_${Date.now()}`,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      role: 'CLIENT',
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      usersList: [newUser, ...state.usersList],
      currentUser: newUser,
      isAuthModalOpen: false,
    }));

    return true;
  },

  logout: () => set({
    currentUser: null,
  }),
}));

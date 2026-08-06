import { create } from 'zustand';
import { Spot, SpotStatus } from '@/types';

interface SpotState {
  spots: Spot[];
  searchQuery: string;
  selectedCategory: string;
  isAddSpotModalOpen: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  openAddSpotModal: () => void;
  closeAddSpotModal: () => void;
  addSpot: (spot: Omit<Spot, 'id' | 'createdAt' | 'viewsToday' | 'status'>) => void;
  approveSpot: (spotId: string) => void;
  incrementViews: (spotId: string) => void;
}

const INITIAL_SPOTS: Spot[] = [
  {
    id: 'spot_1',
    ownerId: 'usr_business_1',
    ownerName: 'Chef Kenji',
    title: 'Miyabi Omakase & Edomae Sushi',
    category: 'Omakase & Sushi',
    description: 'Ultra-exclusive 12-seat Japanese omakase experience featuring wild-caught bluefin tuna imported daily from Toyosu Market, Tokyo.',
    coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    viewsToday: 1420,
    isFeatured: true,
    status: 'APPROVED',
    rating: 4.9,
    reviewsCount: 328,
    location: 'Ginza District / Downtown',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'spot_2',
    ownerId: 'usr_business_2',
    ownerName: 'Marco Rossi',
    title: 'Fornace 800° Neapolitan Woodfire',
    category: 'Neapolitan Pizza',
    description: 'Double-fermented sourdough pizza baked in custom Vesuvian volcanic stone oven at 900°F with San Marzano DOP tomatoes and Bufala Mozzarella.',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    viewsToday: 980,
    isFeatured: true,
    status: 'APPROVED',
    rating: 4.8,
    reviewsCount: 215,
    location: 'Little Italy Quarter',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'spot_3',
    ownerId: 'usr_business_3',
    ownerName: 'Antoine Laurent',
    title: 'L\'Ombre Dry-Aged Steakhouse',
    category: 'Dry-Aged Steak',
    description: '45-day Himalayan salt room dry-aged Wagyu Tomahawk steaks paired with rare Bordeaux vintage reserves and smoked bone marrow.',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    viewsToday: 1150,
    isFeatured: true,
    status: 'APPROVED',
    rating: 4.95,
    reviewsCount: 410,
    location: 'Upper West Promenade',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'spot_4',
    ownerId: 'usr_business_4',
    ownerName: 'Chef Hiroshi',
    title: 'Kuro Artisan Tonkotsu Ramen Lab',
    category: 'Craft Ramen',
    description: 'Simmered 24-hour pork bone collagen broth with hand-pulled black garlic rye noodles and charred slow-braised chashu belly.',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    viewsToday: 840,
    isFeatured: false,
    status: 'APPROVED',
    rating: 4.7,
    reviewsCount: 189,
    location: 'East Financial Center',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'spot_5',
    ownerId: 'usr_business_5',
    ownerName: 'Elena Rostova',
    title: 'Velvet Noir Pastry & Caviar Lounge',
    category: 'Artisanal Pastry',
    description: 'Hyper-sensory French patisserie with gold-leaf choux, Valrhona dark chocolate tartes, and premium Oscietra caviar champagne pairings.',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    viewsToday: 620,
    isFeatured: false,
    status: 'PENDING',
    rating: 4.6,
    reviewsCount: 94,
    location: 'Grand Plaza Tower',
    createdAt: new Date().toISOString(),
  }
];

export const useSpotStore = create<SpotState>((set) => ({
  spots: INITIAL_SPOTS,
  searchQuery: '',
  selectedCategory: 'All',
  isAddSpotModalOpen: false,

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedCategory: (category: string) => set({ selectedCategory: category }),
  openAddSpotModal: () => set({ isAddSpotModalOpen: true }),
  closeAddSpotModal: () => set({ isAddSpotModalOpen: false }),

  addSpot: (spotData) => set((state) => {
    const newSpot: Spot = {
      ...spotData,
      id: `spot_${Date.now()}`,
      createdAt: new Date().toISOString(),
      viewsToday: 1,
      isFeatured: false,
      status: 'PENDING',
      rating: 5.0,
      reviewsCount: 1,
    };
    return {
      spots: [newSpot, ...state.spots],
      isAddSpotModalOpen: false,
    };
  }),

  approveSpot: (spotId: string) => set((state) => ({
    spots: state.spots.map((spot) =>
      spot.id === spotId ? { ...spot, status: 'APPROVED' } : spot
    ),
  })),

  incrementViews: (spotId: string) => set((state) => ({
    spots: state.spots.map((spot) =>
      spot.id === spotId ? { ...spot, viewsToday: spot.viewsToday + 1 } : spot
    ),
  })),
}));

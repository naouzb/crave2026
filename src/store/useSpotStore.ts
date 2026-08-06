import { create } from 'zustand';
import { Spot, Review } from '@/types';

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
  addReview: (spotId: string, userId: string, userName: string, rating: number, text: string, photos?: string[]) => void;
  editReview: (spotId: string, userId: string, rating: number, text: string, photos?: string[]) => void;
  deleteReview: (spotId: string, userId: string) => void;
}

const INITIAL_SPOTS: Spot[] = [
  {
    id: 'spot_1',
    ownerId: 'usr_1',
    ownerName: 'Chef Kenji Takahashi',
    title: 'Miyabi Omakase & Edomae Sushi',
    category: 'Omakase & Sushi',
    description: 'Ultra-exclusive 12-seat Japanese omakase experience featuring wild-caught bluefin tuna imported daily from Toyosu Market, Tokyo.',
    coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    phoneNumber: '+998 90 999 88 77',
    priceInfo: 'Avg $120 / guest',
    features: ['Halal Options', 'Free Parking', 'Chef Counter', 'Private Dining Room'],
    viewsToday: 1420,
    isFeatured: true,
    status: 'APPROVED',
    rating: 4.9,
    reviewsCount: 328,
    reviewsList: [
      {
        id: 'rev_1',
        userId: 'usr_2',
        userName: 'Alex Mercer',
        spotId: 'spot_1',
        rating: 5,
        text: 'The Toyosu Bluefin Toro was melt-in-your-mouth perfection! Chef Kenji personally explained the 7-day aging process for each sushi piece.',
        photos: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'],
        createdAt: new Date().toISOString(),
      }
    ],
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
    phoneNumber: '+998 97 123 45 67',
    priceInfo: 'Avg 150,000 UZS / pizza',
    features: ['Woodfire Oven', 'Free WiFi', 'Outdoor Terrace', 'Pet Friendly'],
    viewsToday: 980,
    isFeatured: true,
    status: 'APPROVED',
    rating: 4.8,
    reviewsCount: 215,
    reviewsList: [],
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
    phoneNumber: '+998 93 555 44 33',
    priceInfo: 'Avg 450,000 UZS / guest',
    features: ['Himalayan Salt Dry-Age Room', 'Wine Cellar', 'Valet Parking', 'Live Jazz'],
    viewsToday: 1150,
    isFeatured: true,
    status: 'APPROVED',
    rating: 4.95,
    reviewsCount: 410,
    reviewsList: [],
    location: 'Upper West Promenade',
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
      reviewsList: [],
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

  addReview: (spotId: string, userId: string, userName: string, rating: number, text: string, photos: string[] = []) => set((state) => ({
    spots: state.spots.map((spot) => {
      if (spot.id !== spotId) return spot;

      const existing = spot.reviewsList || [];
      const filtered = existing.filter((r) => r.userId !== userId);
      const newReview: Review = {
        id: `rev_${Date.now()}`,
        userId,
        userName,
        spotId,
        rating,
        text,
        photos,
        createdAt: new Date().toISOString(),
      };

      const updated = [newReview, ...filtered];
      const avg = Number((updated.reduce((acc, r) => acc + r.rating, 0) / updated.length).toFixed(1));

      return {
        ...spot,
        reviewsList: updated,
        rating: avg,
        reviewsCount: (spot.reviewsCount || 100) + 1,
      };
    }),
  })),

  editReview: (spotId: string, userId: string, rating: number, text: string, photos: string[] = []) => set((state) => ({
    spots: state.spots.map((spot) => {
      if (spot.id !== spotId) return spot;

      const existing = spot.reviewsList || [];
      const updated = existing.map((r) => {
        if (r.userId === userId) {
          return { ...r, rating, text, photos, createdAt: new Date().toISOString() };
        }
        return r;
      });

      const avg = Number((updated.reduce((acc, r) => acc + r.rating, 0) / updated.length).toFixed(1));

      return {
        ...spot,
        reviewsList: updated,
        rating: avg,
      };
    }),
  })),

  deleteReview: (spotId: string, userId: string) => set((state) => ({
    spots: state.spots.map((spot) => {
      if (spot.id !== spotId) return spot;

      const existing = spot.reviewsList || [];
      const updated = existing.filter((r) => r.userId !== userId);
      const avg = updated.length > 0 ? Number((updated.reduce((acc, r) => acc + r.rating, 0) / updated.length).toFixed(1)) : 4.8;

      return {
        ...spot,
        reviewsList: updated,
        rating: avg,
        reviewsCount: Math.max(0, (spot.reviewsCount || 1) - 1),
      };
    }),
  })),
}));

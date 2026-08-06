export type Role = 'CLIENT' | 'BUSINESS' | 'ADMIN';
export type SpotStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type Language = 'EN' | 'UZ' | 'RU' | 'JP';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name?: string; // computed full name
  email: string;
  image?: string;
  role: Role;
  createdAt: string;
}

export interface Rating {
  id: string;
  userId: string;
  spotId: string;
  rating: number; // 1 to 5
  createdAt: string;
}

export interface Spot {
  id: string;
  ownerId: string;
  ownerName?: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  viewsToday: number;
  isFeatured: boolean;
  status: SpotStatus;
  createdAt: string;
  rating?: number; // average rating
  reviewsCount?: number; // total ratings count
  ratingsList?: Rating[];
  location?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  spotId?: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

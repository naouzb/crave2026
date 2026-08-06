export type Role = 'CLIENT' | 'BUSINESS' | 'ADMIN';
export type SpotStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type Language = 'EN' | 'UZ' | 'RU' | 'JP';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  image?: string;
  role: Role;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  spotId: string;
  rating: number; // 1 to 5
  text?: string;
  photos?: string[];
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
  phoneNumber?: string;
  priceInfo?: string;
  features?: string[];
  address?: string;
  mapEmbedUrl?: string;
  viewsToday: number;
  isFeatured: boolean;
  status: SpotStatus;
  createdAt: string;
  rating?: number;
  reviewsCount?: number;
  reviewsList?: Review[];
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

export type Role = 'CLIENT' | 'BUSINESS' | 'ADMIN';
export type SpotStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type Language = 'EN' | 'UZ' | 'RU' | 'JP';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  role: Role;
  createdAt?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName?: string;
  spotId?: string;
  rating: number;
  text?: string;
  photos?: string[];
  createdAt?: string;
}

export interface Spot {
  id: string;
  ownerId?: string;
  ownerName?: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  phoneNumber?: string;
  priceInfo?: string;
  calories?: string;
  features?: string[];
  address?: string;
  mapEmbedUrl?: string;
  viewsToday: number;
  fomoText?: string;
  isFeatured?: boolean;
  status: SpotStatus;
  rating?: number;
  reviewsCount?: number;
  reviewsList?: Review[];
  location?: string;
  createdAt?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName?: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  time?: string;
  isMe?: boolean;
}

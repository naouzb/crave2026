export type Role = 'CLIENT' | 'BUSINESS' | 'ADMIN';
export type SpotStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type Language = 'EN' | 'UZ' | 'RU' | 'JP';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: Role;
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
  rating?: number;
  reviewsCount?: number;
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

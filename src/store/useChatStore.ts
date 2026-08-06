import { create } from 'zustand';
import { Message, Spot } from '@/types';

interface ChatState {
  messages: Message[];
  activeSpot: Spot | null;
  isChatOpen: boolean;
  unreadCount: number;
  openChatForSpot: (spot: Spot) => void;
  closeChat: () => void;
  sendMessage: (senderId: string, senderName: string, receiverId: string, content: string) => void;
  markMessagesAsRead: () => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    senderId: 'usr_client_1',
    senderName: 'Alex Mercer',
    receiverId: 'usr_business_1',
    spotId: 'spot_1',
    content: 'Good evening! Do you have Omakase seating availability for 2 guests tonight at 8 PM?',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'msg_2',
    senderId: 'usr_business_1',
    senderName: 'Chef Kenji',
    receiverId: 'usr_client_1',
    spotId: 'spot_1',
    content: 'Hello Alex! We have a counter spot opening at 8:15 PM with our wild Bluefin Tuna tasting menu.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  }
];

export const useChatStore = create<ChatState>((set, get) => ({
  messages: INITIAL_MESSAGES,
  activeSpot: null,
  isChatOpen: false,
  unreadCount: 1,

  openChatForSpot: (spot: Spot) => set({
    activeSpot: spot,
    isChatOpen: true,
    unreadCount: 0,
  }),

  closeChat: () => set({ isChatOpen: false }),

  sendMessage: (senderId, senderName, receiverId, content) => {
    const activeSpot = get().activeSpot;
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId,
      senderName,
      receiverId,
      spotId: activeSpot?.id,
      content,
      isRead: true,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));

    // Simulate owner instant reply for demo interactive feel
    setTimeout(() => {
      const replyMessage: Message = {
        id: `msg_reply_${Date.now()}`,
        senderId: receiverId,
        senderName: activeSpot?.ownerName || 'Restaurant Host',
        receiverId: senderId,
        spotId: activeSpot?.id,
        content: `Thank you for reaching out to ${activeSpot?.title || 'us'}! Your message has been received and our chef team is preparing your table notes.`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      set((state) => ({
        messages: [...state.messages, replyMessage],
        unreadCount: state.isChatOpen ? 0 : state.unreadCount + 1,
      }));
    }, 1500);
  },

  markMessagesAsRead: () => set({ unreadCount: 0 }),
}));

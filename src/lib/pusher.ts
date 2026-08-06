import PusherClient from 'pusher-js';

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY || 'mock-pusher-key',
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1',
  }
);

export function getChatChannelName(userId: string) {
  return `private-chat-${userId}`;
}

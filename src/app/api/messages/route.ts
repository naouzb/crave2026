import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const mockMessages = [
    {
      id: 'msg_1',
      senderId: 'usr_client_1',
      senderName: 'Alex Mercer',
      receiverId: 'usr_business_1',
      spotId: 'spot_1',
      content: 'Good evening! Do you have Omakase seating availability for 2 guests tonight at 8 PM?',
      isRead: true,
      createdAt: new Date().toISOString(),
    }
  ];

  return NextResponse.json({ success: true, messages: mockMessages });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newMessage = {
      id: `msg_${Date.now()}`,
      ...body,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid message payload' }, { status: 400 });
  }
}

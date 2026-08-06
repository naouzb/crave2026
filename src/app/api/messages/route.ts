import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      take: 50,
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, firstName: true, lastName: true } },
        receiver: { select: { id: true, firstName: true, lastName: true } },
      },
    });

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    console.error('API GET /api/messages error:', error?.message);
    return NextResponse.json({ success: false, messages: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderId, receiverId, content } = body;

    if (!senderId || !receiverId || !content) {
      return NextResponse.json(
        { success: false, error: 'Sender, Receiver, and Content are required.' },
        { status: 400 }
      );
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content: content.trim(),
        isRead: false,
      },
    });

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error: any) {
    console.error('API POST /api/messages error:', error?.message);
    return NextResponse.json(
      { success: false, error: 'Failed to record chat message.' },
      { status: 500 }
    );
  }
}

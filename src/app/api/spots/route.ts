import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const spots = await prisma.spot.findMany({
      where: { status: 'APPROVED' },
      include: {
        owner: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        reviews: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, spots });
  } catch (error: any) {
    console.error('API GET /api/spots error:', error?.message);
    return NextResponse.json({ success: false, spots: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ownerId, title, category, description, coverImage, phoneNumber, priceInfo, features } = body;

    if (!ownerId || !title || !category || !description || !coverImage) {
      return NextResponse.json(
        { success: false, error: 'Missing required spot fields.' },
        { status: 400 }
      );
    }

    const newSpot = await prisma.spot.create({
      data: {
        ownerId,
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        coverImage: coverImage.trim(),
        phoneNumber: phoneNumber || '+998 90 123 45 67',
        priceInfo: priceInfo || 'Avg 150,000 UZS / guest',
        features: features || ['Free WiFi', 'Halal', 'Parking'],
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, spot: newSpot }, { status: 201 });
  } catch (error: any) {
    console.error('API POST /api/spots error:', error?.message);
    return NextResponse.json(
      { success: false, error: 'Failed to create spot in database.' },
      { status: 500 }
    );
  }
}

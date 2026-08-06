import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const spotId = params.id;
    const spot = await prisma.spot.findUnique({
      where: { id: spotId },
      include: {
        owner: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        reviews: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!spot) {
      return NextResponse.json(
        { success: false, error: 'Spot not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, spot });
  } catch (error: any) {
    console.error('API GET /api/spots/[id] error:', error?.message);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch spot detail' },
      { status: 500 }
    );
  }
}

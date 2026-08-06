import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const mockSpots = [
    {
      id: 'spot_1',
      title: 'Miyabi Omakase & Edomae Sushi',
      category: 'Omakase & Sushi',
      description: 'Ultra-exclusive 12-seat Japanese omakase experience featuring wild-caught bluefin tuna.',
      coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
      viewsToday: 1420,
      isFeatured: true,
      status: 'APPROVED',
      rating: 4.9,
      reviewsCount: 328,
      location: 'Ginza District / Downtown',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'spot_2',
      title: 'Fornace 800° Neapolitan Woodfire',
      category: 'Neapolitan Pizza',
      description: 'Double-fermented sourdough pizza baked in custom Vesuvian volcanic stone oven.',
      coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
      viewsToday: 980,
      isFeatured: true,
      status: 'APPROVED',
      rating: 4.8,
      reviewsCount: 215,
      location: 'Little Italy Quarter',
      createdAt: new Date().toISOString(),
    }
  ];

  return NextResponse.json({ success: true, spots: mockSpots });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newSpot = {
      id: `spot_${Date.now()}`,
      ...body,
      viewsToday: 1,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json({ success: true, spot: newSpot }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}

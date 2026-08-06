import { Spot, SpotStatus } from '@/types';

export async function fetchSpots() {
  return {
    success: true,
    message: "Fetched spots successfully",
  };
}

export async function createSpotAction(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const coverImage = formData.get('coverImage') as string;

  return {
    success: true,
    spot: {
      id: `spot_${Date.now()}`,
      title,
      category,
      description,
      coverImage,
      status: 'PENDING' as SpotStatus,
    },
  };
}

export async function updateSpotStatusAction(spotId: string, status: SpotStatus) {
  return {
    success: true,
    spotId,
    status,
  };
}

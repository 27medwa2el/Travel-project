import { NextApiRequest, NextApiResponse } from 'next';
import { tripStore } from '@/lib/mockStore';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id: tripId } = req.query;
    const { cityId } = req.body;

    if (!tripId || !cityId) {
      return res.status(400).json({ error: 'Trip ID and City ID are required' });
    }

    const trip = tripStore.getById(tripId as string);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Check if city already exists in trip
    const cityExists = trip.cities.some(c => c.cityId === cityId);
    if (cityExists) {
      return res.status(400).json({ error: 'City already added to this trip' });
    }

    // Add city to trip itinerary
    const updatedCities = [
      ...trip.cities,
      {
        id: Math.random().toString(36).substring(7),
        cityId,
        startDate: trip.startDate,
        endDate: trip.endDate,
        items: []
      }
    ];

    tripStore.update(tripId as string, { cities: updatedCities });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to add city to trip:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

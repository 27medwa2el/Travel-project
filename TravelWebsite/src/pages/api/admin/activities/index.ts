import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { activityStore } from '@/lib/mockStore';
import { ActivityInput } from '@/types/domain';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Protect admin API routes
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const { cityId } = req.query;
        let activities;

        if (cityId && typeof cityId === 'string') {
          activities = activityStore.getByCityId(cityId);
        } else {
          activities = activityStore.getAll();
        }

        return res.status(200).json(activities);

      case 'POST':
        const input: ActivityInput = req.body;

        // Basic validation
        if (!input.title || input.title.trim().length === 0) {
          return res.status(400).json({ error: 'Activity title is required' });
        }
        if (!input.cityId) {
          return res.status(400).json({ error: 'City ID is required' });
        }
        if (typeof input.lat !== 'number' || typeof input.lng !== 'number') {
          return res.status(400).json({ error: 'Valid lat/lng coordinates are required' });
        }

        const activity = activityStore.create(input);
        return res.status(201).json(activity);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { tourGuideStore } from '@/lib/mockStore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const { cityId } = req.query;
        let guides;
        if (cityId && typeof cityId === 'string') {
          guides = tourGuideStore.getByCityId(cityId);
        } else {
          guides = tourGuideStore.getAll();
        }
        return res.status(200).json(guides);

      case 'POST':
        const input = req.body;
        if (!input.name || !input.cityId) {
          return res.status(400).json({ error: 'Name and City ID are required' });
        }
        const guide = tourGuideStore.create(input);
        return res.status(201).json(guide);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

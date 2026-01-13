import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { eventStore } from '@/lib/mockStore';

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
        let events;
        if (cityId && typeof cityId === 'string') {
          events = eventStore.getByCityId(cityId);
        } else {
          events = eventStore.getAll();
        }
        return res.status(200).json(events);

      case 'POST':
        const input = req.body;
        if (!input.title || !input.cityId) {
          return res.status(400).json({ error: 'Title and City ID are required' });
        }
        const event = eventStore.create(input);
        return res.status(201).json(event);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

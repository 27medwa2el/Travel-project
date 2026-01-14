import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { tripStore } from '@/lib/mockStore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (req.method) {
      case 'GET':
        return res.status(200).json(tripStore.getByUserId(userId));

      case 'POST':
        const trip = tripStore.create({
          ...req.body,
          userId,
        });
        return res.status(201).json(trip);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

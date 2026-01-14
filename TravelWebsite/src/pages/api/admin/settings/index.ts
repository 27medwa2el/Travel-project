import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { settingsStore } from '@/lib/mockStore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json(settingsStore.get());

      case 'PUT':
        const { userId } = getAuth(req);
        if (!userId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const updated = settingsStore.update(req.body);
        return res.status(200).json(updated);

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

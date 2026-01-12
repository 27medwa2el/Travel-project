import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { cityStore } from '@/lib/mockStore';
import { CityInput } from '@/types/domain';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Protect admin API routes
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid city ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const city = cityStore.getById(id);
        if (!city) {
          return res.status(404).json({ error: 'City not found' });
        }
        return res.status(200).json(city);

      case 'PUT':
        const input: Partial<CityInput> = req.body;

        // Basic validation
        if (input.name && input.name.trim().length === 0) {
          return res.status(400).json({ error: 'City name cannot be empty' });
        }

        const updated = cityStore.update(id, input);
        if (!updated) {
          return res.status(404).json({ error: 'City not found' });
        }
        return res.status(200).json(updated);

      case 'DELETE':
        const deleted = cityStore.delete(id);
        if (!deleted) {
          return res.status(404).json({ error: 'City not found' });
        }
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

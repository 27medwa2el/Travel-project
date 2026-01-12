import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { countryStore } from '@/lib/mockStore';
import { CountryInput } from '@/types/domain';

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
    return res.status(400).json({ error: 'Invalid country ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const country = countryStore.getById(id);
        if (!country) {
          return res.status(404).json({ error: 'Country not found' });
        }
        return res.status(200).json(country);

      case 'PUT':
        const input: Partial<CountryInput> = req.body;

        // Basic validation
        if (input.name && input.name.trim().length === 0) {
          return res.status(400).json({ error: 'Country name cannot be empty' });
        }

        const updated = countryStore.update(id, input);
        if (!updated) {
          return res.status(404).json({ error: 'Country not found' });
        }
        return res.status(200).json(updated);

      case 'DELETE':
        const deleted = countryStore.delete(id);
        if (!deleted) {
          return res.status(404).json({ error: 'Country not found' });
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

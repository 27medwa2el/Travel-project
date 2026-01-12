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

  try {
    switch (req.method) {
      case 'GET':
        const { countryId } = req.query;
        let cities;

        if (countryId && typeof countryId === 'string') {
          cities = cityStore.getByCountryId(countryId);
        } else {
          cities = cityStore.getAll();
        }

        return res.status(200).json(cities);

      case 'POST':
        const input: CityInput = req.body;

        // Basic validation
        if (!input.name || input.name.trim().length === 0) {
          return res.status(400).json({ error: 'City name is required' });
        }
        if (!input.countryId) {
          return res.status(400).json({ error: 'Country ID is required' });
        }

        const city = cityStore.create(input);
        return res.status(201).json(city);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

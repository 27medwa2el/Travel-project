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

  try {
    switch (req.method) {
      case 'GET':
        const countries = countryStore.getAll();
        return res.status(200).json(countries);

      case 'POST':
        const input: CountryInput = req.body;

        // Basic validation
        if (!input.name || input.name.trim().length === 0) {
          return res.status(400).json({ error: 'Country name is required' });
        }

        const country = countryStore.create(input);
        return res.status(201).json(country);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

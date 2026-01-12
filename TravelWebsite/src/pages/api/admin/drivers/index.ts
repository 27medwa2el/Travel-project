import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { driverStore } from '@/lib/mockStore';
import { DriverInput } from '@/types/domain';

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
        let drivers;

        if (cityId && typeof cityId === 'string') {
          drivers = driverStore.getByCityId(cityId);
        } else {
          drivers = driverStore.getAll();
        }

        return res.status(200).json(drivers);

      case 'POST':
        const input: DriverInput = req.body;

        // Basic validation
        if (!input.name || input.name.trim().length === 0) {
          return res.status(400).json({ error: 'Driver name is required' });
        }
        if (!input.cityId) {
          return res.status(400).json({ error: 'City ID is required' });
        }

        const driver = driverStore.create(input);
        return res.status(201).json(driver);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

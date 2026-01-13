import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { carStore } from '@/lib/mockStore';

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
        let cars;
        if (cityId && typeof cityId === 'string') {
          cars = carStore.getByCityId(cityId);
        } else {
          cars = carStore.getAll();
        }
        return res.status(200).json(cars);

      case 'POST':
        const input = req.body;
        if (!input.name || !input.cityId) {
          return res.status(400).json({ error: 'Name and City ID are required' });
        }
        const car = carStore.create(input);
        return res.status(201).json(car);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

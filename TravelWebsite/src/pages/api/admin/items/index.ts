import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { itemStore } from '@/lib/mockStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    switch (req.method) {
      case 'GET':
        const { cityId } = req.query;
        const items = cityId ? itemStore.getByCityId(cityId as string) : itemStore.getAll();
        return res.status(200).json(items);
      case 'POST':
        const item = itemStore.create(req.body);
        return res.status(201).json(item);
      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { tripStore } from '@/lib/mockStore';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const trip = tripStore.getById(id as string);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  if (trip.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(trip.packingList);
  }

  if (req.method === 'POST') {
    const updatedTrip = tripStore.addPackingItem(id as string, req.body);
    if (!updatedTrip) {
      return res.status(500).json({ error: 'Failed to add item' });
    }
    return res.status(201).json(updatedTrip.packingList[updatedTrip.packingList.length - 1]);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

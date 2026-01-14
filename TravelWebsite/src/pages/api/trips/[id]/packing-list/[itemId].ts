import { NextApiRequest, NextApiResponse } from 'next';
import { tripStore } from '@/lib/mockStore';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, itemId } = req.query;
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

  if (req.method === 'PATCH') {
    const updatedTrip = tripStore.updatePackingItem(id as string, itemId as string, req.body);
    if (!updatedTrip) {
      return res.status(500).json({ error: 'Failed to update item' });
    }
    const item = updatedTrip.packingList.find(i => i.id === itemId);
    return res.status(200).json(item);
  }

  if (req.method === 'DELETE') {
    const success = tripStore.removePackingItem(id as string, itemId as string);
    if (!success) {
      return res.status(500).json({ error: 'Failed to delete item' });
    }
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PATCH', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

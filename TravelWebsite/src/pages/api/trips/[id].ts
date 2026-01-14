import { NextApiRequest, NextApiResponse } from 'next';
import { tripStore } from '@/lib/mockStore';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
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
      return res.status(200).json(trip);
    } else if (req.method === 'PUT') {
      const updatedTrip = tripStore.update(id as string, req.body);
      return res.status(200).json(updatedTrip);
    } else if (req.method === 'DELETE') {
      tripStore.delete(id as string);
      return res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Failed to handle trip request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

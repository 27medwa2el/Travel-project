import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const trip = await prisma.trip.findUnique({
      where: { id: id as string },
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.method === 'GET') {
      const items = await prisma.tripPackingItem.findMany({
        where: { tripId: id as string },
        orderBy: { createdAt: 'asc' }
      });
      return res.status(200).json(items);
    }

    if (req.method === 'POST') {
      const { title, description, category, isPacked, referenceId, cityId } = req.body;
      
      const newItem = await prisma.tripPackingItem.create({
        data: {
          tripId: id as string,
          cityId,
          title,
          description,
          category,
          isPacked: isPacked || false,
          referenceId
        }
      });
      
      return res.status(201).json(newItem);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    console.error('Packing List API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

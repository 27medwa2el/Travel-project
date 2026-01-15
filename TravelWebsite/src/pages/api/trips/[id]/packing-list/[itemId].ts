import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, itemId } = req.query;
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

    if (req.method === 'PATCH') {
      const { title, description, isPacked } = req.body;
      
      const updatedItem = await prisma.tripPackingItem.update({
        where: { id: itemId as string },
        data: {
          title,
          description,
          isPacked
        }
      });
      
      return res.status(200).json(updatedItem);
    }

    if (req.method === 'DELETE') {
      await prisma.tripPackingItem.delete({
        where: { id: itemId as string }
      });
      return res.status(204).end();
    }

    res.setHeader('Allow', ['PATCH', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    console.error('Packing Item API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

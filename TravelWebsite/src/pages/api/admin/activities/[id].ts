import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Protect admin API routes
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid activity ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const activity = await prisma.activity.findUnique({
          where: { id },
          include: { city: true }
        });
        if (!activity) {
          return res.status(404).json({ error: 'Activity not found' });
        }
        return res.status(200).json(activity);

      case 'PUT':
        const input = req.body;

        // Basic validation
        if (input.title && input.title.trim().length === 0) {
          return res.status(400).json({ error: 'Activity title cannot be empty' });
        }

        const updated = await prisma.activity.update({
          where: { id },
          data: {
            title: input.title,
            cityId: input.cityId,
            description: input.description,
            price: input.price !== undefined ? parseFloat(input.price) : undefined,
            currency: input.currency,
            lat: input.lat !== undefined ? parseFloat(input.lat) : undefined,
            lng: input.lng !== undefined ? parseFloat(input.lng) : undefined,
            images: input.images,
            tags: input.tags,
            bookingUrl: input.bookingUrl,
          }
        });
        return res.status(200).json(updated);

      case 'DELETE':
        await prisma.activity.delete({
          where: { id }
        });
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

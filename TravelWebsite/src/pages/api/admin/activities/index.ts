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

  try {
    switch (req.method) {
      case 'GET':
        const { cityId } = req.query;
        
        const activities = await prisma.activity.findMany({
          where: cityId ? { cityId: String(cityId) } : {},
          include: {
            city: true
          },
          orderBy: {
            title: 'asc'
          }
        });

        return res.status(200).json(activities);

      case 'POST':
        const input = req.body;

        // Basic validation
        if (!input.title || input.title.trim().length === 0) {
          return res.status(400).json({ error: 'Activity title is required' });
        }
        if (!input.cityId) {
          return res.status(400).json({ error: 'City ID is required' });
        }

        const activity = await prisma.activity.create({
          data: {
            title: input.title,
            cityId: input.cityId,
            description: input.description,
            price: input.price !== undefined ? parseFloat(input.price) : undefined,
            currency: input.currency,
            lat: parseFloat(input.lat),
            lng: parseFloat(input.lng),
            images: input.images || [],
            tags: input.tags || [],
            bookingUrl: input.bookingUrl,
          }
        });
        return res.status(201).json(activity);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

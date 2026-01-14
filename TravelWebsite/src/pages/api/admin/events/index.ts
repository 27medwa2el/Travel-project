import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

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
        const events = await prisma.cityEvent.findMany({
          where: cityId ? { cityId: String(cityId) } : {},
          include: { city: true },
          orderBy: { date: 'asc' }
        });
        return res.status(200).json(events);

      case 'POST':
        const input = req.body;
        if (!input.title || !input.cityId) {
          return res.status(400).json({ error: 'Title and City ID are required' });
        }
        const event = await prisma.cityEvent.create({
          data: {
            title: input.title,
            cityId: input.cityId,
            description: input.description,
            date: input.date,
            location: input.location,
            lat: parseFloat(input.lat),
            lng: parseFloat(input.lng),
            imageUrl: input.imageUrl,
            bookingUrl: input.bookingUrl,
          }
        });
        return res.status(201).json(event);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('Event API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

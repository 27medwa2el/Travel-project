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
    return res.status(400).json({ error: 'Invalid city ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const city = await prisma.city.findUnique({
          where: { id },
          include: {
            country: true,
            activities: true,
            events: true,
            tips: true,
            documents: true,
            recommendedItems: true
          }
        });
        if (!city) {
          return res.status(404).json({ error: 'City not found' });
        }
        return res.status(200).json(city);

      case 'PUT':
        const input = req.body;

        // Basic validation
        if (input.name && input.name.trim().length === 0) {
          return res.status(400).json({ error: 'City name cannot be empty' });
        }

        const updated = await prisma.city.update({
          where: { id },
          data: {
            name: input.name,
            countryId: input.countryId,
            lat: input.lat !== undefined ? parseFloat(input.lat) : undefined,
            lng: input.lng !== undefined ? parseFloat(input.lng) : undefined,
            images: input.images,
            timezone: input.timezone,
            currency: input.currency,
            language: input.language,
          }
        });
        return res.status(200).json(updated);

      case 'DELETE':
        await prisma.city.delete({
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

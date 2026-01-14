import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (req.method) {
      case 'GET':
        const trips = await prisma.trip.findMany({
          where: { userId },
          include: {
            cities: {
              include: {
                city: true,
                items: true
              }
            },
            packingList: true
          },
          orderBy: { createdAt: 'desc' }
        });
        return res.status(200).json(trips);

      case 'POST':
        const { title, startDate, endDate, countryId, cities } = req.body;
        
        const trip = await prisma.trip.create({
          data: {
            userId,
            title,
            startDate,
            endDate,
            countryId,
            status: 'upcoming',
            cities: {
              create: cities?.map((c: any) => ({
                cityId: c.cityId,
                startDate: c.startDate,
                endDate: c.endDate,
                items: {
                  create: c.items?.map((item: any) => ({
                    type: item.type,
                    referenceId: item.referenceId,
                    date: item.date,
                    startTime: item.startTime,
                    endTime: item.endTime
                  }))
                }
              }))
            }
          },
          include: {
            cities: {
              include: {
                items: true
              }
            }
          }
        });
        return res.status(201).json(trip);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('Trip API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

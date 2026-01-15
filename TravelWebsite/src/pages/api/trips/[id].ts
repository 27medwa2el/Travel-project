import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const trip = await prisma.trip.findUnique({
      where: { id: id as string },
      include: {
        cities: {
          include: {
            items: {
              include: {
                activity: true,
                event: true
              }
            },
            city: true
          }
        }
      }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    switch (req.method) {
      case 'GET':
        return res.status(200).json(trip);

      case 'PUT':
        const { title, startDate, endDate, status, cities } = req.body;
        
        // Update basic trip info
        const updatedTrip = await prisma.$transaction(async (tx) => {
          // Delete all existing cities and items to recreate them
          // (Simplest way to sync complex nested structures)
          await tx.tripCity.deleteMany({
            where: { tripId: id as string }
          });

          return await tx.trip.update({
            where: { id: id as string },
            data: {
              title,
              startDate,
              endDate,
              status,
              cities: {
                create: cities?.map((c: any) => ({
                  cityId: c.cityId,
                  startDate: c.startDate,
                  endDate: c.endDate,
                  items: {
                    create: c.items?.map((item: any) => ({
                      type: item.type,
                      date: item.date,
                      startTime: item.startTime || null,
                      endTime: item.endTime || null,
                      ...(item.type === 'ACTIVITY' && (item.activityId || item.referenceId) ? {
                        activity: { connect: { id: item.activityId || item.referenceId } }
                      } : {}),
                      ...(item.type === 'EVENT' && (item.eventId || item.referenceId) ? {
                        event: { connect: { id: item.eventId || item.referenceId } }
                      } : {})
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
        });

        return res.status(200).json(updatedTrip);

      case 'DELETE':
        await prisma.trip.delete({
          where: { id: id as string }
        });
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Failed to handle trip request:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

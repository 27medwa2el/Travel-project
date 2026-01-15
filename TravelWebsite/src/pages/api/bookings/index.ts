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
        const bookings = await prisma.booking.findMany({
          where: { userId },
          include: {
            activity: true,
            driver: true
          },
          orderBy: { createdAt: 'desc' }
        });
        return res.status(200).json(bookings);

      case 'POST':
        const { type, referenceId, date, price, currency } = req.body;
        
        const booking = await prisma.booking.create({
          data: {
            userId,
            type,
            date,
            status: 'confirmed',
            price,
            currency,
            ...(type === 'ACTIVITY' && referenceId ? {
              activity: { connect: { id: referenceId } }
            } : {}),
            ...(type === 'DRIVER' && referenceId ? {
              driver: { connect: { id: referenceId } }
            } : {})
          }
        });
        
        return res.status(201).json(booking);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('Booking API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

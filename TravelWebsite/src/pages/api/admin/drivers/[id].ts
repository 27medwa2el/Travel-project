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
    return res.status(400).json({ error: 'Invalid driver ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const driver = await prisma.driver.findUnique({
          where: { id },
          include: { city: true }
        });
        if (!driver) {
          return res.status(404).json({ error: 'Driver not found' });
        }
        return res.status(200).json(driver);

      case 'PUT':
        const { name, phone, contactInfo, pricePerDay, vehicleType, rating, cityId } = req.body;

        const updated = await prisma.driver.update({
          where: { id },
          data: {
            name,
            phone,
            contactInfo,
            pricePerDay,
            vehicleType,
            rating,
            cityId
          }
        });
        return res.status(200).json(updated);

      case 'DELETE':
        await prisma.driver.delete({
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

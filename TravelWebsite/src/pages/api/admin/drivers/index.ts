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
        const drivers = await prisma.driver.findMany({
          where: cityId ? { cityId: cityId as string } : {},
          include: { city: true },
          orderBy: { name: 'asc' }
        });
        return res.status(200).json(drivers);

      case 'POST':
        const { name, phone, contactInfo, pricePerDay, vehicleType, rating, cityId: newCityId } = req.body;
        
        if (!name || !newCityId) {
          return res.status(400).json({ error: 'Name and cityId are required' });
        }

        const driver = await prisma.driver.create({
          data: {
            name,
            phone,
            contactInfo,
            pricePerDay,
            vehicleType,
            rating,
            cityId: newCityId
          }
        });
        return res.status(201).json(driver);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

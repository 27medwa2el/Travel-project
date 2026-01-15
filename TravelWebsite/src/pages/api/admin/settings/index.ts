import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const settings = await prisma.appSettings.findFirst() || { standardCityPrice: 250, currency: 'USD' };
        return res.status(200).json(settings);

      case 'PUT':
        const { userId } = getAuth(req);
        if (!userId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const { standardCityPrice, currency } = req.body;
        
        const updated = await prisma.appSettings.upsert({
          where: { id: 1 },
          update: { standardCityPrice, currency },
          create: { id: 1, standardCityPrice, currency }
        });
        
        return res.status(200).json(updated);

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('Settings API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

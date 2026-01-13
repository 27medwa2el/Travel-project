import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { documentStore } from '@/lib/mockStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    switch (req.method) {
      case 'GET':
        const { cityId } = req.query;
        const docs = cityId ? documentStore.getByCityId(cityId as string) : documentStore.getAll();
        return res.status(200).json(docs);
      case 'POST':
        const doc = documentStore.create(req.body);
        return res.status(201).json(doc);
      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

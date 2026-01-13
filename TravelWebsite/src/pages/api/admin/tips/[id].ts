import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { tipStore } from '@/lib/mockStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  try {
    switch (req.method) {
      case 'DELETE':
        tipStore.delete(id as string);
        return res.status(200).json({ success: true });
      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

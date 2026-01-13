import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { applicationStore } from '@/lib/mockStore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const app = applicationStore.getById(id);
        if (!app) return res.status(404).json({ error: 'Application not found' });
        return res.status(200).json(app);

      case 'PUT':
        const updated = applicationStore.update(id, req.body);
        if (!updated) return res.status(404).json({ error: 'Application not found' });
        return res.status(200).json(updated);

      case 'DELETE':
        const deleted = applicationStore.delete(id);
        if (!deleted) return res.status(404).json({ error: 'Application not found' });
        return res.status(200).json({ success: true });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

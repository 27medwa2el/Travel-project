import { NextApiRequest, NextApiResponse } from 'next';
import { activityStore, cityStore, countryStore } from '@/lib/mockStore';
import { ActivityWithLocation } from '@/types/domain';

/**
 * Public API endpoint for fetching activities (used by travel pages)
 * 
 * GET /api/public/activities
 * Query params:
 *   - cityId (optional): Filter by city
 *   - countryId (optional): Filter by country
 *   - tags (optional): Comma-separated list of tags
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { cityId, countryId, tags } = req.query;

    // Get all activities
    let activities = activityStore.getAll();

    // Filter by cityId if provided
    if (cityId && typeof cityId === 'string') {
      activities = activities.filter((a) => a.cityId === cityId);
    }

    // Filter by countryId if provided
    if (countryId && typeof countryId === 'string') {
      const citiesInCountry = cityStore
        .getByCountryId(countryId)
        .map((c) => c.id);
      activities = activities.filter((a) => citiesInCountry.includes(a.cityId));
    }

    // Filter by tags if provided
    if (tags && typeof tags === 'string') {
      const tagList = tags.split(',').map((t) => t.trim().toLowerCase());
      activities = activities.filter((a) =>
        a.tags?.some((tag) => tagList.includes(tag.toLowerCase()))
      );
    }

    // Aggregate with city and country information
    const activitiesWithLocation: ActivityWithLocation[] = activities.map(
      (activity) => {
        const city = cityStore.getById(activity.cityId);
        const country = city ? countryStore.getById(city.countryId) : undefined;

        return {
          ...activity,
          cityName: city?.name || 'Unknown City',
          countryName: country?.name || 'Unknown Country',
          countryCode: country?.code,
        };
      }
    );

    return res.status(200).json(activitiesWithLocation);
  } catch (error: any) {
    console.error('API Error:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
}

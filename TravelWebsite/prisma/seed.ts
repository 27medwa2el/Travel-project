import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data (optional, but good for repeatable seeds)
  // Be careful with the order due to foreign keys
  await prisma.booking.deleteMany({})
  await prisma.tripItem.deleteMany({})
  await prisma.tripPackingItem.deleteMany({})
  await prisma.tripCity.deleteMany({})
  await prisma.trip.deleteMany({})
  await prisma.activity.deleteMany({})
  await prisma.cityEvent.deleteMany({})
  await prisma.cityTip.deleteMany({})
  await prisma.cityDocument.deleteMany({})
  await prisma.cityRecommendedItem.deleteMany({})
  await prisma.cityApplication.deleteMany({})
  await prisma.cityCar.deleteMany({})
  await prisma.cityTourGuide.deleteMany({})
  await prisma.driver.deleteMany({})
  await prisma.city.deleteMany({})
  await prisma.country.deleteMany({})

  // 1. Seed Countries
  const countries = await Promise.all([
    prisma.country.create({ data: { name: 'United States', code: 'US', continent: 'North America' } }),
    prisma.country.create({ data: { name: 'United Kingdom', code: 'GB', continent: 'Europe' } }),
    prisma.country.create({ data: { name: 'France', code: 'FR', continent: 'Europe' } }),
    prisma.country.create({ data: { name: 'United Arab Emirates', code: 'AE', continent: 'Middle East' } }),
    prisma.country.create({ data: { name: 'Japan', code: 'JP', continent: 'Asia' } }),
    prisma.country.create({ data: { name: 'Australia', code: 'AU', continent: 'Oceania' } }),
  ])

  console.log(`✅ Seeded ${countries.length} countries`)

  const usa = countries.find(c => c.code === 'US')!
  const uk = countries.find(c => c.code === 'GB')!
  const france = countries.find(c => c.code === 'FR')!
  const uae = countries.find(c => c.code === 'AE')!
  const japan = countries.find(c => c.code === 'JP')!

  // 2. Seed Cities
  const nyc = await prisma.city.create({
    data: {
      countryId: usa.id,
      name: 'New York',
      lat: 40.7128,
      lng: -74.0060,
      images: ['https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80'],
      timezone: 'UTC -5',
      currency: 'USD',
      language: 'English',
      tips: { create: [{ content: 'Tipping 20% is standard in restaurants and bars.' }, { content: 'The subway is the fastest way to get around Manhattan.' }] },
      documents: { create: [{ name: 'Valid Passport & ESTA/Visa', exampleUrl: 'https://www.cbp.gov/sites/default/files/assets/documents/2019-Dec/esta-sample-application.pdf' }] },
      recommendedItems: { create: [{ name: 'Comfortable Walking Shoes' }, { name: 'Portable Power Bank' }] },
      activities: {
        create: [
          { title: 'Statue of Liberty Tour', price: 45, lat: 40.6892, lng: -74.0445, tags: ['landmark', 'history'], bookingUrl: 'https://www.getyourguide.com' },
          { title: 'Central Park Bike Tour', price: 35, lat: 40.7812, lng: -73.9665, tags: ['outdoor', 'family'], bookingUrl: 'https://www.viator.com' }
        ]
      }
    }
  })

  const london = await prisma.city.create({
    data: {
      countryId: uk.id,
      name: 'London',
      lat: 51.5074,
      lng: -0.1278,
      images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80'],
      timezone: 'UTC +0',
      currency: 'GBP',
      language: 'English',
      tips: { create: [{ content: 'Stand on the right on Tube escalators.' }, { content: 'Pack an umbrella—the weather changes fast.' }] },
      activities: {
        create: [
          { title: 'London Eye Flight', price: 30, lat: 51.5033, lng: -0.1195, tags: ['landmark', 'views'], bookingUrl: 'https://www.londoneye.com' },
          { title: 'Tower of London', price: 35, lat: 51.5081, lng: -0.0759, tags: ['history', 'landmark'], bookingUrl: 'https://www.hrp.org.uk' }
        ]
      }
    }
  })

  const paris = await prisma.city.create({
    data: {
      countryId: france.id,
      name: 'Paris',
      lat: 48.8566,
      lng: 2.3522,
      images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'],
      timezone: 'UTC +1',
      currency: 'EUR',
      language: 'French',
      activities: {
        create: [
          { title: 'Eiffel Tower Summit', price: 60, lat: 48.8584, lng: 2.2945, tags: ['landmark', 'views'], bookingUrl: 'https://www.toureiffel.paris' },
          { title: 'Louvre Museum Tour', price: 50, lat: 48.8606, lng: 2.3376, tags: ['art', 'museum'], bookingUrl: 'https://www.louvre.fr' }
        ]
      }
    }
  })

  const dubai = await prisma.city.create({
    data: {
      countryId: uae.id,
      name: 'Dubai',
      lat: 25.2048,
      lng: 55.2708,
      images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'],
      timezone: 'UTC +4',
      currency: 'AED',
      language: 'Arabic',
      activities: {
        create: [
          { title: 'Burj Khalifa Top', price: 45, lat: 25.1972, lng: 55.2744, tags: ['landmark', 'views'], bookingUrl: 'https://www.burjkhalifa.ae' },
          { title: 'Desert Safari Adventure', price: 75, lat: 25.0500, lng: 55.4500, tags: ['adventure', 'desert'], bookingUrl: 'https://www.desertsafari.ae' }
        ]
      }
    }
  })

  const tokyo = await prisma.city.create({
    data: {
      countryId: japan.id,
      name: 'Tokyo',
      lat: 35.6762,
      lng: 139.6503,
      images: ['https://images.unsplash.com/photo-1540959733332-e94e270b4d82?auto=format&fit=crop&w=1200&q=80'],
      timezone: 'UTC +9',
      currency: 'JPY',
      language: 'Japanese',
      activities: {
        create: [
          { title: 'Shibuya Crossing Experience', price: 0, lat: 35.6595, lng: 139.7005, tags: ['landmark', 'street'], bookingUrl: '#' },
          { title: 'Senso-ji Temple Visit', price: 0, lat: 35.7148, lng: 139.7967, tags: ['culture', 'temple'], bookingUrl: '#' }
        ]
      }
    }
  })

  console.log('✅ Seeded core cities and activities')

  // 3. Seed some Drivers and Events for New York
  await prisma.driver.create({
    data: {
      cityId: nyc.id,
      name: 'John Smith',
      vehicleType: 'sedan',
      pricePerDay: 150,
      rating: 4.9,
      contactInfo: '+1-212-555-0101'
    }
  })

  await prisma.cityEvent.create({
    data: {
      cityId: nyc.id,
      title: 'Broadway Jazz Festival',
      description: 'Annual jazz festival in the heart of Broadway.',
      date: '2026-08-20',
      location: 'Times Square',
      lat: 40.7580,
      lng: -73.9855,
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    }
  })

  console.log('🏁 Seeding finished successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

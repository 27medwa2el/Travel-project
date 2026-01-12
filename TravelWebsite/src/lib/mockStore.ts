/**
 * Phase B: Mock In-Memory Data Store
 * 
 * This module provides in-memory persistence for CRUD operations.
 * Data is reset on server restart.
 * 
 * MIGRATION TO PRISMA:
 * 1. Create Prisma schema with these models
 * 2. Run migrations: npx prisma migrate dev
 * 3. Replace mockStore calls with Prisma client calls
 * 4. Use the same API route structure
 */

import {
  Country,
  City,
  Activity,
  Driver,
  CountryInput,
  CityInput,
  ActivityInput,
  DriverInput,
} from '@/types/domain';

// In-memory storage with global persistence for development
const globalForStore = global as unknown as {
  store: {
    countries: Map<string, Country>;
    cities: Map<string, City>;
    activities: Map<string, Activity>;
    drivers: Map<string, Driver>;
  }
};

const store = globalForStore.store || {
  countries: new Map<string, Country>(),
  cities: new Map<string, City>(),
  activities: new Map<string, Activity>(),
  drivers: new Map<string, Driver>(),
};

if (process.env.NODE_ENV !== 'production') globalForStore.store = store;

// Helper to generate stable IDs
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to get current timestamp
function timestamp(): string {
  return new Date().toISOString();
}

// ============= COUNTRIES =============

export const countryStore = {
  getAll(): Country[] {
    return Array.from(store.countries.values());
  },

  getById(id: string): Country | undefined {
    return store.countries.get(id);
  },

  create(input: CountryInput): Country {
    const country: Country = {
      id: generateId(),
      ...input,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    store.countries.set(country.id, country);
    return country;
  },

  update(id: string, input: Partial<CountryInput>): Country | null {
    const existing = store.countries.get(id);
    if (!existing) return null;

    const updated: Country = {
      ...existing,
      ...input,
      updatedAt: timestamp(),
    };
    store.countries.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    // Check if any cities reference this country
    const citiesInCountry = Array.from(store.cities.values()).filter(
      (c) => c.countryId === id
    );
    if (citiesInCountry.length > 0) {
      throw new Error(
        `Cannot delete country: ${citiesInCountry.length} cities still reference it`
      );
    }
    return store.countries.delete(id);
  },
};

// ============= CITIES =============

export const cityStore = {
  getAll(): City[] {
    return Array.from(store.cities.values());
  },

  getById(id: string): City | undefined {
    return store.cities.get(id);
  },

  getByCountryId(countryId: string): City[] {
    return Array.from(store.cities.values()).filter(
      (c) => c.countryId === countryId
    );
  },

  create(input: CityInput): City {
    // Validate country exists
    if (!store.countries.has(input.countryId)) {
      throw new Error(`Country with id ${input.countryId} not found`);
    }

    const city: City = {
      id: generateId(),
      ...input,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    store.cities.set(city.id, city);
    return city;
  },

  update(id: string, input: Partial<CityInput>): City | null {
    const existing = store.cities.get(id);
    if (!existing) return null;

    // Validate country if being updated
    if (input.countryId && !store.countries.has(input.countryId)) {
      throw new Error(`Country with id ${input.countryId} not found`);
    }

    const updated: City = {
      ...existing,
      ...input,
      updatedAt: timestamp(),
    };
    store.cities.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    // Check if any activities or drivers reference this city
    const activitiesInCity = Array.from(store.activities.values()).filter(
      (a) => a.cityId === id
    );
    const driversInCity = Array.from(store.drivers.values()).filter(
      (d) => d.cityId === id
    );

    if (activitiesInCity.length > 0 || driversInCity.length > 0) {
      throw new Error(
        `Cannot delete city: ${activitiesInCity.length} activities and ${driversInCity.length} drivers still reference it`
      );
    }

    return store.cities.delete(id);
  },
};

// ============= ACTIVITIES =============

export const activityStore = {
  getAll(): Activity[] {
    return Array.from(store.activities.values());
  },

  getById(id: string): Activity | undefined {
    return store.activities.get(id);
  },

  getByCityId(cityId: string): Activity[] {
    return Array.from(store.activities.values()).filter(
      (a) => a.cityId === cityId
    );
  },

  create(input: ActivityInput): Activity {
    // Validate city exists
    if (!store.cities.has(input.cityId)) {
      throw new Error(`City with id ${input.cityId} not found`);
    }

    const activity: Activity = {
      id: generateId(),
      ...input,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    store.activities.set(activity.id, activity);
    return activity;
  },

  update(id: string, input: Partial<ActivityInput>): Activity | null {
    const existing = store.activities.get(id);
    if (!existing) return null;

    // Validate city if being updated
    if (input.cityId && !store.cities.has(input.cityId)) {
      throw new Error(`City with id ${input.cityId} not found`);
    }

    const updated: Activity = {
      ...existing,
      ...input,
      updatedAt: timestamp(),
    };
    store.activities.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return store.activities.delete(id);
  },
};

// ============= DRIVERS =============

export const driverStore = {
  getAll(): Driver[] {
    return Array.from(store.drivers.values());
  },

  getById(id: string): Driver | undefined {
    return store.drivers.get(id);
  },

  getByCityId(cityId: string): Driver[] {
    return Array.from(store.drivers.values()).filter(
      (d) => d.cityId === cityId
    );
  },

  create(input: DriverInput): Driver {
    // Validate city exists
    if (!store.cities.has(input.cityId)) {
      throw new Error(`City with id ${input.cityId} not found`);
    }

    const driver: Driver = {
      id: generateId(),
      ...input,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    store.drivers.set(driver.id, driver);
    return driver;
  },

  update(id: string, input: Partial<DriverInput>): Driver | null {
    const existing = store.drivers.get(id);
    if (!existing) return null;

    // Validate city if being updated
    if (input.cityId && !store.cities.has(input.cityId)) {
      throw new Error(`City with id ${input.cityId} not found`);
    }

    const updated: Driver = {
      ...existing,
      ...input,
      updatedAt: timestamp(),
    };
    store.drivers.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return store.drivers.delete(id);
  },
};

// ============= SEED DATA =============

// Initialize with sample data
export function seedMockData() {
  console.log('🌱 Checking mock store data... current countries size:', store.countries.size);
  if (store.countries.size > 0) return; // Already seeded

  console.log('🚀 Seeding mock data...');
  const usa = countryStore.create({ name: 'United States', code: 'US' });
  const canada = countryStore.create({ name: 'Canada', code: 'CA' });
  const uk = countryStore.create({ name: 'United Kingdom', code: 'GB' });

  // Seed cities
  const nyc = cityStore.create({ countryId: usa.id, name: 'New York' });
  const la = cityStore.create({ countryId: usa.id, name: 'Los Angeles' });
  const toronto = cityStore.create({ countryId: canada.id, name: 'Toronto' });
  const vancouver = cityStore.create({
    countryId: canada.id,
    name: 'Vancouver',
  });
  const london = cityStore.create({ countryId: uk.id, name: 'London' });

  // Seed activities
  activityStore.create({
    cityId: nyc.id,
    title: 'Statue of Liberty Tour',
    description: 'Visit the iconic Statue of Liberty and Ellis Island',
    price: 45,
    currency: 'USD',
    lat: 40.6892,
    lng: -74.0445,
    images: ['https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80'],
    tags: ['landmark', 'history', 'outdoor'],
  });

  activityStore.create({
    cityId: nyc.id,
    title: 'Central Park Bike Tour',
    description: 'Explore Central Park on a guided bike tour',
    price: 35,
    currency: 'USD',
    lat: 40.785091,
    lng: -73.968285,
    images: ['https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80'],
    tags: ['outdoor', 'family', 'activity'],
  });

  activityStore.create({
    cityId: la.id,
    title: 'Hollywood Sign Hike',
    description: 'Hike to the iconic Hollywood Sign with stunning views',
    price: 25,
    currency: 'USD',
    lat: 34.1341,
    lng: -118.3215,
    images: ['https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80'],
    tags: ['adventure', 'outdoor', 'scenic'],
  });

  activityStore.create({
    cityId: toronto.id,
    title: 'CN Tower Experience',
    description: 'Visit the CN Tower with EdgeWalk adventure',
    price: 65,
    currency: 'CAD',
    lat: 43.6426,
    lng: -79.3871,
    images: ['https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=800&q=80'],
    tags: ['landmark', 'adventure', 'views'],
  });

  activityStore.create({
    cityId: vancouver.id,
    title: 'Grouse Mountain Adventure',
    description: 'Gondola ride and mountain activities',
    price: 55,
    currency: 'CAD',
    lat: 49.3789,
    lng: -123.0814,
    images: ['https://images.unsplash.com/photo-1568232562299-fc990748ce0f?auto=format&fit=crop&w=800&q=80'],
    tags: ['adventure', 'outdoor', 'scenic'],
  });

  activityStore.create({
    cityId: london.id,
    title: 'Tower of London Tour',
    description: 'Explore the historic Tower of London and Crown Jewels',
    price: 30,
    currency: 'GBP',
    lat: 51.5081,
    lng: -0.0759,
    images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'],
    tags: ['history', 'landmark', 'culture'],
  });

  // Seed drivers
  driverStore.create({
    cityId: nyc.id,
    name: 'John Smith',
    phone: '+1-555-0101',
    pricePerDay: 150,
    vehicleType: 'sedan',
    rating: 4.8,
  });

  driverStore.create({
    cityId: la.id,
    name: 'Maria Garcia',
    phone: '+1-555-0202',
    pricePerDay: 180,
    vehicleType: 'suv',
    rating: 4.9,
  });

  driverStore.create({
    cityId: toronto.id,
    name: 'David Chen',
    phone: '+1-416-555-0303',
    pricePerDay: 120,
    vehicleType: 'van',
    rating: 4.7,
  });

  driverStore.create({
    cityId: london.id,
    name: 'James Wilson',
    phone: '+44-20-5550-404',
    pricePerDay: 100,
    vehicleType: 'sedan',
    rating: 4.6,
  });

  console.log('✅ Mock data seeded successfully');
}

// Seed on module load
seedMockData();

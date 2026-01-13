import {
  Country,
  City,
  Activity,
  Driver,
  Trip,
  Booking,
  CountryInput,
  CityInput,
  ActivityInput,
  DriverInput,
  TripInput,
  BookingInput,
} from '@/types/domain';
import { globalCountries } from './countriesData';

// In-memory storage with global persistence for development
const globalForStore = global as unknown as {
  store: {
    countries: Map<string, Country>;
    cities: Map<string, City>;
    activities: Map<string, Activity>;
    drivers: Map<string, Driver>;
    trips: Map<string, Trip>;
    bookings: Map<string, Booking>;
  }
};

const store = globalForStore.store || {
  countries: new Map<string, Country>(),
  cities: new Map<string, City>(),
  activities: new Map<string, Activity>(),
  drivers: new Map<string, Driver>(),
  trips: new Map<string, Trip>(),
  bookings: new Map<string, Booking>(),
};

// Ensure all expected Maps exist (handles case where store was partially initialized in a previous session)
if (!store.countries) store.countries = new Map();
if (!store.cities) store.cities = new Map();
if (!store.activities) store.activities = new Map();
if (!store.drivers) store.drivers = new Map();
if (!store.trips) store.trips = new Map();
if (!store.bookings) store.bookings = new Map();

if (process.env.NODE_ENV !== 'production') {
  globalForStore.store = store;
}

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Helper for timestamps
const timestamp = () => new Date().toISOString();

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

    const updated: City = {
      ...existing,
      ...input,
      updatedAt: timestamp(),
    };
    store.cities.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
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

// ============= TRIPS =============

export const tripStore = {
  getAll(): Trip[] {
    return Array.from(store.trips.values());
  },

  getById(id: string): Trip | undefined {
    return store.trips.get(id);
  },

  create(input: TripInput): Trip {
    const trip: Trip = {
      id: generateId(),
      ...input,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    store.trips.set(trip.id, trip);
    return trip;
  },

  update(id: string, input: Partial<TripInput>): Trip | null {
    const existing = store.trips.get(id);
    if (!existing) return null;

    const updated: Trip = {
      ...existing,
      ...input,
      updatedAt: timestamp(),
    };
    store.trips.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return store.trips.delete(id);
  },
};

// ============= BOOKINGS =============

export const bookingStore = {
  getAll(): Booking[] {
    return Array.from(store.bookings.values());
  },

  getById(id: string): Booking | undefined {
    return store.bookings.get(id);
  },

  getByUserId(userId: string): Booking[] {
    return Array.from(store.bookings.values()).filter(
      (b) => b.userId === userId
    );
  },

  create(input: BookingInput): Booking {
    const booking: Booking = {
      id: generateId(),
      ...input,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    store.bookings.set(booking.id, booking);
    return booking;
  },

  update(id: string, input: Partial<BookingInput>): Booking | null {
    const existing = store.bookings.get(id);
    if (!existing) return null;

    const updated: Booking = {
      ...existing,
      ...input,
      updatedAt: timestamp(),
    };
    store.bookings.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return store.bookings.delete(id);
  },
};

// ============= SEED DATA =============

export function seedMockData() {
  // If we only have the 3 original sample countries, let's clear and add the full global list
  if (store.countries.size < 10) {
    console.log('🚀 Upgrading to global country database...');
    store.countries.clear();
    globalCountries.forEach((c) => {
      countryStore.create({ name: c.name, code: c.code, continent: c.continent });
    });
  }

  // Define high-quality images for core cities
  const cityImages: Record<string, string[]> = {
    'New York': ['https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80'],
    'Los Angeles': ['https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80'],
    'Toronto': ['https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1200&q=80'],
    'Vancouver': ['https://images.unsplash.com/photo-1560806114-1de54992713e?auto=format&fit=crop&w=1200&q=80'],
    'London': ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80'],
    'Paris': ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'],
    'Tokyo': ['https://images.unsplash.com/photo-1540959733332-e94e270b4d82?auto=format&fit=crop&w=1200&q=80'],
    'Sydney': ['https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80'],
  };

  // If cities exist but are missing images, update them
  if (store.cities.size > 0) {
    Array.from(store.cities.values()).forEach(city => {
      if (!city.images || city.images.length === 0 || city.images[0] === '') {
        const image = cityImages[city.name];
        if (image) {
          cityStore.update(city.id, { images: image });
        } else {
          // Generic high-quality city fallback
          cityStore.update(city.id, { images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80'] });
        }
      }
    });
  }

  if (store.cities.size === 0) {
    console.log('🚀 Seeding core mock data...');
    // Find seeded countries
    const countries = countryStore.getAll();
    const usa = countries.find(c => c.code === 'US');
    const canada = countries.find(c => c.code === 'CA');
    const uk = countries.find(c => c.code === 'GB');

    if (usa && canada && uk) {
      // Seed cities with high-quality specific images
      const nyc = cityStore.create({ 
        countryId: usa.id, 
        name: 'New York', 
        lat: 40.7128, 
        lng: -74.0060,
        images: ['https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80']
      });
      const la = cityStore.create({ 
        countryId: usa.id, 
        name: 'Los Angeles', 
        lat: 34.0522, 
        lng: -118.2437,
        images: ['https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80']
      });
      const toronto = cityStore.create({ 
        countryId: canada.id, 
        name: 'Toronto', 
        lat: 43.6532, 
        lng: -79.3832,
        images: ['https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1200&q=80']
      });
      const vancouver = cityStore.create({ 
        countryId: canada.id, 
        name: 'Vancouver', 
        lat: 49.2827, 
        lng: -123.1207,
        images: ['https://images.unsplash.com/photo-1560806114-1de54992713e?auto=format&fit=crop&w=1200&q=80']
      });
      const london = cityStore.create({ 
        countryId: uk.id, 
        name: 'London', 
        lat: 51.5074, 
        lng: -0.1278,
        images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80']
      });

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
        lat: 40.7812,
        lng: -73.9665,
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

      activityStore.create({
        cityId: london.id,
        title: 'London Eye Flight',
        description: 'Panoramic views of the city from the iconic observation wheel',
        price: 28,
        currency: 'GBP',
        lat: 51.5033,
        lng: -0.1195,
        images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'],
        tags: ['landmark', 'views'],
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
    }
  }

  if (store.trips.size === 0) {
    console.log('🚀 Seeding trip mock data...');
    const nyc = Array.from(store.cities.values()).find(c => c.name === 'New York');
    const london = Array.from(store.cities.values()).find(c => c.name === 'London');

    if (nyc) {
      tripStore.create({
        title: 'Summer in NYC',
        startDate: '2026-07-15',
        endDate: '2026-07-22',
        status: 'upcoming',
        progress: 0,
        cityIds: [nyc.id],
        packingList: [
          { id: '1', title: 'Passport', isPacked: true, category: 'Documents' },
          { id: '2', title: 'Sunglasses', isPacked: false, category: 'Essentials' },
          { id: '3', title: 'Camera', isPacked: false, category: 'Electronics' },
        ],
        tripActivities: [],
      });
    }

    if (london) {
      const activeTrip = tripStore.create({
        title: 'European Adventure',
        startDate: '2026-01-10',
        endDate: '2026-01-25',
        status: 'active',
        progress: 26,
        cityIds: [london.id],
        packingList: [
          { id: '1', title: 'Winter Coat', isPacked: true, category: 'Clothing' },
          { id: '2', title: 'Travel Adapter', isPacked: true, category: 'Electronics' },
          { id: '3', title: 'City Map', isPacked: false, category: 'Essentials' },
        ],
        tripActivities: [],
      });

      // Seed trip activities for the active trip
      const londonActivities = activityStore.getByCityId(london.id);
      if (londonActivities.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

        tripStore.update(activeTrip.id, {
          tripActivities: [
            {
              id: 'ta-1',
              tripId: activeTrip.id,
              activityId: londonActivities[0].id,
              date: today,
              startTime: '10:00',
              endTime: '13:00'
            },
            {
              id: 'ta-2',
              tripId: activeTrip.id,
              activityId: londonActivities[0].id, 
              date: tomorrow,
              startTime: '14:30',
              endTime: '16:00'
            }
          ]
        });
      }
    }
  }

  if (store.bookings.size === 0) {
    console.log('🚀 Seeding booking mock data...');
    const nycActivities = Array.from(store.activities.values()).filter(a => {
      const city = store.cities.get(a.cityId);
      return city?.name === 'New York';
    });
    const laDrivers = Array.from(store.drivers.values()).filter(d => {
      const city = store.cities.get(d.cityId);
      return city?.name === 'Los Angeles';
    });

    if (nycActivities.length > 0) {
      bookingStore.create({
        userId: 'user_2mVaS6v7mP9CP9LF0mSd0MLND9v',
        type: 'ACTIVITY',
        referenceId: nycActivities[0].id,
        date: new Date().toISOString(),
        status: 'confirmed',
        price: nycActivities[0].price || 0,
        currency: nycActivities[0].currency || 'USD',
      });
    }

    if (laDrivers.length > 0) {
      bookingStore.create({
        userId: 'user_demo_123',
        type: 'DRIVER',
        referenceId: laDrivers[0].id,
        date: new Date(Date.now() - 86400000).toISOString(),
        status: 'confirmed',
        price: laDrivers[0].pricePerDay || 0,
        currency: 'USD',
      });
    }
  }

  console.log('✅ Mock data sync complete');
}

// Seed on module load
seedMockData();

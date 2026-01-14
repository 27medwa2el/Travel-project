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
  CityEvent,
  CityCar,
  CityTourGuide,
  CityApplication,
  CityTip,
  CityDocument,
  CityRecommendedItem,
  AppSettings,
  CityEventInput,
  CityCarInput,
  CityTourGuideInput,
  CityApplicationInput,
  CityTipInput,
  CityDocumentInput,
  CityRecommendedItemInput,
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
    events: Map<string, CityEvent>;
    cars: Map<string, CityCar>;
    tourGuides: Map<string, CityTourGuide>;
    applications: Map<string, CityApplication>;
    tips: Map<string, CityTip>;
    documents: Map<string, CityDocument>;
    items: Map<string, CityRecommendedItem>;
    settings: AppSettings;
  }
};

const store = globalForStore.store || {
  countries: new Map<string, Country>(),
  cities: new Map<string, City>(),
  activities: new Map<string, Activity>(),
  drivers: new Map<string, Driver>(),
  trips: new Map<string, Trip>(),
  bookings: new Map<string, Booking>(),
  events: new Map<string, CityEvent>(),
  cars: new Map<string, CityCar>(),
  tourGuides: new Map<string, CityTourGuide>(),
  applications: new Map<string, CityApplication>(),
  tips: new Map<string, CityTip>(),
  documents: new Map<string, CityDocument>(),
  items: new Map<string, CityRecommendedItem>(),
  settings: {
    standardCityPrice: 250,
    currency: 'USD'
  }
};

// Ensure all expected Maps exist (handles case where store was partially initialized in a previous session)
if (!store.countries) store.countries = new Map();
if (!store.cities) store.cities = new Map();
if (!store.activities) store.activities = new Map();
if (!store.drivers) store.drivers = new Map();
if (!store.trips) store.trips = new Map();
if (!store.bookings) store.bookings = new Map();
if (!store.events) store.events = new Map();
if (!store.cars) store.cars = new Map();
if (!store.tourGuides) store.tourGuides = new Map();
if (!store.applications) store.applications = new Map();
if (!store.tips) store.tips = new Map();
if (!store.documents) store.documents = new Map();
if (!store.items) store.items = new Map();
if (!store.settings) store.settings = { standardCityPrice: 250, currency: 'USD' };

if (process.env.NODE_ENV !== 'production') {
  globalForStore.store = store;
}

// Helper to generate a unique ID
const generateId = (prefix?: string) => {
  if (prefix) return prefix.toLowerCase().replace(/\s+/g, '-');
  return Math.random().toString(36).substring(2, 11);
};

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
      id: generateId(input.code), // Use country code as ID for stability
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
      id: generateId(input.name), // Use city name as ID for stability
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
      id: generateId(input.title), // Use title as ID for stability
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

// ============= EVENTS =============

export const eventStore = {
  getAll(): CityEvent[] {
    return Array.from(store.events.values());
  },

  getById(id: string): CityEvent | undefined {
    return store.events.get(id);
  },

  getByCityId(cityId: string): CityEvent[] {
    return Array.from(store.events.values()).filter(
      (e) => e.cityId === cityId
    );
  },

  create(input: CityEventInput): CityEvent {
    const event: CityEvent = {
      id: generateId(input.title), // Use title as ID for stability
      ...input,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    store.events.set(event.id, event);
    return event;
  },

  update(id: string, input: Partial<CityEventInput>): CityEvent | null {
    const existing = store.events.get(id);
    if (!existing) return null;

    const updated: CityEvent = {
      ...existing,
      ...input,
      updatedAt: timestamp(),
    };
    store.events.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return store.events.delete(id);
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
      createdAt: existing.createdAt, // Preserve createdAt
    };
    store.drivers.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return store.drivers.delete(id);
  },
};

// ============= SETTINGS =============
export const settingsStore = {
  get(): AppSettings {
    return store.settings;
  },
  update(input: Partial<AppSettings>): AppSettings {
    store.settings = { ...store.settings, ...input };
    return store.settings;
  }
};

// ============= TRIPS =============

export const tripStore = {
  getAll(): Trip[] {
    return Array.from(store.trips.values());
  },

  getById(id: string): Trip | undefined {
    return store.trips.get(id);
  },

  getByUserId(userId: string): Trip[] {
    return Array.from(store.trips.values()).filter(
      (t) => t.userId === userId
    );
  },

  create(input: Omit<Trip, 'id' | 'createdAt' | 'updatedAt' | 'progress'>): Trip {
    const trip: Trip = {
      id: generateId(),
      ...input,
      progress: 0,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    store.trips.set(trip.id, trip);
    return trip;
  },

  update(id: string, input: Partial<Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>>): Trip | null {
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

// ============= CARS =============
export const carStore = {
  getAll(): CityCar[] {
    return Array.from(store.cars.values());
  },
  getById(id: string): CityCar | undefined {
    return store.cars.get(id);
  },
  getByCityId(cityId: string): CityCar[] {
    return Array.from(store.cars.values()).filter(c => c.cityId === cityId);
  },
  create(input: CityCarInput): CityCar {
    const car = { id: generateId(input.name), ...input };
    store.cars.set(car.id, car);
    return car;
  },
  update(id: string, input: Partial<CityCarInput>): CityCar | null {
    const existing = store.cars.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input };
    store.cars.set(id, updated);
    return updated;
  },
  delete(id: string): boolean {
    return store.cars.delete(id);
  }
};

// ============= TOUR GUIDES =============
export const tourGuideStore = {
  getAll(): CityTourGuide[] {
    return Array.from(store.tourGuides.values());
  },
  getById(id: string): CityTourGuide | undefined {
    return store.tourGuides.get(id);
  },
  getByCityId(cityId: string): CityTourGuide[] {
    return Array.from(store.tourGuides.values()).filter(tg => tg.cityId === cityId);
  },
  create(input: CityTourGuideInput): CityTourGuide {
    const guide = { id: generateId(input.name), ...input };
    store.tourGuides.set(guide.id, guide);
    return guide;
  },
  update(id: string, input: Partial<CityTourGuideInput>): CityTourGuide | null {
    const existing = store.tourGuides.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input };
    store.tourGuides.set(id, updated);
    return updated;
  },
  delete(id: string): boolean {
    return store.tourGuides.delete(id);
  }
};

// ============= APPLICATIONS =============
export const applicationStore = {
  getAll(): CityApplication[] {
    return Array.from(store.applications.values());
  },
  getById(id: string): CityApplication | undefined {
    return store.applications.get(id);
  },
  getByCityId(cityId: string): CityApplication[] {
    return Array.from(store.applications.values()).filter(app => app.cityId === cityId);
  },
  create(input: CityApplicationInput): CityApplication {
    const app = { id: generateId(input.name), ...input };
    store.applications.set(app.id, app);
    return app;
  },
  update(id: string, input: Partial<CityApplicationInput>): CityApplication | null {
    const existing = store.applications.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input };
    store.applications.set(id, updated);
    return updated;
  },
  delete(id: string): boolean {
    return store.applications.delete(id);
  }
};

// ============= TIPS =============
export const tipStore = {
  getAll(): CityTip[] {
    return Array.from(store.tips.values());
  },
  getById(id: string): CityTip | undefined {
    return store.tips.get(id);
  },
  getByCityId(cityId: string): CityTip[] {
    return Array.from(store.tips.values()).filter(tip => tip.cityId === cityId);
  },
  create(input: CityTipInput): CityTip {
    const tip = { id: generateId(), ...input };
    store.tips.set(tip.id, tip);
    return tip;
  },
  update(id: string, input: Partial<CityTipInput>): CityTip | null {
    const existing = store.tips.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input };
    store.tips.set(id, updated);
    return updated;
  },
  delete(id: string): boolean {
    return store.tips.delete(id);
  }
};

// ============= DOCUMENTS =============
export const documentStore = {
  getAll(): CityDocument[] {
    return Array.from(store.documents.values());
  },
  getById(id: string): CityDocument | undefined {
    return store.documents.get(id);
  },
  getByCityId(cityId: string): CityDocument[] {
    return Array.from(store.documents.values()).filter(doc => doc.cityId === cityId);
  },
  create(input: CityDocumentInput): CityDocument {
    const doc = { id: generateId(input.name), ...input };
    store.documents.set(doc.id, doc);
    return doc;
  },
  update(id: string, input: Partial<CityDocumentInput>): CityDocument | null {
    const existing = store.documents.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input };
    store.documents.set(id, updated);
    return updated;
  },
  delete(id: string): boolean {
    return store.documents.delete(id);
  }
};

// ============= ITEMS =============
export const itemStore = {
  getAll(): CityRecommendedItem[] {
    return Array.from(store.items.values());
  },
  getById(id: string): CityRecommendedItem | undefined {
    return store.items.get(id);
  },
  getByCityId(cityId: string): CityRecommendedItem[] {
    return Array.from(store.items.values()).filter(item => item.cityId === cityId);
  },
  create(input: CityRecommendedItemInput): CityRecommendedItem {
    const item = { id: generateId(input.name), ...input };
    store.items.set(item.id, item);
    return item;
  },
  update(id: string, input: Partial<CityRecommendedItemInput>): CityRecommendedItem | null {
    const existing = store.items.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input };
    store.items.set(id, updated);
    return updated;
  },
  delete(id: string): boolean {
    return store.items.delete(id);
  }
};

// ============= SEED DATA =============

export function seedMockData() {
  // Always clear and re-seed in development to ensure stable IDs if IDs are random
  // Or check if core countries use the new stable ID format (e.g. 'us')
  const hasStableIds = store.countries.has('us') || store.countries.has('gb');
  
  if (!hasStableIds) {
    console.log('🚀 Seeding with stable IDs...');
    store.countries.clear();
    store.cities.clear();
    store.activities.clear();
    store.events.clear();
    
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

  if (store.cities.size === 0) {
    console.log('🚀 Seeding core mock data...');
    const countries = countryStore.getAll();
    const usa = countries.find(c => c.code === 'US');
    const uk = countries.find(c => c.code === 'GB');
    const france = countries.find(c => c.code === 'FR');
    const uae = countries.find(c => c.code === 'AE');
    const japan = countries.find(c => c.code === 'JP');

    if (usa && uk && france && uae && japan) {
      // --- NEW YORK ---
      const nyc = cityStore.create({ 
        countryId: usa.id, name: 'New York', lat: 40.7128, lng: -74.0060,
        images: ['https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80']
      });
      tipStore.create({ cityId: nyc.id, content: 'Tipping 20% is standard in restaurants and bars.' });
      tipStore.create({ cityId: nyc.id, content: 'The subway is the fastest way to get around Manhattan.' });
      
      documentStore.create({ 
        cityId: nyc.id, name: 'Valid Passport & ESTA/Visa',
        exampleUrl: 'https://www.cbp.gov/sites/default/files/assets/documents/2019-Dec/esta-sample-application.pdf'
      });
      
      itemStore.create({ 
        cityId: nyc.id, name: 'Comfortable Walking Shoes',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80'
      });
      itemStore.create({ 
        cityId: nyc.id, name: 'Portable Power Bank',
        imageUrl: 'https://images.unsplash.com/photo-1609592424109-dd0886007ec8?auto=format&fit=crop&w=400&q=80'
      });
      applicationStore.create({
        cityId: nyc.id, name: 'NYC Subway Guide', description: 'Real-time train arrivals.', 
        iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/4c/7c/7c/4c7c7c7c-7c7c-7c7c-7c7c-7c7c7c7c7c7c/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
        androidLink: '#', iphoneLink: '#'
      });

      // --- LONDON ---
      const london = cityStore.create({ 
        countryId: uk.id, name: 'London', lat: 51.5074, lng: -0.1278,
        images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80']
      });
      tipStore.create({ cityId: london.id, content: 'Stand on the right on Tube escalators.' });
      tipStore.create({ cityId: london.id, content: 'Pack an umbrella—the weather changes fast.' });
      
      documentStore.create({ 
        cityId: london.id, name: 'UK Standard Visitor Visa',
        exampleUrl: 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/957305/visitor-visa-guide.pdf'
      });
      
      itemStore.create({ 
        cityId: london.id, name: 'Sturdy Umbrella',
        imageUrl: 'https://images.unsplash.com/photo-1543069110-6f03d2bbc290?auto=format&fit=crop&w=400&q=80'
      });
      itemStore.create({ 
        cityId: london.id, name: 'Universal Power Adapter',
        imageUrl: 'https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&w=400&q=80'
      });
      applicationStore.create({
        cityId: london.id, name: 'Citymapper', description: 'Ultimate transport app.', 
        iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/4b/9a/9a/4b9a9a9a-9a9a-9a9a-9a9a-9a9a9a9a9a9a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
        androidLink: '#', iphoneLink: '#'
      });

      // --- PARIS ---
      const paris = cityStore.create({ 
        countryId: france.id, name: 'Paris', lat: 48.8566, lng: 2.3522,
        images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80']
      });
      tipStore.create({ cityId: paris.id, content: 'Learn basic French greetings like "Bonjour" and "Merci".' });
      tipStore.create({ cityId: paris.id, content: 'Validate your RER/Metro tickets before boarding.' });
      documentStore.create({ cityId: paris.id, name: 'Schengen Visa (if required)' });
      itemStore.create({ cityId: paris.id, name: 'Stylish but comfortable footwear' });
      applicationStore.create({
        cityId: paris.id, name: 'Bonjour RATP', description: 'Paris Metro & Bus guide.', 
        iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/ce/2a/ec/ce2aecba-8a1a-8a1a-8a1a-8a1a8a1a8a1a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
        androidLink: '#', iphoneLink: '#'
      });

      // --- DUBAI ---
      const dubai = cityStore.create({ 
        countryId: uae.id, name: 'Dubai', lat: 25.2048, lng: 55.2708,
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80']
      });
      tipStore.create({ cityId: dubai.id, content: 'Dress modestly in public malls and cultural sites.' });
      tipStore.create({ cityId: dubai.id, content: 'Friday is a holy day; some shops open later.' });
      documentStore.create({ cityId: dubai.id, name: 'UAE Tourist Visa' });
      itemStore.create({ cityId: dubai.id, name: 'Sun Protection & Light Linen Clothing' });
      applicationStore.create({
        cityId: dubai.id, name: 'Careem', description: 'Ride hailing and delivery.', 
        iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/6b/9a/9a/6b9a9a9a-9a9a-9a9a-9a9a-9a9a9a9a9a9a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
        androidLink: '#', iphoneLink: '#'
      });

      // --- TOKYO ---
      const tokyo = cityStore.create({ 
        countryId: japan.id, name: 'Tokyo', lat: 35.6762, lng: 139.6503,
        images: ['https://images.unsplash.com/photo-1540959733332-e94e270b4d82?auto=format&fit=crop&w=1200&q=80']
      });
      tipStore.create({ cityId: tokyo.id, content: 'No tipping is required in Japan; it can be seen as rude.' });
      tipStore.create({ cityId: tokyo.id, content: 'Carry a trash bag; public bins are rare.' });
      documentStore.create({ cityId: tokyo.id, name: 'Japan Tourist Visa' });
      itemStore.create({ cityId: tokyo.id, name: 'Suica or Pasmo IC Card' });
      applicationStore.create({
        cityId: tokyo.id, name: 'Japan Travel by NAVITIME', description: 'Best for train routes.', 
        iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/2b/8a/8a/2b8a8a8a-8a8a-8a8a-8a8a-8a8a8a8a8a8a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
        androidLink: '#', iphoneLink: '#'
      });

      // Activities, Drivers, etc.
      activityStore.create({ cityId: nyc.id, title: 'Statue of Liberty Tour', price: 45, lat: 40.6892, lng: -74.0445, tags: ['landmark', 'history'], bookingUrl: 'https://www.getyourguide.com' });
      activityStore.create({ cityId: nyc.id, title: 'Central Park Bike Tour', price: 35, lat: 40.7812, lng: -73.9665, tags: ['outdoor', 'family'], bookingUrl: 'https://www.viator.com' });
      
      activityStore.create({ cityId: london.id, title: 'London Eye Flight', price: 30, lat: 51.5033, lng: -0.1195, tags: ['landmark', 'views'], bookingUrl: 'https://www.londoneye.com' });
      activityStore.create({ cityId: london.id, title: 'Tower of London', price: 35, lat: 51.5081, lng: -0.0759, tags: ['history', 'landmark'], bookingUrl: 'https://www.hrp.org.uk' });
      
      activityStore.create({ cityId: paris.id, title: 'Eiffel Tower Summit', price: 60, lat: 48.8584, lng: 2.2945, tags: ['landmark', 'views'], bookingUrl: 'https://www.toureiffel.paris' });
      activityStore.create({ cityId: paris.id, title: 'Louvre Museum Tour', price: 50, lat: 48.8606, lng: 2.3376, tags: ['art', 'museum'], bookingUrl: 'https://www.louvre.fr' });
      
      activityStore.create({ cityId: dubai.id, title: 'Burj Khalifa Top', price: 45, lat: 25.1972, lng: 55.2744, tags: ['landmark', 'views'], bookingUrl: 'https://www.burjkhalifa.ae' });
      activityStore.create({ cityId: dubai.id, title: 'Desert Safari Adventure', price: 75, lat: 25.0500, lng: 55.4500, tags: ['adventure', 'desert'], bookingUrl: 'https://www.desertsafari.ae' });
      
      activityStore.create({ cityId: tokyo.id, title: 'Shibuya Crossing Experience', price: 0, lat: 35.6595, lng: 139.7005, tags: ['landmark', 'street'], bookingUrl: '#' });
      activityStore.create({ cityId: tokyo.id, title: 'Senso-ji Temple Visit', price: 0, lat: 35.7148, lng: 139.7967, tags: ['culture', 'temple'], bookingUrl: '#' });
      
      // Drivers
      driverStore.create({ cityId: nyc.id, name: 'John Smith', vehicleType: 'sedan', pricePerDay: 150, rating: 4.9, contactInfo: '+1-212-555-0101' });
      driverStore.create({ cityId: london.id, name: 'James Wilson', vehicleType: 'luxury', pricePerDay: 200, rating: 4.8, contactInfo: '+44-20-7946-0404' });
      driverStore.create({ cityId: paris.id, name: 'Jean Pierre', vehicleType: 'sedan', pricePerDay: 180, rating: 4.7, contactInfo: '+33-1-42-66-00-00' });
      driverStore.create({ cityId: dubai.id, name: 'Ahmed Ali', vehicleType: 'luxury', pricePerDay: 300, rating: 5.0, contactInfo: '+971-4-222-3333' });
      driverStore.create({ cityId: tokyo.id, name: 'Kenji Tanaka', vehicleType: 'van', pricePerDay: 250, rating: 4.9, contactInfo: '+81-3-3456-7890' });

      // Tour Guides
      tourGuideStore.create({ cityId: nyc.id, name: 'Sarah Jenkins', bio: 'Architecture expert.', languages: ['English'], pricePerHour: 50, rating: 4.9, contactInfo: 'sarah@nycguides.com', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' });
      tourGuideStore.create({ cityId: dubai.id, name: 'Zaid Khalid', bio: 'Expert in Arabian history.', languages: ['Arabic', 'English'], pricePerHour: 80, rating: 5.0, contactInfo: 'zaid@dubaiguides.ae', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' });

      // Cars
      carStore.create({ cityId: dubai.id, name: 'Lamborghini Huracan', type: 'Supercar', pricePerDay: 1200, transmission: 'Automatic', fuel: 'Petrol', contactInfo: 'rentals@dubaisupercars.ae', imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80' });
      carStore.create({ cityId: london.id, name: 'Mini Cooper S', type: 'Compact', pricePerDay: 85, transmission: 'Manual', fuel: 'Petrol', contactInfo: 'rentals@londoncars.co.uk', imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80' });
    }
  }

  if (store.trips.size === 0) {
    console.log('🚀 Seeding trip mock data...');
    const nyc = Array.from(store.cities.values()).find(c => c.name === 'New York');
    const london = Array.from(store.cities.values()).find(c => c.name === 'London');

    if (nyc) {
      tripStore.create({
        userId: 'user_demo_123',
        title: 'Summer in NYC',
        startDate: '2026-07-15',
        endDate: '2026-07-22',
        status: 'upcoming',
        countryId: nyc.countryId,
        cities: [
          {
            id: 'tc-1',
            cityId: nyc.id,
            startDate: '2026-07-15',
            endDate: '2026-07-22',
            items: [
              { id: 'ti-1', type: 'ACTIVITY', referenceId: 'statue-of-liberty-tour', date: '2026-07-16' },
              { id: 'ti-2', type: 'ACTIVITY', referenceId: 'central-park-bike-tour', date: '2026-07-17' }
            ]
          }
        ]
      });
    }

    if (london) {
      tripStore.create({
        userId: 'user_demo_123',
        title: 'Winter in London',
        startDate: '2026-01-10',
        endDate: '2026-01-25',
        status: 'active',
        countryId: london.countryId,
        cities: [
          {
            id: 'tc-2',
            cityId: london.id,
            startDate: '2026-01-10',
            endDate: '2026-01-25',
            items: [
              { id: 'ti-3', type: 'ACTIVITY', referenceId: 'london-eye-flight', date: '2026-01-12' },
              { id: 'ti-4', type: 'ACTIVITY', referenceId: 'tower-of-london', date: '2026-01-14' }
            ]
          }
        ]
      });
    }
  }

  if (store.bookings.size === 0) {
    console.log('🚀 Seeding booking mock data...');
    const nycActivities = Array.from(store.activities.values()).filter(a => {
      const city = store.cities.get(a.cityId);
      return city?.name === 'New York';
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
  }

  console.log('✅ Mock data sync complete');
}

// Seed on module load
seedMockData();

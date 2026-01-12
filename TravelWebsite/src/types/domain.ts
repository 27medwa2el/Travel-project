/**
 * Phase B: Domain Types for Admin CRUD
 * 
 * These types define the data model for:
 * - Countries
 * - Cities (belongs to Country)
 * - Activities (belongs to City)
 * - Drivers (belongs to City)
 * 
 * Note: These will later map to Prisma models when DB is integrated.
 */

export interface Country {
  id: string;
  name: string;
  code?: string; // ISO country code (e.g., "US", "CA", "UK")
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: string;
  countryId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  cityId: string;
  title: string;
  description?: string;
  price?: number;
  currency?: string; // e.g., "USD", "CAD", "EUR"
  lat: number;
  lng: number;
  images?: string[]; // Array of image URLs
  tags?: string[]; // e.g., ["adventure", "family", "outdoor"]
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  cityId: string;
  name: string;
  phone?: string;
  pricePerDay?: number;
  vehicleType?: string; // e.g., "sedan", "suv", "van"
  rating?: number; // 1-5
  createdAt: string;
  updatedAt: string;
}

// Input types (for create/update operations - without id/timestamps)
export type CountryInput = Omit<Country, 'id' | 'createdAt' | 'updatedAt'>;
export type CityInput = Omit<City, 'id' | 'createdAt' | 'updatedAt'>;
export type ActivityInput = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>;
export type DriverInput = Omit<Driver, 'id' | 'createdAt' | 'updatedAt'>;

// Aggregate types (for public API with joined data)
export interface ActivityWithLocation extends Activity {
  cityName: string;
  countryName: string;
  countryCode?: string;
}

export interface DriverWithLocation extends Driver {
  cityName: string;
  countryName: string;
}

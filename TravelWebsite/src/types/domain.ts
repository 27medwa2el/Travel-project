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
  continent?: string; // e.g., "Asia", "Europe", "Africa"
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: string;
  countryId: string;
  name: string;
  lat: number;
  lng: number;
  images?: string[];
  timezone?: string;
  currency?: string;
  language?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CityTip {
  id: string;
  cityId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CityDocument {
  id: string;
  cityId: string;
  name: string;
  exampleUrl?: string; // Added for optional document example
  createdAt: string;
  updatedAt: string;
}

export interface CityRecommendedItem {
  id: string;
  cityId: string;
  name: string;
  imageUrl?: string; // Added for optional item photo
  createdAt: string;
  updatedAt: string;
}

export interface CityEvent {
  id: string;
  cityId: string;
  title: string;
  description: string;
  date: string;
  location: string;
  lat: number; // Added for map
  lng: number; // Added for map
  imageUrl?: string;
  bookingUrl?: string; // Added for external booking
  createdAt: string;
  updatedAt: string;
}

export interface CityCar {
  id: string;
  cityId: string;
  name: string;
  type: string;
  pricePerDay: number;
  transmission: string;
  fuel: string;
  contactInfo?: string; // Added
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CityTourGuide {
  id: string;
  cityId: string;
  name: string;
  bio: string;
  languages: string[];
  pricePerHour: number;
  rating: number;
  contactInfo?: string; // Added
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CityApplication {
  id: string;
  cityId: string; // Added for standalone management
  name: string;
  description: string;
  iconUrl?: string; // Added for app icon
  androidLink?: string;
  iphoneLink?: string;
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
  bookingUrl?: string; // Added for external booking
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  cityId: string;
  name: string;
  phone?: string;
  contactInfo?: string; // Standardizing
  pricePerDay?: number;
  vehicleType?: string; // e.g., "sedan", "suv", "van"
  rating?: number; // 1-5
  createdAt: string;
  updatedAt: string;
}

export interface PackingItem {
  id: string;
  title: string;
  isPacked: boolean;
  category: 'Essentials' | 'Clothing' | 'Electronics' | 'Documents' | 'Other';
}

export interface TripPackingItem {
  id: string;
  tripId: string;
  cityId?: string;
  title: string;
  description?: string;
  category: 'document' | 'product' | 'app' | 'custom';
  isPacked: boolean;
  referenceId?: string; // ID of the source document/item/app
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  progress: number;
  countryId: string; // The primary country for the trip
  cities: TripCity[]; // Multi-city support
  packingList: TripPackingItem[];
  createdAt: string;
  updatedAt: string;
}

export interface TripCity {
  id: string;
  cityId: string;
  startDate: string;
  endDate: string;
  items: TripItem[]; // Day-by-day items
}

export interface TripItem {
  id: string;
  type: 'ACTIVITY' | 'EVENT';
  referenceId: string; // activityId or eventId
  date: string; // The specific day assigned
  startTime?: string;
  endTime?: string;
}

export interface AppSettings {
  standardCityPrice: number;
  currency: string;
}

export interface Booking {
  id: string;
  userId: string;
  type: 'ACTIVITY' | 'DRIVER';
  referenceId: string; // activityId or driverId
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

// Input types (for create/update operations - without id/timestamps)
export type CountryInput = Omit<Country, 'id' | 'createdAt' | 'updatedAt'>;
export type CityInput = Omit<City, 'id' | 'createdAt' | 'updatedAt'>;
export type ActivityInput = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>;
export type DriverInput = Omit<Driver, 'id' | 'createdAt' | 'updatedAt'>;
export type TripInput = Omit<Trip, 'id' | 'createdAt' | 'updatedAt' | 'packingList' | 'progress'>;
export type BookingInput = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
export type CityEventInput = Omit<CityEvent, 'id' | 'createdAt' | 'updatedAt'>;
export type CityCarInput = Omit<CityCar, 'id' | 'createdAt' | 'updatedAt'>;
export type CityTourGuideInput = Omit<CityTourGuide, 'id' | 'createdAt' | 'updatedAt'>;
export type CityApplicationInput = Omit<CityApplication, 'id' | 'createdAt' | 'updatedAt'>;
export type CityTipInput = Omit<CityTip, 'id' | 'createdAt' | 'updatedAt'>;
export type CityDocumentInput = Omit<CityDocument, 'id' | 'createdAt' | 'updatedAt'>;
export type CityRecommendedItemInput = Omit<CityRecommendedItem, 'id' | 'createdAt' | 'updatedAt'>;
export type TripPackingItemInput = Omit<TripPackingItem, 'id' | 'createdAt' | 'updatedAt'>;

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

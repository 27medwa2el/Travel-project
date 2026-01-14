import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon, 
  ShareIcon, 
  MapIcon, 
  CurrencyDollarIcon,
  ChevronDownIcon,
  DevicePhoneMobileIcon,
  QrCodeIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  InformationCircleIcon,
  UserGroupIcon as UserGroupIconOutline,
  IdentificationIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { StarIcon, SparklesIcon, CheckBadgeIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';
import WeatherWidget from '../components/WeatherWidget';
import StatsCard from '../components/StatsCard';
import CityMapView from '../components/CityMapView';
import FlightSearch from '../components/FlightSearch';
import HotelSearch from '../components/HotelSearch';
import Footer from '../components/Footer';
import { ISuggestionFormatted } from '../types/typings';
import { toast } from 'sonner';

import { activityStore, cityStore, countryStore, driverStore, eventStore, carStore, tourGuideStore, applicationStore, tipStore, documentStore, itemStore, tripStore, seedMockData } from '@/lib/mockStore';
import { Activity, City, Country, Driver, CityEvent, CityCar, CityTourGuide, CityApplication, CityTip, CityDocument, CityRecommendedItem, Trip } from '@/types/domain';
import { getAuth } from '@clerk/nextjs/server';

const tabs = [
  'Places', 'Map', 'Events', 'Travel Document', 'Recommended Items', 'Applications',
  'Flight', 'Hotel', 'Cars', 'Drivers', 'Tour Guides', 'Tips'
];

type Props = {
  city: City | null;
  country: Country | null;
  activities: Activity[];
  drivers: Driver[];
  events: CityEvent[];
  cars: CityCar[];
  tourGuides: CityTourGuide[];
  applications: CityApplication[];
  tips: CityTip[];
  documents: CityDocument[];
  recommendedItems: CityRecommendedItem[];
  userTrips: Trip[];
};

const Details = ({ city, country, activities, drivers, events, cars, tourGuides, applications, tips, documents, recommendedItems, userTrips }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Places');
  const [showTripModal, setShowTripModal] = useState(false);
  const [isAddingToTrip, setIsAddingToTrip] = useState(false);

  if (!city) {
    return (
      <div className="bg-[#f8faff] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-gray-900 mb-4">City Not Found</h1>
          <button onClick={() => router.push('/')} className="text-blue-600 font-bold uppercase tracking-widest text-xs">Back to Home</button>
        </div>
      </div>
    );
  }

  const cityName = city.name;
  const countryName = country?.name || 'Global';

  const relevantTrips = userTrips.filter(t => t.countryId === city.countryId && (t.status === 'upcoming' || t.status === 'active'));

  const handleAddToTrip = async (tripId?: string) => {
    if (!tripId) {
      // Start New Trip
      router.push(`/plan?countryId=${city.countryId}&preselect=${city.id}`);
      return;
    }

    // Redirect to Plan page to edit existing trip with this new city
    router.push(`/plan?tripId=${tripId}&preselect=${city.id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#f8faff] min-h-screen"
    >
      <Head>
        <title>{cityName} - Explore City</title>
      </Head>

      <main className="pt-24">
        {/* Full-screen Hero Section */}
        <div className="relative h-[90vh] w-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={city.images?.[0] || "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2000&q=80"}
              alt={cityName}
              fill
              className="object-cover"
              priority
              unoptimized={true}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

          {/* Top Left: Weather Widget */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-10 left-10 z-20"
          >
            <WeatherWidget />
          </motion.div>

          {/* Top Right: Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute top-10 right-10 z-20 flex flex-col gap-4 items-end"
          >
            <div className="flex gap-4">
              <button className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl">
                <HeartIcon className="w-6 h-6" />
              </button>
              <button className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl">
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
            
            <button 
              onClick={() => setShowTripModal(true)}
              className="mt-4 px-10 py-5 bg-[#9333ea] text-white rounded-[25px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-purple-500/40 hover:bg-[#a855f7] hover:scale-105 transition-all flex items-center gap-3"
            >
              <RocketLaunchIcon className="w-5 h-5" /> Book This City
            </button>
          </motion.div>

          {/* Bottom Left: Title and Badges */}
          <div className="absolute bottom-20 left-10 z-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex gap-3 mb-6"
            >
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 text-white text-sm font-bold shadow-lg">
                <MapIcon className="w-4 h-4 text-purple-400" /> {countryName}
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="text-7xl md:text-[12rem] font-black text-white leading-none uppercase tracking-tighter drop-shadow-2xl"
            >
              {cityName}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex gap-4 mt-8 flex-wrap"
            >
              <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-yellow-500/30 text-yellow-400 font-black">
                <StarIcon className="w-5 h-5" /> {activities.length} Places
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-500/30 text-blue-400 font-black uppercase tracking-tighter">
                📍 {city.lat}, {city.lng}
              </div>
              <div className="flex items-center gap-2 bg-purple-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-purple-500/30 text-purple-400 font-black uppercase tracking-tighter">
                <CalendarDaysIcon className="w-5 h-5" /> {city.timezone || 'UTC +0'}
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-green-500/30 text-green-400 font-black uppercase tracking-tighter">
                <CurrencyDollarIcon className="w-5 h-5" /> {city.currency || 'USD'}
              </div>
            </motion.div>
          </div>

          {/* Bottom Right: Stats Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-20 right-10 z-20"
          >
            <StatsCard />
          </motion.div>

          {/* Center Bottom: Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            <p className="text-white font-bold text-xs uppercase tracking-[0.3em] opacity-70">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full" 
              />
            </div>
          </div>
        </div>

        {/* Trip Selection Modal */}
        <AnimatePresence>
          {showTripModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTripModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[50px] shadow-2xl overflow-hidden p-12"
              >
                <div className="mb-10 text-center">
                  <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <RocketLaunchIcon className="w-10 h-10 text-purple-600" />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-2">Plan Your Visit to {city.name}</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">How would you like to book this city?</p>
                </div>

                <div className="space-y-4">
                  {/* Option: Start New Trip */}
                  <button 
                    onClick={() => handleAddToTrip()}
                    className="w-full p-8 rounded-[35px] border-2 border-[#9333ea] bg-purple-50/30 flex items-center justify-between group hover:bg-[#9333ea] transition-all"
                  >
                    <div className="text-left">
                      <h3 className="text-xl font-black text-[#9333ea] uppercase tracking-tight group-hover:text-white transition-colors">Start New Journey</h3>
                      <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest group-hover:text-purple-100 transition-colors">Create a fresh itinerary for {countryName}</p>
                    </div>
                    <PlusIcon className="w-8 h-8 text-[#9333ea] group-hover:text-white transition-colors" />
                  </button>

                  {/* Section: Existing Trips */}
                  {relevantTrips.length > 0 && (
                    <div className="pt-6 space-y-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-4">Add to Existing Trip</p>
                      {relevantTrips.map(trip => (
                        <button 
                          key={trip.id}
                          disabled={isAddingToTrip}
                          onClick={() => handleAddToTrip(trip.id)}
                          className="w-full p-6 rounded-[30px] border-2 border-gray-100 flex items-center justify-between hover:border-purple-200 hover:bg-purple-50/20 transition-all disabled:opacity-50"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                              <CalendarDaysIcon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">{trip.title}</h4>
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{trip.startDate} — {trip.endDate}</p>
                            </div>
                          </div>
                          <ChevronDownIcon className="w-6 h-6 text-gray-300 -rotate-90" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setShowTripModal(false)}
                  className="mt-10 w-full text-center text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
                >
                  Maybe later
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="sticky top-[68px] z-40 bg-white border-b border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-10 flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-6 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab 
                    ? 'border-[#9333ea] text-[#9333ea]' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Based on Tab */}
        <div className="max-w-7xl mx-auto py-20 px-10">
          <AnimatePresence mode="wait">
            {activeTab === 'Places' && (
              <motion.div 
                key="places"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                {activities.length > 0 ? activities.map((activity, i) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 bg-white cursor-pointer"
                  >
                    <Image
                      src={activity.images?.[0] || "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1000&q=80"}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 flex gap-2">
                      {activity.tags?.map(tag => (
                        <span key={tag} className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                    <div className="absolute bottom-10 left-10 right-10 text-white">
                      <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter">{activity.title}</h3>
                      <p className="text-gray-200 font-medium leading-relaxed line-clamp-2">
                        {activity.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-2xl font-black">{activity.price} {activity.currency}</span>
                        <div className="flex gap-4">
                          {activity.bookingUrl ? (
                            <a 
                              href={activity.bookingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-gray-900 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-all shadow-xl flex items-center gap-2"
                            >
                              <ShoppingBagIcon className="w-4 h-4" /> Book Tickets
                            </a>
                          ) : (
                            <button 
                              onClick={() => router.push(`/checkout?type=activity&id=${activity.id}`)}
                              className="bg-white text-gray-900 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                            >
                              Book Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-2 py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                    <p className="text-gray-400 font-bold uppercase tracking-widest">No places added for this city yet.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'Events' && (
              <motion.div 
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {events.length > 0 ? events.map((event, i) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-50 flex flex-col group hover:scale-[1.02] transition-all"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl">
                        <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">{event.title}</h3>
                      <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MapIcon className="w-3 h-3" /> {event.location}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">{event.description}</p>
                      <button className="w-full py-4 bg-purple-50 text-purple-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all">Interested</button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                    <CalendarDaysIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No upcoming events scheduled.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'Travel Document' && (
              <motion.div 
                key="documents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-50">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Required Documents</h3>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Essential travel papers for {cityName}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {documents && documents.length > 0 ? documents.map((doc, i) => (
                      <motion.div 
                        key={doc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <CheckBadgeIcon className="w-6 h-6 text-green-500" />
                          <span className="text-sm font-black text-gray-700 uppercase tracking-tight">{doc.name}</span>
                        </div>
                        {doc.exampleUrl && (
                          <a 
                            href={doc.exampleUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white px-4 py-2 rounded-xl text-[9px] font-black text-blue-600 uppercase tracking-widest border border-blue-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          >
                            View Example
                          </a>
                        )}
                      </motion.div>
                    )) : (
                      <p className="text-center py-10 text-gray-400 font-bold uppercase tracking-widest text-[10px]">Document info coming soon.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Recommended Items' && (
              <motion.div 
                key="items"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-50">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center">
                      <BriefcaseIcon className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Packing Essentials</h3>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Recommended for your trip to {cityName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedItems && recommendedItems.length > 0 ? recommendedItems.map((item, i) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-orange-50/30 rounded-3xl border border-orange-100 group hover:bg-white hover:shadow-xl transition-all"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white border border-orange-100 overflow-hidden flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} className="w-full h-full object-cover" />
                          ) : (
                            <SparklesIcon className="w-6 h-6" />
                          )}
                        </div>
                        <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{item.name}</span>
                      </motion.div>
                    )) : (
                      <p className="col-span-2 text-center py-10 text-gray-400 font-bold uppercase tracking-widest text-[10px]">Recommended items coming soon.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Cars' && (
              <motion.div 
                key="cars"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {cars.length > 0 ? cars.map((car, i) => (
                  <motion.div 
                    key={car.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-50 group hover:scale-[1.02] transition-all"
                  >
                    <div className="h-48 p-6 bg-gray-50">
                      <img src={car.imageUrl} alt={car.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{car.name}</h3>
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-[10px] font-black">${car.pricePerDay}/day</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center">
                          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Type</p>
                          <p className="text-[10px] font-black text-gray-700 uppercase">{car.type}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center">
                          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Transmission</p>
                          <p className="text-[10px] font-black text-gray-700 uppercase">{car.transmission}</p>
                        </div>
                      </div>
                      <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-lg">Rent Now</button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No rental cars available.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'Tour Guides' && (
              <motion.div 
                key="guides"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {tourGuides.length > 0 ? tourGuides.map((guide, i) => (
                  <motion.div 
                    key={guide.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-10 rounded-[50px] shadow-xl border border-gray-50 flex flex-col items-center text-center group"
                  >
                    <div className="w-32 h-32 rounded-[40px] overflow-hidden mb-6 border-4 border-gray-50 group-hover:border-purple-100 transition-all">
                      <img src={guide.imageUrl} alt={guide.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1 uppercase tracking-tighter">{guide.name}</h3>
                    <div className="flex gap-2 mb-4">
                      {guide.languages.map(lang => (
                        <span key={lang} className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{lang}</span>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4 line-clamp-3">{guide.bio}</p>
                    <div className="flex gap-4 w-full">
                      <div className="flex-1 py-4 bg-gray-50 rounded-2xl">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Rating</p>
                        <p className="text-xs font-black text-gray-900">⭐ {guide.rating}</p>
                      </div>
                      <div className="flex-1 py-4 bg-gray-50 rounded-2xl">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                        <p className="text-xs font-black text-gray-900">${guide.pricePerHour}/hr</p>
                      </div>
                    </div>
                    <button className="w-full mt-6 py-4 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-700 transition-all shadow-lg">Hire Guide</button>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No licensed tour guides found.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'Tips' && (
              <motion.div 
                key="tips"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {tips && tips.length > 0 ? tips.map((tip, i) => (
                  <motion.div 
                    key={tip.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 rounded-[40px] shadow-lg border border-gray-50 flex gap-6 group hover:border-purple-200 transition-all"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-all">
                      <ChatBubbleLeftRightIcon className="w-7 h-7 text-purple-600 group-hover:text-white transition-all" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-sm leading-relaxed tracking-tight">{tip.content}</p>
                      <p className="mt-2 text-[10px] font-black text-purple-400 uppercase tracking-widest">Travel Advice</p>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-2 py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                    <InformationCircleIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No local tips shared yet.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'Applications' && (
              <motion.div 
                key="applications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {applications && applications.length > 0 ? applications.map((app, i) => (
                  <motion.div 
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-10 rounded-[50px] shadow-2xl border border-gray-50 flex flex-col items-center text-center group hover:shadow-[#9333ea20] hover:border-purple-100 transition-all duration-500"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-[30px] flex items-center justify-center mb-8 shadow-2xl shadow-purple-200 group-hover:rotate-6 transition-transform duration-500 overflow-hidden border-4 border-white">
                      {app.iconUrl ? (
                        <img src={app.iconUrl} alt={app.name} className="w-full h-full object-cover" />
                      ) : (
                        <QrCodeIcon className="w-12 h-12 text-white" />
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">{app.name}</h3>
                    <p className="text-gray-400 font-bold text-sm leading-relaxed mb-10 px-4">
                      {app.description}
                    </p>

                    <div className="flex gap-4 w-full mt-auto">
                      {app.iphoneLink && (
                        <a 
                          href={app.iphoneLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all group/btn"
                        >
                          <DevicePhoneMobileIcon className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest">iPhone</span>
                        </a>
                      )}
                      {app.androidLink && (
                        <a 
                          href={app.androidLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-purple-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-700 transition-all group/btn"
                        >
                          <DevicePhoneMobileIcon className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Android</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-32 text-center border-4 border-dashed border-gray-100 rounded-[60px] flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                      <DevicePhoneMobileIcon className="w-10 h-10 text-gray-200" />
                    </div>
                    <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-sm">Official apps coming soon for {cityName}</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'Map' && (
              <motion.div 
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-[700px]"
              >
                <CityMapView 
                  activities={activities} 
                  center={{ 
                    lat: city.lat, 
                    lng: city.lng 
                  }} 
                />
              </motion.div>
            )}

            {activeTab === 'Flight' && (
              <motion.div 
                key="flight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <FlightSearch destinationCity={city.name} />
              </motion.div>
            )}

            {activeTab === 'Hotel' && (
              <motion.div 
                key="hotel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <HotelSearch cityId={city.id} cityName={city.name} />
              </motion.div>
            )}
            
            {activeTab === 'Drivers' && (
              <motion.div 
                key="drivers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {drivers.length > 0 ? drivers.map((driver, i) => (
                  <motion.div 
                    key={driver.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:scale-[1.02] transition-all"
                  >
                    <div className="w-24 h-24 rounded-full bg-gray-100 mb-6 overflow-hidden border-4 border-gray-50 group-hover:border-blue-100 transition-all">
                      <Image 
                        src={`https://images.unsplash.com/photo-${1633332755192 + i}-727a05c4013d?auto=format&fit=crop&w=400&q=80`} 
                        alt={driver.name} 
                        width={100} 
                        height={100} 
                        className="object-cover" 
                      />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1 uppercase tracking-tighter">{driver.name}</h3>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-6">{driver.vehicleType} Driver</p>
                    <div className="flex gap-4 mb-8">
                      <div className="bg-blue-50 px-4 py-2 rounded-xl text-blue-600 font-black text-xs">⭐ {driver.rating}</div>
                      <div className="bg-green-50 px-4 py-2 rounded-xl text-green-600 font-black text-xs">${driver.pricePerDay}/day</div>
                    </div>
                    <button 
                      onClick={() => router.push(`/checkout?type=driver&id=${driver.id}`)}
                      className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-lg"
                    >
                      Book Driver
                    </button>
                  </motion.div>
                )) : (
                  <div className="col-span-3 py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                    <p className="text-gray-400 font-bold uppercase tracking-widest">No professional drivers found in this city.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const { userId } = getAuth(context.req);
  
  seedMockData();

  // Find city by ID or by name if ID is a legacy number
  let city = null;
  if (id) {
    city = cityStore.getById(id as string);
    // Fallback for legacy numeric IDs
    if (!city) {
      city = cityStore.getAll().find(c => c.id.startsWith(id as string));
    }
  }

  if (!city) {
    return { props: { city: null, country: null, activities: [], userTrips: [] } };
  }

  const country = countryStore.getById(city.countryId) || null;
  const activities = activityStore.getByCityId(city.id);
  const drivers = driverStore.getByCityId(city.id);
  const events = eventStore.getByCityId(city.id);
  const cars = carStore.getByCityId(city.id);
  const tourGuides = tourGuideStore.getByCityId(city.id);
  const applications = applicationStore.getByCityId(city.id);
  const tips = tipStore.getByCityId(city.id);
  const documents = documentStore.getByCityId(city.id);
  const recommendedItems = itemStore.getByCityId(city.id);
  const userTrips = userId ? tripStore.getByUserId(userId) : [];

  return {
    props: {
      city: JSON.parse(JSON.stringify(city)),
      country: JSON.parse(JSON.stringify(country)),
      activities: JSON.parse(JSON.stringify(activities)),
      drivers: JSON.parse(JSON.stringify(drivers)),
      events: JSON.parse(JSON.stringify(events)),
      cars: JSON.parse(JSON.stringify(cars)),
      tourGuides: JSON.parse(JSON.stringify(tourGuides)),
      applications: JSON.parse(JSON.stringify(applications)),
      tips: JSON.parse(JSON.stringify(tips)),
      documents: JSON.parse(JSON.stringify(documents)),
      recommendedItems: JSON.parse(JSON.stringify(recommendedItems)),
      userTrips: JSON.parse(JSON.stringify(userTrips)),
    },
  };
};

export default Details;

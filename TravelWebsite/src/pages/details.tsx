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
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import WeatherWidget from '../components/WeatherWidget';
import StatsCard from '../components/StatsCard';
import CityMapView from '../components/CityMapView';
import Footer from '../components/Footer';
import { ISuggestionFormatted } from '../types/typings';

import { activityStore, cityStore, countryStore, driverStore } from '@/lib/mockStore';
import { Activity, City, Country, Driver } from '@/types/domain';

const tabs = [
  'Places', 'Map', 'Events', 'Travel Document', 'Recommended Items', 'Applications',
  'Flight', 'Hotel', 'Cars', 'Drivers', 'Tour Guides', 'Tips'
];

type Props = {
  city: City | null;
  country: Country | null;
  activities: Activity[];
  drivers: Driver[];
};

const Details = ({ city, country, activities, drivers }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Places');

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
              src={city.images?.[0] || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80"}
              alt={cityName}
              fill
              className="object-cover"
              priority
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
            className="absolute top-10 right-10 z-20 flex flex-col gap-4"
          >
            <button className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl">
              <HeartIcon className="w-6 h-6" />
            </button>
            <button className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl">
              <ShareIcon className="w-6 h-6" />
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
                📍 {countryName}
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-green-500/30 text-green-400 font-black uppercase tracking-tighter">
                <CurrencyDollarIcon className="w-5 h-5" /> {activities[0]?.currency || 'EUR'}
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
                        <button 
                          onClick={() => router.push(`/checkout?type=activity&id=${activity.id}`)}
                          className="bg-white text-gray-900 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                        >
                          Book Now
                        </button>
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

            {activeTab === 'Map' && (
              <motion.div 
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <CityMapView 
                  activities={activities} 
                  center={{ 
                    lat: activities[0]?.lat || 48.8566, 
                    lng: activities[0]?.lng || 2.3522 
                  }} 
                />
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
    return { props: { city: null, country: null, activities: [] } };
  }

  const country = countryStore.getById(city.countryId) || null;
  const activities = activityStore.getByCityId(city.id);
  const drivers = driverStore.getByCityId(city.id);

  return {
    props: {
      city: JSON.parse(JSON.stringify(city)),
      country: JSON.parse(JSON.stringify(country)),
      activities: JSON.parse(JSON.stringify(activities)),
      drivers: JSON.parse(JSON.stringify(drivers)),
    },
  };
};

export default Details;

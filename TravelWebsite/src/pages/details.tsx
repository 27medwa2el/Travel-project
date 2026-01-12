import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
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
import Footer from '../components/Footer';
import { ISuggestionFormatted } from '../types/typings';

const tabs = [
  'Places', 'Events', 'Travel Document', 'Recommended Items', 'Applications',
  'Flight', 'Hotel', 'Cars', 'Drivers', 'Tour Guides', 'Tips'
];

const Details = () => {
  const router = useRouter();
  const { id, location } = router.query;
  const [activeTab, setActiveTab] = useState('Places');
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<ISuggestionFormatted | null>(null);

  const cityName = location ? (location as string).split(',')[0] : 'Paris';
  const countryName = location ? (location as string).split(',')[1]?.trim() : 'France';

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <Head>
        <title>{cityName} - Explore City</title>
      </Head>

      <main className="pt-24">
        {/* Full-screen Hero Section */}
        <div className="relative h-[90vh] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80"
            alt={cityName}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

          {/* Top Left: Weather Widget */}
          <div className="absolute top-10 left-10 z-20">
            <WeatherWidget />
          </div>

          {/* Top Right: Actions */}
          <div className="absolute top-10 right-10 z-20 flex flex-col gap-4">
            <button className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl">
              <HeartIcon className="w-6 h-6" />
            </button>
            <button className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl">
              <ShareIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Left: Title and Badges */}
          <div className="absolute bottom-20 left-10 z-20">
            <div className="flex gap-3 mb-6">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 text-white text-sm font-bold shadow-lg">
                <MapIcon className="w-4 h-4 text-purple-400" /> {countryName}
              </div>
            </div>
            
            <h1 className="text-[12rem] font-black text-white leading-none uppercase tracking-tighter drop-shadow-2xl">
              {cityName}
            </h1>

            <div className="flex gap-4 mt-8">
              <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-yellow-500/30 text-yellow-400 font-black">
                <StarIcon className="w-5 h-5" /> 2 Places
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-500/30 text-blue-400 font-black uppercase tracking-tighter">
                📍 {countryName}
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-green-500/30 text-green-400 font-black uppercase tracking-tighter">
                <CurrencyDollarIcon className="w-5 h-5" /> EUR
              </div>
            </div>
          </div>

          {/* Bottom Right: Stats Card */}
          <div className="absolute bottom-20 right-10 z-20">
            <StatsCard />
          </div>

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
          <div className="max-w-7xl mx-auto px-10 flex gap-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-6 text-sm font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab 
                    ? 'border-purple-600 text-purple-600' 
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
          {activeTab === 'Places' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Places would be mapped here */}
              <div className="group relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1000&q=80"
                  alt="Place"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Historical Site</span>
                </div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <h3 className="text-4xl font-black mb-4">Arc de Triomphe</h3>
                  <p className="text-gray-200 font-medium leading-relaxed line-clamp-2">
                    The Arc de Triomphe embodies the strength of French history and was built to honor France's soldiers.
                  </p>
                </div>
              </div>

              <div className="group relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80"
                  alt="Place"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Historical Site</span>
                </div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <h3 className="text-4xl font-black mb-4">Eiffel Tower</h3>
                  <p className="text-gray-200 font-medium leading-relaxed line-clamp-2">
                    The Eiffel Tower is the most famous landmark in Paris, known for its stunning panoramic views.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Details;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BuildingOffice2Icon, 
  CalendarIcon, 
  UserGroupIcon,
  MagnifyingGlassIcon,
  StarIcon,
  MapPinIcon,
  XMarkIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import getHotelList from '../utils/getHotelList';
import getCitySuggestions from '../utils/getCitySuggestions';
import { useRouter } from 'next/router';

interface Props {
  cityId: string;
  cityName: string;
}

const HotelSearch = ({ cityId: initialCityId, cityName: initialCityName }: Props) => {
  const router = useRouter();
  
  const [locationQuery, setLocationQuery] = useState(initialCityName);
  const [selectedCity, setSelectedCity] = useState({ id: initialCityId, name: initialCityName });
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
  const [guests, setGuests] = useState('2');
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const suggestionRef = useRef<HTMLDivElement>(null);

  // Autocomplete Logic
  useEffect(() => {
    if (locationQuery.length < 3 || locationQuery === selectedCity.name) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        await getCitySuggestions(locationQuery, (data: any[]) => {
          setSuggestions(data || []);
        });
      } finally {
        setLoadingSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [locationQuery, selectedCity.name]);

  // Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await getHotelList(selectedCity.id, locationQuery, startDate, endDate, guests);
      setHotel(result);
      setHasSearched(true);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Search Header */}
      <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2 relative" ref={suggestionRef}>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Location</label>
            <div className="relative">
              <MapPinIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
              <input 
                type="text" 
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search City"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {locationQuery && (
                <button 
                  onClick={() => { setLocationQuery(''); setSelectedCity({ id: '', name: '' }); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && (suggestions.length > 0 || loadingSuggestions) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
                >
                  {loadingSuggestions ? (
                    <div className="p-6 text-center">
                      <div className="w-6 h-6 border-2 border-purple-100 border-t-purple-600 rounded-full animate-spin mx-auto" />
                    </div>
                  ) : (
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => {
                            setLocationQuery(suggestion.displayName);
                            setSelectedCity({ id: suggestion.id, name: suggestion.shortName });
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-4 transition-all"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <MapPinIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900">{suggestion.shortName}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{suggestion.displayName}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Check In</label>
            <div className="relative">
              <CalendarIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Check Out</label>
            <div className="relative">
              <CalendarIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Guests</label>
            <div className="relative">
              <UserGroupIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
              <select 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} Guests</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSearch}
          disabled={loading || !locationQuery}
          className="w-full mt-10 bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <MagnifyingGlassIcon className="w-5 h-5" />
              Find Real-Time Stays on Wego
            </>
          )}
        </button>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="flex flex-col items-center py-20"
          >
            <div className="relative w-24 h-24 mb-10">
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-blue-100 border-t-blue-600 rounded-full"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-4 bg-blue-500/20 rounded-full flex items-center justify-center"
              >
                <BuildingOffice2Icon className="w-8 h-8 text-blue-600" />
              </motion.div>
            </div>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px]"
            >
              Scanning Global Properties...
            </motion.p>
          </motion.div>
        ) : hasSearched && hotel ? (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1
            }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-2xl group">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"
              />
              <div className="relative bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 flex flex-col items-center text-center overflow-hidden">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full h-64 relative rounded-3xl overflow-hidden mb-8 shadow-inner bg-gray-50"
                >
                  <img 
                    src={hotel.img} 
                    alt={hotel.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-left">
                    <p className="text-white font-black text-2xl uppercase tracking-tighter">{hotel.title}</p>
                    <p className="text-white/80 font-bold text-xs uppercase tracking-widest">{hotel.location}</p>
                  </div>
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
                    <StarIconSolid className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-black text-gray-900">{hotel.star}</span>
                  </div>
                </motion.div>

                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                  Premium Stays in {locationQuery}
                </h3>
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">
                  Live Wego Inventory Accessed • Best Value Guaranteed
                </p>

                <div className="grid grid-cols-2 gap-10 w-full mb-10 border-y border-gray-50 py-8">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Check-in / Out</p>
                    <p className="text-sm font-black text-gray-900">{startDate} — {endDate}</p>
                  </div>
                  <div className="text-center border-l border-gray-50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Room for</p>
                    <p className="text-sm font-black text-blue-600">{guests} Guests</p>
                  </div>
                </div>

                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={hotel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 text-white py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-xs hover:bg-green-600 transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-3"
                >
                  Book Stay on Wego <ChevronRightIcon className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]"
          >
            <BuildingOffice2Icon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Ready to search for live hotel deals</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelSearch;

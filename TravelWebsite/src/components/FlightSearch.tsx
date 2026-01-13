import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PaperAirplaneIcon, 
  CalendarIcon, 
  MapPinIcon, 
  ChevronRightIcon,
  MagnifyingGlassIcon,
  TicketIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { getFlights, Flight } from '../utils/getFlights';
import Image from 'next/image';
import { useRouter } from 'next/router';
import getCitySuggestions from '../utils/getCitySuggestions';

interface Props {
  destinationCity: string;
}

const FlightSearch = ({ destinationCity }: Props) => {
  const router = useRouter();
  const [originQuery, setOriginQuery] = useState('London');
  const [originSuggestions, setOriginSuggestions] = useState<any[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]); // 7 days later
  const [loading, setLoading] = useState(false);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const originRef = useRef<HTMLDivElement>(null);

  // Origin Autocomplete Logic
  useEffect(() => {
    if (originQuery.length < 3) {
      setOriginSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        await getCitySuggestions(originQuery, (suggestions: any[]) => {
          setOriginSuggestions(suggestions || []);
        });
      } finally {
        setLoadingSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [originQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!originQuery) return;
    setLoading(true);
    try {
      const result = await getFlights(originQuery, destinationCity, departureDate, returnDate);
      setFlight(result);
      setHasSearched(true);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Search Header */}
      <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2 relative" ref={originRef}>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">From</label>
            <div className="relative">
              <MapPinIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
              <input 
                type="text" 
                value={originQuery}
                onChange={(e) => {
                  setOriginQuery(e.target.value);
                  setShowOriginSuggestions(true);
                }}
                onFocus={() => setShowOriginSuggestions(true)}
                placeholder="Origin City"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-purple-500 transition-all"
              />
              {originQuery && (
                <button 
                  onClick={() => setOriginQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            <AnimatePresence>
              {showOriginSuggestions && (originSuggestions.length > 0 || loadingSuggestions) && (
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
                      {originSuggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => {
                            setOriginQuery(suggestion.shortName);
                            setShowOriginSuggestions(false);
                          }}
                          className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-4 transition-all"
                        >
                          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
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
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">To</label>
            <div className="relative">
              <MapPinIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
              <input 
                type="text" 
                value={destinationCity}
                disabled
                className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Departure</label>
            <div className="relative">
              <CalendarIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />
              <input 
                type="date" 
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Return</label>
            <div className="relative">
              <CalendarIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
              <input 
                type="date" 
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSearch}
          disabled={loading}
          className="w-full mt-10 bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-purple-600 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <MagnifyingGlassIcon className="w-5 h-5" />
              Find Round-Trip Deals on Wego
            </>
          )}
        </button>
      </div>

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
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-purple-100 border-t-purple-600 rounded-full"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-4 bg-purple-500/20 rounded-full flex items-center justify-center"
              >
                <PaperAirplaneIcon className="w-8 h-8 text-purple-600 rotate-45" />
              </motion.div>
            </div>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px]"
            >
              Accessing Global Inventory...
            </motion.p>
          </motion.div>
        ) : hasSearched && flight ? (
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
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"
              />
              <div className="relative bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner"
                >
                  <PaperAirplaneIcon className="w-10 h-10 text-blue-600 rotate-45" />
                </motion.div>
                
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                  Fly from {originQuery} to {destinationCity}
                </h3>
                
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-10">
                  Round-trip inventory accessed • Best live prices.
                </p>

                <div className="grid grid-cols-2 gap-10 w-full mb-12 border-y border-gray-50 py-8">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Departure</p>
                    <p className="text-sm font-black text-gray-900">{departureDate}</p>
                  </div>
                  <div className="text-center border-l border-gray-50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Return</p>
                    <p className="text-sm font-black text-gray-900">{returnDate}</p>
                  </div>
                </div>

                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={flight.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 text-white py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-xs hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3"
                >
                  Book on Wego <ChevronRightIcon className="w-4 h-4" />
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
            <TicketIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Ready to search for live round-trip deals</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlightSearch;

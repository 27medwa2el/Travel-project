import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ISuggestionFormatted } from '../types/typings';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

type Props = {
  cities: ISuggestionFormatted[];
  onExplore: (city: ISuggestionFormatted) => void;
};

const CityCarousel = ({ cities, onExplore }: Props) => {
  const [currentIndex, setCurrentCenterIndex] = useState(0);

  if (!cities || cities.length === 0) return null;

  const next = () => {
    setCurrentCenterIndex((prev) => (prev + 1) % cities.length);
  };

  const prev = () => {
    setCurrentCenterIndex((prev) => (prev - 1 + cities.length) % cities.length);
  };

  const getCardIndex = (offset: number) => {
    return (currentIndex + offset + cities.length) % cities.length;
  };

  return (
    <div className="relative w-full py-20 overflow-hidden flex flex-col items-center">
      <div className="flex items-center justify-center w-full h-[600px] relative">
        <AnimatePresence initial={false}>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const index = getCardIndex(offset);
            const city = cities[index];
            if (!city) return null;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            // Extract display names safely
            const nameParts = city.shortName.split(',');
            const cityName = nameParts[0]?.trim() || city.displayName;
            const countryName = nameParts[1]?.trim() || 'Global';

            return (
              <motion.div
                key={`${city.id}-${offset}`}
                initial={{ opacity: 0, scale: 0.8, x: offset * 400 }}
                animate={{
                  opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                  scale: isCenter ? 1 : 0.8,
                  x: offset * 320,
                  zIndex: 10 - Math.abs(offset),
                  rotateY: offset * -20,
                  filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.23, 1, 0.32, 1] // Custom ease for smoother "stacking"
                }}
                className={`absolute w-[380px] h-[520px] rounded-[48px] overflow-hidden shadow-2xl bg-white border border-white/50 ${
                  isCenter ? 'cursor-default' : 'cursor-pointer pointer-events-none md:pointer-events-auto'
                }`}
                onClick={() => !isCenter && setCurrentCenterIndex(index)}
              >
                <div className="relative w-full h-full group">
                  {/* Image Container */}
                  <div className="absolute inset-0 bg-gray-100">
                    <Image
                      src={city.img || `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80`}
                      alt={cityName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized={true} // Add this if external URLs are causing issues
                    />
                    {/* Multi-layered Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-8 left-8 flex gap-2">
                    <div className="bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                      <span className="text-sm">📍</span> {countryName}
                    </div>
                  </div>
                  
                  <div className="absolute top-8 right-8 bg-orange-500 shadow-lg shadow-orange-500/40 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-white text-xs font-black">
                    <StarIcon className="h-4 w-4" /> 4.8
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 w-full p-10 text-white text-center flex flex-col items-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-2">
                      Destination
                    </p>
                    <h3 className="text-5xl font-black mb-8 uppercase tracking-tighter drop-shadow-lg truncate w-full">
                      {cityName}
                    </h3>
                    
                    {/* Decorative separator */}
                    <div className="w-full h-[1px] bg-white/20 mb-8 max-w-[200px]" />

                    <div className="flex gap-10 text-[10px] opacity-80 mb-10">
                      <div className="flex flex-col items-center">
                        <span className="font-black uppercase tracking-tighter mb-1 text-gray-400">Timezone</span>
                        <span className="font-bold">UTC+5:30</span>
                      </div>
                      <div className="w-[1px] h-8 bg-white/20" />
                      <div className="flex flex-col items-center">
                        <span className="font-black uppercase tracking-tighter mb-1 text-gray-400">Currency</span>
                        <span className="font-bold">INR</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExplore(city);
                      }}
                      className="group/btn relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Explore City <ChevronRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-12 mt-16">
        <button
          onClick={prev}
          className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-900 hover:scale-110 active:scale-90 transition-all border border-gray-100 group"
        >
          <ChevronLeftIcon className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        
        {/* Pagination Progress Bar */}
        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${((currentIndex % cities.length) + 1) * (100 / cities.length)}%` }}
            className="h-full bg-purple-600"
          />
        </div>

        <button
          onClick={next}
          className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-900 hover:scale-110 active:scale-90 transition-all border border-gray-100 group"
        >
          <ChevronRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CityCarousel;

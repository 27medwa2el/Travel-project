import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ISuggestionFormatted } from '../types/typings';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';

type Props = {
  cities: ISuggestionFormatted[];
  onExplore: (city: ISuggestionFormatted) => void;
};

const CityCarousel = ({ cities, onExplore }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cities.length);
  }, [cities.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + cities.length) % cities.length);
  }, [cities.length]);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  if (!cities || cities.length === 0) return null;

  return (
    <div 
      className="relative w-full py-10 md:py-20 overflow-hidden flex flex-col items-center min-h-[600px] md:min-h-[750px]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex items-center justify-center w-full h-[450px] md:h-[600px] relative perspective-[1000px] md:perspective-[1500px]">
        {cities.map((city, index) => {
          // Calculate the relative position from the current center
          let offset = index - currentIndex;
          
          // Handle wrap-around logic for infinite loop feel
          const total = cities.length;
          if (offset > Math.floor(total / 2)) offset -= total;
          if (offset < -Math.floor(total / 2)) offset += total;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1 || (!isMobile && Math.abs(offset) <= 2);

          const nameParts = city.shortName.split(',');
          const cityName = nameParts[0]?.trim() || city.displayName;
          const countryName = nameParts[1]?.trim() || 'Global';

          return (
            <motion.div
              key={city.id}
              layout="position"
              initial={false}
              animate={{
                opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                scale: isCenter ? 1 : 0.75,
                x: offset * (isMobile ? 280 : 320), // Reduced spacing on mobile
                zIndex: 10 - Math.abs(offset),
                rotateY: offset * -25,
                filter: isCenter ? 'blur(0px)' : 'blur(4px)',
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
                layout: { duration: 0.3 }
              }}
              className={cn(
                "absolute w-[280px] h-[400px] md:w-[380px] md:h-[520px] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl bg-white border border-white/50 transition-shadow duration-500",
                isCenter ? 'cursor-default shadow-purple-500/20' : 'cursor-pointer pointer-events-none md:pointer-events-auto'
              )}
              onClick={() => !isCenter && setCurrentIndex(index)}
            >
              <div className="relative w-full h-full group">
                {/* Image Container */}
                <div className="absolute inset-0 bg-gray-100">
                  <Image
                    src={city.img || `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80`}
                    alt={cityName}
                    fill
                    sizes="(max-width: 768px) 280px, 380px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    unoptimized={true}
                    priority={isCenter}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                </div>
                
                {/* Top Badges */}
                <div className="absolute top-6 md:top-8 left-6 md:left-8 flex gap-2">
                  <div className="bg-white/20 backdrop-blur-xl px-3 md:px-4 py-1 md:py-1.5 rounded-full flex items-center gap-2 text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-white/20">
                    <span className="text-xs md:text-sm">📍</span> {countryName}
                  </div>
                </div>
                
                <div className="absolute top-6 md:top-8 right-6 md:right-8 bg-orange-500 shadow-lg shadow-orange-500/40 px-2.5 md:px-3 py-1 md:py-1.5 rounded-xl md:rounded-2xl flex items-center gap-1.5 text-white text-[10px] md:text-xs font-black">
                  <StarIcon className="h-3 w-3 md:h-4 md:w-4" /> 4.8
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 w-full p-6 md:p-10 text-white text-center flex flex-col items-center">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-1 md:mb-2">
                    Destination
                  </p>
                  <h3 className="text-3xl md:text-5xl font-black mb-4 md:mb-8 uppercase tracking-tighter drop-shadow-lg truncate w-full">
                    {cityName}
                  </h3>
                  
                  <AnimatePresence mode="popLayout">
                    {isCenter && (
                      <motion.div
                        key={`content-${city.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center w-full"
                      >
                        <div className="w-full h-[1px] bg-white/20 mb-4 md:mb-8 max-w-[150px] md:max-w-[200px]" />
                        <div className="flex gap-6 md:gap-10 text-[8px] md:text-[10px] opacity-80 mb-6 md:mb-10">
                          <div className="flex flex-col items-center">
                            <span className="font-black uppercase tracking-tighter mb-1 text-gray-400">Timezone</span>
                            <span className="font-bold">{city.timezone || 'UTC +0'}</span>
                          </div>
                          <div className="w-[1px] h-6 md:h-8 bg-white/20" />
                          <div className="flex flex-col items-center">
                            <span className="font-black uppercase tracking-tighter mb-1 text-gray-400">Currency</span>
                            <span className="font-bold">{city.currency || 'USD'}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onExplore(city);
                          }}
                          className="group/btn relative w-full overflow-hidden bg-gradient-to-r from-[#2563eb] to-[#9333ea] text-white py-4 md:py-5 rounded-2xl md:rounded-[24px] font-black uppercase tracking-widest text-[10px] md:text-xs transition-all shadow-xl shadow-blue-500/20 active:scale-95 hover:shadow-purple-500/40"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            About City <ChevronRightIcon className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover/btn:translate-x-1" />
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-8 md:gap-12 mt-10 md:mt-16">
        <button
          onClick={(e) => { e.stopPropagation(); prev(); setIsAutoPlaying(false); }}
          className="z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-900 hover:scale-110 active:scale-90 transition-all border border-gray-100 hover:bg-gray-50"
        >
          <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        
        <div className="w-16 md:w-24 h-1 md:h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${((currentIndex % cities.length) + 1) * (100 / cities.length)}%` }}
            className="h-full bg-[#9333ea]"
          />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); next(); setIsAutoPlaying(false); }}
          className="z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-900 hover:scale-110 active:scale-90 transition-all border border-gray-100 hover:bg-gray-50"
        >
          <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </div>
  );
};

export default CityCarousel;

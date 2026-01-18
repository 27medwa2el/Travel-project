import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ISuggestionFormatted } from '../types/typings';
import { 
  XMarkIcon, 
  ClockIcon, 
  CurrencyDollarIcon, 
  LanguageIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

type Props = {
  city: ISuggestionFormatted | null;
  isOpen: boolean;
  onClose: () => void;
  onExplore: (city: ISuggestionFormatted) => void;
};

const CityInfoModal = ({ city, isOpen, onClose, onExplore }: Props) => {
  if (!city) return null;

  const country = city.shortName.split(',')[1]?.trim() || 'France';
  const cityName = city.shortName.split(',')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl bg-white rounded-[40px] overflow-hidden shadow-2xl z-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all z-20"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Hero Section */}
            <div className="relative h-[250px] md:h-[350px] w-full">
              <Image
                src={city.img || '/placeholder.jpg'}
                alt={cityName}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
              
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white">
                <div className="bg-white/20 backdrop-blur-md px-3 md:px-4 py-1 rounded-full text-[10px] md:text-sm font-bold w-fit mb-2 md:mb-4 border border-white/20">
                  📍 {city.lat}, {city.lng}
                </div>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-2">
                  {cityName}
                </h2>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10 -mt-6 relative bg-white rounded-t-[32px] md:rounded-t-[40px]">
              <p className="text-gray-500 text-sm md:text-lg leading-relaxed font-medium mb-8 md:mb-10 max-w-2xl">
                {cityName} is a captivating destination that blends rich history with modern culture and lifestyle. Explore its world-renowned landmarks and unique local experiences.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
                <div className="bg-gray-50 p-4 md:p-6 rounded-2xl md:rounded-3xl flex items-center gap-4 border border-gray-100 group hover:bg-blue-50 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform flex-shrink-0">
                    <ClockIcon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Timezone</p>
                    <p className="text-base md:text-xl font-black text-gray-900 leading-none">{city.timezone}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 rounded-2xl md:rounded-3xl flex items-center gap-4 border border-gray-100 group hover:bg-green-50 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl md:rounded-2xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform flex-shrink-0">
                    <CurrencyDollarIcon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Currency</p>
                    <p className="text-base md:text-xl font-black text-gray-900 leading-none">{city.currency}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 rounded-2xl md:rounded-3xl flex items-center gap-4 border border-gray-100 group hover:bg-purple-50 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl md:rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform flex-shrink-0">
                    <LanguageIcon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Language</p>
                    <p className="text-base md:text-xl font-black text-gray-900 leading-none">{city.language}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button 
                  onClick={onClose}
                  className="w-full sm:flex-1 py-4 md:py-5 bg-gray-100 text-gray-900 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-gray-200 transition-all active:scale-95"
                >
                  Close
                </button>
                <button 
                  onClick={() => onExplore(city)}
                  className="w-full sm:flex-[2] py-4 md:py-5 bg-gradient-to-r from-[#2563eb] to-[#9333ea] text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-blue-500/20 hover:shadow-purple-500/40 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  Explore Full City <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CityInfoModal;

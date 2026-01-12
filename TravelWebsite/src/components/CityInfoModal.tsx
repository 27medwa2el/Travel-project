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
            <div className="relative h-[350px] w-full">
              <Image
                src={city.img || '/placeholder.jpg'}
                alt={cityName}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
              
              <div className="absolute bottom-10 left-10 text-white">
                <div className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold w-fit mb-4 border border-white/20">
                  📍 48.86, 2.35
                </div>
                <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-2">
                  {cityName}
                </h2>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-10 -mt-6 relative bg-white rounded-t-[40px]">
              <p className="text-gray-500 text-lg leading-relaxed font-medium mb-10 max-w-2xl">
                {cityName}, the "City of Light and Love," is a captivating capital that blends rich history with modern art and fashion. Situated on the banks of the Seine, it is famous for world-renowned landmarks such as the Eiffel Tower.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-gray-50 p-6 rounded-3xl flex items-center gap-4 border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <ClockIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Timezone</p>
                    <p className="text-xl font-black text-gray-900 leading-none">CET</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-3xl flex items-center gap-4 border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <CurrencyDollarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Currency</p>
                    <p className="text-xl font-black text-gray-900 leading-none">EUR</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-3xl flex items-center gap-4 border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                    <LanguageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Language</p>
                    <p className="text-xl font-black text-gray-900 leading-none">FRENCH</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform">
                  City Information
                </button>
                <button 
                  onClick={() => onExplore(city)}
                  className="py-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform"
                >
                  Explore City
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

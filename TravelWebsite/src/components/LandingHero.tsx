import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  MapIcon
} from '@heroicons/react/24/outline';

const LandingHero = () => {
  return (
    <div className="relative min-h-[90vh] w-full flex flex-col items-center justify-center bg-[#f8faff] overflow-hidden">
      {/* Background World Map Image */}
      <div className="absolute inset-0 z-0 opacity-20 grayscale pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80"
          alt="World Map"
          fill
          className="object-cover"
        />
      </div>

      {/* Main Hero Content */}
      <div className="z-10 flex flex-col items-center text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-white/50 backdrop-blur-md px-6 py-2.5 rounded-full mb-10 border border-white/50 shadow-sm"
        >
          <span className="text-yellow-500 text-xl animate-pulse">✨</span>
          <span className="text-gray-700 font-black uppercase tracking-[0.2em] text-xs">Discover 1000+ Destinations</span>
          <span className="text-yellow-500 text-xl animate-pulse">✨</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-7xl md:text-[10rem] font-black text-gray-900 leading-[0.85] mb-10 tracking-tighter"
        >
          Your Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm">Adventure</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-500 font-medium mb-12 max-w-2xl leading-relaxed"
        >
          Plan, explore, and create unforgettable travel experiences with our comprehensive platform designed for modern adventurers.
        </motion.p>

        {/* Floating Card - Left */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 50 }}
          className="absolute left-20 top-[60%] hidden xl:flex flex-col gap-4 w-[300px] p-8 bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/50 shadow-2xl shadow-purple-500/10"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 mb-2">
            <MapIcon className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 leading-tight">Smart Trip Planning</h3>
          <p className="text-gray-600 font-medium text-sm leading-relaxed">
            AI-powered recommendations based on your preferences and previous trips.
          </p>
        </motion.div>

        {/* Floating Card - Right (Decorative) */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 50 }}
          className="absolute right-20 top-[40%] hidden xl:flex flex-col gap-2 p-4 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl"
        >
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-yellow-400" />)}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Excellent Reviews</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingHero;

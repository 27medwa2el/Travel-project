import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  EyeIcon, 
  BriefcaseIcon, 
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

type Props = {
  title: string;
  progress: number;
  daysLeft: number;
  places: number;
};

const ActiveTripCard = ({ title, progress, daysLeft, places }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[40px] p-8 border border-green-100 shadow-2xl shadow-green-900/5 relative overflow-hidden"
    >
      {/* Live Badge */}
      <div className="absolute top-8 right-8 bg-green-500 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-green-500/20">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-white uppercase tracking-widest">Live</span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">{title}</h3>
          <div className="flex items-center gap-1.5 text-gray-500 font-bold text-sm">
            <MapPinIcon className="w-4 h-4" />
            <span>Multiple locations</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Progress</span>
            <span className="text-lg font-black text-green-600 leading-none">{progress}%</span>
          </div>
          <div className="h-2.5 w-full bg-green-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-green-500 rounded-full shadow-sm"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 p-4 rounded-3xl border border-white/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Days Left</p>
            <p className="text-3xl font-black text-gray-900 leading-none">{daysLeft}</p>
          </div>
          <div className="bg-white/50 p-4 rounded-3xl border border-white/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Places</p>
            <p className="text-3xl font-black text-gray-900 leading-none">{places}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-500/20 transition-all hover:scale-[1.02] active:scale-95 text-center">
            <EyeIcon className="w-5 h-5" /> View
          </button>
          <Link href="/bag" className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs border border-green-100 shadow-sm transition-all hover:scale-[1.02] active:scale-95 text-center">
            <BriefcaseIcon className="w-5 h-5" /> Bag
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveTripCard;

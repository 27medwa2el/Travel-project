import React from 'react';
import { 
  MapPinIcon, 
  UserGroupIcon, 
  WrenchScrewdriverIcon, 
  DevicePhoneMobileIcon 
} from '@heroicons/react/24/outline';

const StatsCard = () => {
  return (
    <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[40px] border border-white/20 shadow-2xl min-w-[280px]">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="text-blue-400 mb-2">
            <MapPinIcon className="w-6 h-6" />
          </div>
          <p className="text-3xl font-black text-white leading-none mb-1">2</p>
          <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Places</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="text-purple-400 mb-2">
            <UserGroupIcon className="w-6 h-6" />
          </div>
          <p className="text-3xl font-black text-white leading-none mb-1">0</p>
          <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Guides</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="text-green-400 mb-2">
            <WrenchScrewdriverIcon className="w-6 h-6" />
          </div>
          <p className="text-3xl font-black text-white leading-none mb-1">0</p>
          <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Services</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="text-pink-400 mb-2">
            <DevicePhoneMobileIcon className="w-6 h-6" />
          </div>
          <p className="text-3xl font-black text-white leading-none mb-1">0</p>
          <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Apps</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

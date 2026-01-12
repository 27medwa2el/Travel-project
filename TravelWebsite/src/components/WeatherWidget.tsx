import React from 'react';
import { CloudIcon, SunIcon, WaterDropIcon } from '@heroicons/react/24/outline';

const WeatherWidget = () => {
  return (
    <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-[32px] border border-white/20 shadow-2xl min-w-[220px]">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
          <SunIcon className="w-10 h-10 text-white" />
        </div>
        <div className="text-right">
          <p className="text-5xl font-black text-white leading-none">5°C</p>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">Partly Cloudy</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-lg">💧</span>
          <span className="text-white font-black text-sm">68%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-lg">💨</span>
          <span className="text-white font-black text-sm">18 km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;

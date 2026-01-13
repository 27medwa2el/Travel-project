import React, { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { XMarkIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Activity } from '@/types/domain';
import { cn } from '@/lib/utils';

type Props = {
  activities: Activity[];
  center: { lat: number; lng: number };
};

const CityMapView = ({ activities, center }: Props) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [viewState, setViewState] = useState({
    longitude: center.lng || 2.3522,
    latitude: center.lat || 48.8566,
    zoom: 13,
    pitch: 45,
  });

  return (
    <div className="relative w-full h-[700px] rounded-[48px] overflow-hidden shadow-2xl border border-white/50">
      <Map
        {...viewState}
        onMove={evt => setViewState(idx => ({ ...idx, ...evt.viewState }))}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={
          process.env.NEXT_PUBLIC_MAPBOX_TOKEN && process.env.NEXT_PUBLIC_MAPBOX_TOKEN !== 'key_goes_here'
            ? process.env.NEXT_PUBLIC_MAPBOX_TOKEN 
            : 'pk.eyJ1IjoiamF2aWVyZ29uZ29yYSIsImEiOiJjbGFsYmZ0bmowMDBnMTVuc3huYmp5bncifQ'
        } 
      >
        <NavigationControl position="top-right" />

        {activities.map((activity) => (
          <Marker
            key={activity.id}
            latitude={activity.lat}
            longitude={activity.lng}
            anchor="bottom"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedActivity(activity);
              }}
              className={cn(
                "relative group flex items-center justify-center transition-all",
                selectedActivity?.id === activity.id ? "z-50" : "z-10"
              )}
            >
              {/* Modern Marker Bubble */}
              <div className={cn(
                "bg-white px-4 py-2 rounded-2xl shadow-2xl border-2 transition-all flex items-center gap-2",
                selectedActivity?.id === activity.id ? "border-blue-500 scale-110" : "border-white hover:border-blue-200"
              )}>
                <span className="text-sm font-black text-gray-900">${activity.price}</span>
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <StarIcon className="w-3.5 h-3.5" />
                </div>
              </div>
              {/* Pointer Triangle */}
              <div className={cn(
                "w-3 h-3 bg-white rotate-45 -mt-1.5 shadow-xl border-r border-b border-gray-100",
                selectedActivity?.id === activity.id && "border-blue-500"
              )} />
            </motion.button>
          </Marker>
        ))}

        {/* Selected Activity Floating Card */}
        <AnimatePresence>
          {selectedActivity && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 20, x: '-50%' }}
              className="absolute bottom-10 left-1/2 z-50 w-full max-w-sm px-4"
            >
              <div className="bg-white/80 backdrop-blur-2xl rounded-[32px] p-6 shadow-2xl border border-white flex gap-6 relative">
                <button 
                  onClick={() => setSelectedActivity(null)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all border border-gray-100"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>

                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image 
                    src={selectedActivity.images?.[0] || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80'} 
                    alt={selectedActivity.title} 
                    fill 
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-tight mb-1">
                      {selectedActivity.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                      <MapPinIcon className="w-3 h-3" />
                      {selectedActivity.tags?.[0] || 'Activity'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-black text-blue-600">${selectedActivity.price}</span>
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-900 hover:text-blue-600 transition-colors">Details →</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Map>

      {/* Floating Info Over Map */}
      <div className="absolute top-8 left-8 z-40 bg-white/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 shadow-xl hidden md:block">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Current Exploration</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-sm font-black text-gray-900 uppercase tracking-tighter">{activities.length} Destinations Available</p>
        </div>
      </div>
    </div>
  );
};

export default CityMapView;

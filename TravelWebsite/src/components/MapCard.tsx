import { StarIcon } from "@heroicons/react/24/solid";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import { IResult } from "../types/typings";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type Props = {
  searchResults: IResult[];
  favorites?: Boolean;
};

const MapCard = ({ searchResults, favorites=false }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<IResult | null>(
    null
  );
  
  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));
  
  const center: any = coordinates.length > 0 ? getCenter(coordinates) : { latitude: 48.8566, longitude: 2.3522 };
  
  const [viewState, setViewState] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: favorites ? 2 : 11,
    pitch: 45,
  });

  return (
    <div className="relative w-full h-full">
      <Map
        {...viewState}
        onMove={evt => setViewState(idx => ({ ...idx, ...evt.viewState }))}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={
          process.env.NEXT_PUBLIC_MAPBOX_TOKEN && process.env.NEXT_PUBLIC_MAPBOX_TOKEN !== 'key_goes_here'
            ? process.env.NEXT_PUBLIC_MAPBOX_TOKEN 
            : 'pk.eyJ1IjoiamF2aWVyZ29uZ29yYSIsImEiOiJjbGFsYmZ0bmowMDBnMTVuc3huYmp5bncifQ'
        }
      >
        <NavigationControl position="top-right" />

        {searchResults.map((result) => (
          <Marker
            key={result.long + result.lat}
            latitude={result.lat}
            longitude={result.long}
            anchor="bottom"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLocation(result);
              }}
              className={cn(
                "relative group flex items-center justify-center transition-all",
                selectedLocation?.hotelId === result.hotelId ? "z-50" : "z-10"
              )}
            >
              <div className={cn(
                "bg-white px-3 py-1.5 rounded-xl shadow-xl border-2 transition-all flex items-center gap-2",
                selectedLocation?.hotelId === result.hotelId ? "border-blue-500 scale-110" : "border-white"
              )}>
                <span className="text-[10px] font-black text-gray-900">{result.price}</span>
              </div>
              <div className={cn(
                "w-2 h-2 bg-white rotate-45 -mt-1 shadow-xl border-r border-b border-gray-100",
                selectedLocation?.hotelId === result.hotelId && "border-blue-500"
              )} />
            </motion.button>
          </Marker>
        ))}

        <AnimatePresence>
          {selectedLocation && (
            <Popup
              latitude={selectedLocation.lat}
              longitude={selectedLocation.long}
              onClose={() => setSelectedLocation(null)}
              closeButton={false}
              maxWidth="320px"
              anchor="top"
              className="z-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-4 shadow-2xl flex flex-col gap-4 overflow-hidden min-w-[240px]"
              >
                <div className="relative h-32 w-full rounded-2xl overflow-hidden">
                  <Image
                    className="object-cover"
                    src={selectedLocation.img}
                    alt={selectedLocation.title}
                    fill
                  />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tighter line-clamp-1">{selectedLocation.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="flex items-center gap-1 text-xs font-bold text-gray-500">
                      <StarIcon className="h-4 text-orange-400" /> {selectedLocation.star}
                    </p>
                    <p className="text-blue-600 font-black text-sm">{selectedLocation.price}</p>
                  </div>
                </div>
              </motion.div>
            </Popup>
          )}
        </AnimatePresence>
      </Map>
    </div>
  );
};

export default MapCard;

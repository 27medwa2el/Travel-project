import { HeartIcon } from "@heroicons/react/24/outline";
import {
  ChevronRightIcon,
  HeartIcon as HeartIconSolid,
  StarIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IResult } from "../types/typings";
import { cn } from "@/lib/utils";

type Props = {
  cityId?: string;
  item: IResult;
  favorite?: boolean;
  fromFavPage?: boolean;
  startDate?: string;
  endDate?: string;
  numOfGuests?: string;
  booking?: boolean;
};

const InfoCard = ({
  cityId,
  item,
  startDate,
  endDate,
  numOfGuests,
  favorite = false,
  fromFavPage = false,
  booking = false,
}: Props) => {
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);
  const userEmail = "anonymous@user.com";
  const hotelId = item.hotelId;

  const details = () => {
    router.push({
      pathname: "/details",
      query: { id: cityId, hotelId: item.hotelId },
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="flex flex-col md:flex-row bg-white rounded-[40px] p-6 shadow-xl shadow-black/[0.02] border border-gray-100 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/5 transition-all group"
      onClick={details}
    >
      {/* Main Image */}
      <div className="relative h-60 w-full md:w-80 rounded-[32px] overflow-hidden flex-shrink-0">
        <Image
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          src={item.img}
          alt={item.title}
          fill
        />
        <div className="absolute top-4 right-4 z-10">
          {!booking && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFav(!isFav);
              }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white transition-all"
            >
              {isFav ? <HeartIconSolid className="w-5 h-5 text-red-500" /> : <HeartIcon className="w-5 h-5" />}
            </button>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
            {item.location}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow md:pl-8 mt-6 md:mt-0">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-tight mb-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h4>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-black text-gray-900">{item.star}</span>
              </div>
              <div className="h-4 w-px bg-gray-100" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Superhost</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-gray-900 leading-none mb-1">{item.price}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">per night</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6 flex-grow">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex gap-2">
            {['Wifi', 'Parking', 'Kitchen'].map(tag => (
              <span key={tag} className="bg-gray-50 px-3 py-1 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                {tag}
              </span>
            ))}
          </div>
          
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:gap-3 transition-all">
            View Availability <ChevronRightIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoCard;

export default InfoCard;

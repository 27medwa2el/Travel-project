import Image from "next/image";
import { ActivityWithLocation } from "../types/domain";
import { useRouter } from "next/router";

type Props = {
  activity: ActivityWithLocation;
};

const ActivityCard = ({ activity }: Props) => {
  const router = useRouter();

  const handleExplore = () => {
    router.push({
      pathname: "/details",
      query: { id: activity.cityId }
    });
  };

  return (
    <div 
      onClick={handleExplore}
      className="flex items-center m-1 md:m-2 space-x-3 md:space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out p-2 border border-transparent hover:border-orange-200 group"
    >
      {/* Left side */}
      <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0">
        <Image
          className="rounded-lg object-cover"
          src={activity.images?.[0] || "https://images.unsplash.com/photo-1540959733332-e94e270b4d82?auto=format&fit=crop&w=400&q=80"}
          alt={activity.title}
          fill
          unoptimized={true}
        />
      </div>
      {/* Right side */}
      <div className="overflow-hidden flex-1">
        <h2 className="font-bold truncate text-gray-800 text-sm md:text-base uppercase tracking-tight group-hover:text-purple-600 transition-colors">{activity.title}</h2>
        <h3 className="text-gray-400 text-[10px] md:text-sm font-medium uppercase tracking-widest truncate">{activity.cityName}, {activity.countryName}</h3>
        <p className="text-orange-600 font-black text-xs md:text-sm mt-1">
          {activity.price} {activity.currency}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;

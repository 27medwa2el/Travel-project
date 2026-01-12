import Image from "next/image";
import { ActivityWithLocation } from "../types/domain";

type Props = {
  activity: ActivityWithLocation;
};

const ActivityCard = ({ activity }: Props) => {
  return (
    <div className="flex items-center m-2 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out p-2 border border-transparent hover:border-orange-200">
      {/* Left side */}
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          className="rounded-lg object-cover"
          src={activity.images?.[0] || "/banner1200x600.jpg"}
          alt={activity.title}
          fill
        />
      </div>
      {/* Right side */}
      <div className="overflow-hidden">
        <h2 className="font-semibold truncate text-gray-800">{activity.title}</h2>
        <h3 className="text-gray-500 text-sm">{activity.cityName}, {activity.countryName}</h3>
        <p className="text-orange-600 font-bold text-sm mt-1">
          {activity.price} {activity.currency}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;

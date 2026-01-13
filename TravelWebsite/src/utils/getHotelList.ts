import { differenceInDays } from "date-fns";

export interface Hotel {
  hotelId: string;
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: number;
  long: number;
  lat: number;
  bookingUrl: string;
}

const getHotelList = async (
  id: string | string[] | undefined,
  location: string | string[] | undefined,
  startDate: string | string[] | undefined,
  endDate: string | string[] | undefined,
  numOfGuests: string | string[] | undefined
): Promise<Hotel> => {
  const diffInDays = differenceInDays(
    new Date(endDate as string),
    new Date(startDate as string)
  ) || 1;

  // Wego Hotel URL structure from your example: /searches/[code]/[check-in]/[check-out]?guests=[num]
  const getWegoCode = (cityName: string) => {
    const clean = cityName.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.includes('london')) return 'lon';
    if (clean.includes('newyork')) return 'nyc';
    if (clean.includes('paris')) return 'par';
    if (clean.includes('dubai')) return 'dxb';
    if (clean.includes('tokyo')) return 'tyo';
    if (clean.includes('riyadh')) return 'ruh';
    return clean.substring(0, 3);
  };

  const cityCode = getWegoCode(location as string || "lon");
  // Exact working URL pattern you provided
  const wegoHotelUrl = `https://sa.wego.com/hotels/searches/${cityCode}/${startDate}/${endDate}?guests=${numOfGuests}&sort=popularity&order=desc&view=map`;

  return {
    hotelId: `WEGO-HOTEL-FEATURED-${Date.now()}`,
    img: "https://images.unsplash.com/photo-1566073771259-1200abb0d34c?auto=format&fit=crop&w=1200&q=80",
    location: `Premium District, ${location}`,
    title: "Global Luxury Collection",
    description: "Accessing the world's finest hotels with real-time availability and best price guarantee.",
    star: 4.9,
    price: "$299",
    total: 299 * diffInDays,
    long: 0, lat: 0,
    bookingUrl: wegoHotelUrl
  };
};

export default getHotelList;

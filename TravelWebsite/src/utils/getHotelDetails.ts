export interface HotelDetails {
  images: string[];
  amenities: string[];
  address: string;
}

const getHotelDetails = async (propertyId: string | string[] | undefined): Promise<HotelDetails> => {
  // Removing RapidAPI logic completely as requested. 
  // We use high-quality mock data for a seamless demo experience.
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    images: [
      "https://images.unsplash.com/photo-1566073771259-1200abb0d34c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Free WiFi", 
      "Infinity Pool", 
      "Spa & Wellness", 
      "Gourmet Dining", 
      "Butler Service",
      "Ocean View",
      "Private Balcony"
    ],
    address: "123 Luxury Avenue, Premium District, World Center"
  };
};

export default getHotelDetails;

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import LandingHero from "../components/LandingHero";
import CityCarousel from "../components/CityCarousel";
import CityInfoModal from "../components/CityInfoModal";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import ActivityCard from "../components/ActivityCard";
import { IStyleData, ISuggestionFormatted } from "../types/typings";
import { ActivityWithLocation } from "../types/domain";
import { prisma } from "@/lib/prisma";
import { useRouter } from "next/router";

type Props = {
  citiesData: ISuggestionFormatted[];
  stylesData: IStyleData[];
  getInspiredCities: ISuggestionFormatted[];
  activities: ActivityWithLocation[];
};

const Home = ({ 
  citiesData = [], 
  stylesData = [], 
  getInspiredCities = [], 
  activities = [] 
}: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCityModal, setSelectedCityModal] = useState<ISuggestionFormatted | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (city: ISuggestionFormatted) => {
    setSelectedCityModal(city);
    setIsModalOpen(true);
  };

  const handleExploreCity = (city: ISuggestionFormatted) => {
    // Smooth exit animation state could be added here
    setIsModalOpen(false);
    
    // Use timeout to allow modal close animation to finish if needed
    setTimeout(() => {
      router.push({
        pathname: "/details",
        query: { id: city.id }
      });
    }, 300);
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <Head>
        <title>Travel - Vacation rentals for every style</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section with Nav */}
      <LandingHero />

      {/* 3D City Carousel Section */}
      <div className="max-w-7xl mx-auto -mt-40 relative z-30">
        <CityCarousel cities={getInspiredCities} onExplore={handleOpenModal} />
      </div>

      {/* City Information Modal */}
      <CityInfoModal 
        city={selectedCityModal} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onExplore={handleExploreCity}
      />

      <main className="max-w-7xl mx-auto px-8 sm:px-16 pb-20">
        {/* Local Activities Section */}
        <section className="pt-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-5xl font-black text-gray-900 mb-2">
                Local Activities
              </h2>
              <p className="text-gray-500 text-xl font-medium">Discover unique experiences curated by our experts</p>
            </div>
            <Link href="/admin/overview" className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-purple-600 hover:shadow-md transition-all font-bold">
              Manage in Admin →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities && activities.length > 0 ? (
              activities.slice(0, 6).map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <p className="col-span-full text-center py-20 text-muted-foreground border-2 border-dashed rounded-3xl bg-gray-50/50 text-xl font-medium">
                No activities found. Add some in the Admin Panel to see them here!
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-item border-b pb-2 mb-2 font-black uppercase tracking-widest text-xs text-purple-600">
          Main Menu
        </p>
        <p className="drawer-item">
          <Link href={"/dashboard"}>User Dashboard</Link>
        </p>
        <p className="drawer-item">
          <Link href={"/calendar"}>My Itinerary</Link>
        </p>
        <p className="drawer-item">
          <Link href={"/admin/overview"}>Admin Panel</Link>
        </p>
        <p className="drawer-item">
          <Link href={"/favorites"}>My Favorites</Link>
        </p>
        <p className="drawer-item">
          <Link href={"/bookings"}>Your Bookings</Link>
        </p>
      </Drawer>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [allCities, allActivities] = await Promise.all([
    prisma.city.findMany({
      take: 8,
      include: { country: true }
    }),
    prisma.activity.findMany({
      take: 6,
      include: { city: { include: { country: true } } }
    })
  ]);

  const getInspiredCities: ISuggestionFormatted[] = allCities.map(city => {
    return {
      id: city.id,
      displayName: `${city.name}, ${city.country?.name || 'Global'}`,
      shortName: `${city.name}, ${city.country?.name || 'Global'}`,
      type: "CITY",
      img: city.images?.[0] || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      timezone: city.timezone || 'UTC +0',
      currency: city.currency || 'Global',
      language: city.language || 'English',
      lat: city.lat,
      lng: city.lng
    };
  });

  const stylesData = await fetch("https://www.jsonkeeper.com/b/RWNY").then(
    (res) => res.json()
  ).catch(() => []);

  const activities = allActivities.map(activity => {
    return {
      ...activity,
      cityName: activity.city?.name || 'Unknown',
      countryName: activity.city?.country?.name || 'Unknown'
    };
  });

  return {
    props: {
      citiesData: [], // Placeholder
      stylesData,
      getInspiredCities: JSON.parse(JSON.stringify(getInspiredCities)),
      activities: JSON.parse(JSON.stringify(activities)),
    },
  };
};

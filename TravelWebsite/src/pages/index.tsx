import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Banner from "../components/Banner";
import CarouselTitlesCard from "../components/CarouselTitlesCard";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import SmallCard from "../components/SmallCard";
import ActivityCard from "../components/ActivityCard";
import { IStyleData, ISuggestionFormatted } from "../types/typings";
import { ActivityWithLocation } from "../types/domain";
import { activityStore, cityStore, countryStore } from "@/lib/mockStore";

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
  console.log('Client-side activities:', activities);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<ISuggestionFormatted | null>(
    null
  );

  return (
    <div className="">
      <Head>
        <title>Travel - Vacation rentals for every style</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {/* Banner */}
      <Banner
        getInspiredCities={getInspiredCities}
        setSearchInput={setSearchInput}
        setSelectedCity={setSelectedCity}
      />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            Most visited Canadian cities
          </h2>
          {/* Map Canadian cities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {citiesData.map((city) => (
              <SmallCard
                key={city.img}
                cityData={city}
                setSearchInput={setSearchInput}
                setSelectedCity={setSelectedCity}
              />
            ))}
          </div>
        </section>

        {/* New Activities Section linked to Admin Panel */}
        <section className="pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-semibold pb-5">
              Local Activities
            </h2>
            <Link href="/admin/overview" className="text-orange-500 hover:underline text-sm font-medium">
              Manage in Admin →
            </Link>
          </div>
          <p className="text-gray-500 -mt-4 mb-6">Discover unique experiences curated by our experts</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {activities && activities.length > 0 ? (
              activities.slice(0, 6).map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-muted-foreground border rounded-xl bg-gray-50/50">
                No activities found. Add some in the Admin Panel to see them here!
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">
            Find your travel style
          </h2>
          {/* Map styles data from api */}
          <CarouselTitlesCard images={stylesData} />
          {/* Travel Styles Carousel */}
        </section>

        <LargeCard
          img="/get-inspired1200x600.jpg"
          title="Discover New Destinations"
          description="Curated by our Travel Experts"
          buttonText="Get Inspired"
          getInspiredCities={getInspiredCities}
          setSearchInput={setSearchInput}
          setSelectedCity={setSelectedCity}
        />
      </main>
      <Footer />

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-item border-b pb-2 mb-2 font-semibold">
          <Link href={"/admin/overview"}>Admin Dashboard</Link>
        </p>
        <p className="drawer-item">
          <Link href={"/favorites"}>List of Favorites</Link>
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
  // previous citiesDataUrl = "https://www.jsonkeeper.com/b/AU5N";
  const citiesDataUrl = "https://www.jsonkeeper.com/b/DXQ2";
  const citiesData = await fetch(citiesDataUrl).then((res) => res.json());

  const stylesData = await fetch("https://www.jsonkeeper.com/b/RWNY").then(
    (res) => res.json()
  );

  const getInspiredCities = await fetch(
    // "https://www.jsonkeeper.com/b/AU5N"
    "https://www.jsonkeeper.com/b/SNPG"
  ).then((res) => res.json());

  // Fetch activities from our local admin store
  const allActivities = activityStore.getAll();
  console.log(`🏠 Home page: fetched ${allActivities.length} activities from store`);
  const activities = allActivities.map(activity => {
    const city = cityStore.getById(activity.cityId);
    const country = city ? countryStore.getById(city.countryId) : undefined;
    return {
      ...activity,
      cityName: city?.name || 'Unknown',
      countryName: country?.name || 'Unknown'
    };
  });

  return {
    props: {
      citiesData,
      stylesData,
      getInspiredCities,
      activities: JSON.parse(JSON.stringify(activities)), // Ensure serializable dates
    },
  };
};

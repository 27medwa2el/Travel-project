import React, { useMemo } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  ChevronRightIcon,
  MapPinIcon,
  ArrowLeftIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { countryStore, cityStore, seedMockData } from "@/lib/mockStore";
import { Country, City } from "@/types/domain";
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  country: Country;
  cities: City[];
};

const CountryCitiesPage = ({ country, cities }: Props) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCities = useMemo(() => {
    return cities.filter(city => 
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cities, searchQuery]);

  if (!country) return null;

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <Head>
        <title>Explore {country.name} - Travel</title>
      </Head>

      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/explore')}
          className="flex items-center gap-2 text-gray-400 hover:text-purple-600 font-bold uppercase tracking-widest text-[10px] mb-8 transition-all group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Countries
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">📍</span>
              <h1 className="text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                {country.name}
              </h1>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              Select a city to discover local activities and interactive maps
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => router.push(`/plan?countryId=${country.id}`)}
              className="w-full md:w-auto bg-purple-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-purple-200 hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <SparklesIcon className="w-4 h-4" /> Plan Multi-City Trip
            </button>
            <div className="relative w-full md:w-80">
              <div className="flex items-center bg-white p-2 rounded-2xl border border-gray-100 shadow-xl shadow-black/[0.02]">
                <MagnifyingGlassIcon className="ml-4 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-4 py-3 bg-transparent border-none font-bold text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCities.length > 0 ? filteredCities.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/details?id=${city.id}`}>
                <div className="group relative bg-white rounded-[48px] overflow-hidden shadow-xl shadow-black/[0.02] hover:shadow-2xl transition-all cursor-pointer border border-gray-100">
                  <div className="relative h-64 w-full">
                    <img 
                      src={city.images?.[0] || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'} 
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <h3 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
                        {city.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <MapPinIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Explore Map</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-gray-50 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-50 transition-all">
                      <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )) : (
            <div className="col-span-full py-40 text-center flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <MapPinIcon className="w-10 h-10" />
              </div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No cities activated in this country yet.</p>
              <Link href="/explore" className="text-purple-600 font-black uppercase tracking-widest text-xs border-b-2 border-purple-600 pb-1">Browse other countries</Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.params;
  
  // Ensure mock data is seeded
  seedMockData();

  const country = countryStore.getById(id as string);
  
  if (!country) {
    return { notFound: true };
  }

  const cities = cityStore.getByCountryId(country.id);

  return {
    props: {
      country: JSON.parse(JSON.stringify(country)),
      cities: JSON.parse(JSON.stringify(cities))
    }
  };
};

export default CountryCitiesPage;

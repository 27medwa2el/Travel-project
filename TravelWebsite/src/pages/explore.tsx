import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon, 
  ChevronRightIcon,
  GlobeAmericasIcon
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { prisma } from "@/lib/prisma";
import { Country } from "@/types/domain";
import { cn } from "@/lib/utils";
import Link from 'next/link';

const continents = ["All", "Africa", "Asia", "Europe", "North America", "South America", "Oceania"];

const ExplorePage = ({ initialCountries }: { initialCountries: any[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');

  const filteredCountries = useMemo(() => {
    return initialCountries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = selectedContinent === 'All' || country.continent === selectedContinent;
      return matchesSearch && matchesContinent;
    });
  }, [initialCountries, searchQuery, selectedContinent]);

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <Head>
        <title>Select a Country - Travel</title>
      </Head>

      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
              Select a <span className="text-purple-600">Country</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              Choose a country to explore its cities and attractions
            </p>
          </motion.div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-xl shadow-black/[0.02]">
              <div className="relative flex-1 md:w-80">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50/50 border-none focus:ring-2 focus:ring-purple-500/20 font-bold text-sm outline-none transition-all"
                />
              </div>
              <button className="bg-gray-900 text-white p-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                <AdjustmentsHorizontalIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Continents Filter */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-8 mb-8">
          {continents.map((continent) => (
            <button
              key={continent}
              onClick={() => setSelectedContinent(continent)}
              className={cn(
                "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                selectedContinent === continent 
                  ? "bg-white border-purple-600 text-purple-600 shadow-lg shadow-purple-500/10" 
                  : "bg-white border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-100 shadow-sm"
              )}
            >
              {continent}
            </button>
          ))}
        </div>

        {/* Countries Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCountries.map((country, i) => (
              <motion.div
                key={country.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
              >
                <Link href={`/explore/${country.id}`}>
                  <div className="group relative bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:shadow-purple-500/5 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden h-40 flex flex-col justify-between">
                    {/* Decorative Patterns */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mb-1" />
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mb-1" />
                      <div className="w-2 h-2 bg-pink-600 rounded-full" />
                    </div>
                    
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter group-hover:text-purple-600 transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                        {country.continent || 'Global'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-all">
                        <GlobeAmericasIcon className="w-5 h-5" />
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCountries.length === 0 && (
          <div className="py-40 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
              <GlobeAmericasIcon className="w-10 h-10" />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No countries found for your search.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps = async () => {
  const initialCountries = await prisma.country.findMany({
    orderBy: { name: 'asc' }
  });
  
  return {
    props: {
      initialCountries: JSON.parse(JSON.stringify(initialCountries))
    }
  };
};

export default ExplorePage;

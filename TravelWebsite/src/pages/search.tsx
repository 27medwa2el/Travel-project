import React, { useState } from 'react';
import Head from 'next/head';
import { FaceFrownIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, MapIcon as MapIconOutline } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import MapCard from "../components/MapCard";
import { IResult, ISuggestionFormatted } from "../types/typings";
import getHotelList from "../utils/getHotelList";
import { cn } from "@/lib/utils";

type Props = {
  searchResults: IResult[];
};

const Search = ({ searchResults }: Props) => {
  const router = useRouter();
  const { id, location, startDate, endDate, numOfGuests } = router.query;
  const [viewMode, setViewState] = useState<'list' | 'map'>('list');

  const formattedStartDate = startDate ? format(new Date(startDate as string), "dd MMM") : "";
  const formattedEndDate = endDate ? format(new Date(endDate as string), "dd MMM") : "";
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <Head>
        <title>Explore Stays - {location}</title>
      </Head>

      <Navbar />

      <main className="pt-28 flex flex-col h-screen overflow-hidden">
        {/* Search Filter Header */}
        <div className="px-6 md:px-10 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Stays in {location}</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">
              {searchResults.length} Accommodations • {range} • {numOfGuests} guests
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
              <button className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Price</button>
              <button className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Type of place</button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                <AdjustmentsHorizontalIcon className="w-4 h-4" /> Filters
              </button>
            </div>

            <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
              <button 
                onClick={() => setViewState('list')}
                className={cn(
                  "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  viewMode === 'list' ? "bg-white text-gray-900 shadow-md" : "text-gray-400"
                )}
              >
                List
              </button>
              <button 
                onClick={() => setViewState('map')}
                className={cn(
                  "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  viewMode === 'map' ? "bg-white text-gray-900 shadow-md" : "text-gray-400"
                )}
              >
                Map
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          {/* Results List */}
          <section className={cn(
            "flex-grow overflow-y-auto px-6 md:px-10 pb-20 no-scrollbar transition-all duration-500",
            viewMode === 'map' ? "w-0 opacity-0 pointer-events-none lg:w-1/3 lg:opacity-100 lg:pointer-events-auto" : "w-full"
          )}>
            <div className="flex flex-col gap-6 max-w-4xl">
              {searchResults.length > 0 ? (
                searchResults.map((item, i) => (
                  <motion.div
                    key={item.hotelId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <InfoCard
                      cityId={id as string}
                      item={item}
                      startDate={startDate as string}
                      endDate={endDate as string}
                      numOfGuests={numOfGuests as string}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-6">
                  <FaceFrownIcon className="w-20 h-20 text-gray-200" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest">No stays found for these dates.</p>
                </div>
              )}
            </div>
          </section>

          {/* Map Section */}
          <section className={cn(
            "h-full transition-all duration-500 absolute inset-0 lg:relative lg:inset-auto",
            viewMode === 'map' ? "w-full opacity-100 z-30" : "w-0 opacity-0 lg:w-2/3 lg:opacity-100"
          )}>
            <div className="w-full h-full rounded-tl-[60px] overflow-hidden border-l border-white/50 shadow-2xl">
              <MapCard searchResults={searchResults} />
            </div>
            
            {/* View List Floating Button (Mobile Only) */}
            <button 
              onClick={() => setViewState('list')}
              className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4" /> Show List
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Search;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id, location, startDate, endDate, numOfGuests } = context.query;

  const searchResults = await getHotelList(
    id,
    location,
    startDate,
    endDate,
    numOfGuests
  ).catch(console.error);

  if (!searchResults) {
    return {
      props: {
        searchResults: [],
      },
    };
  }

  return {
    props: {
      searchResults,
    },
  };
};

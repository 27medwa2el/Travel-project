import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  SparklesIcon, 
  TicketIcon,
  ChevronRightIcon,
  ClockIcon,
  ArrowRightIcon,
  MapIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  ShoppingBagIcon,
  SunIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon, SparklesIcon as SparklesIconSolid, CheckBadgeIcon, RocketLaunchIcon as RocketLaunchIconSolid } from '@heroicons/react/24/solid';
import { tripStore, cityStore, activityStore, eventStore, seedMockData, documentStore, itemStore, applicationStore } from '@/lib/mockStore';
import { Trip, City, Activity, CityEvent, CityDocument, CityRecommendedItem, CityApplication } from '@/types/domain';
import { getAuth } from '@clerk/nextjs/server';
import CityMapView from '../components/CityMapView';
import PackingBagModal from '../components/PackingBagModal';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Dashboard = ({ 
  trips = [], 
  allCities = [], 
  allActivities = [], 
  allEvents = [],
  allDocs = [],
  allRecommendedItems = [],
  allApps = []
}: { 
  trips: Trip[], 
  allCities: City[], 
  allActivities: Activity[],
  allEvents: CityEvent[],
  allDocs: CityDocument[],
  allRecommendedItems: CityRecommendedItem[],
  allApps: CityApplication[]
}) => {
  const router = useRouter();
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(trips[0] || null);
  const [view, setView] = useState<'itinerary' | 'map'>('itinerary');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const handleCancelTrip = async () => {
    if (!selectedTrip) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/trips/${selectedTrip.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to cancel trip');

      toast.success('Trip cancelled successfully');
      setShowCancelConfirm(false);
      router.reload(); // Refresh to update list
    } catch (error) {
      toast.error('Could not cancel trip. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const tripActivities = React.useMemo(() => {
    if (!selectedTrip) return [];
    const items: (Activity | CityEvent)[] = [];
    selectedTrip.cities.forEach(cityTrip => {
      cityTrip.items.forEach(item => {
        if (item.type === 'ACTIVITY') {
          // Robust lookup: try ID first, then try title matching (slugified)
          const act = allActivities.find(a => a.id === item.referenceId) || 
                      allActivities.find(a => a.title.toLowerCase().replace(/\s+/g, '-') === item.referenceId.toLowerCase());
          if (act) items.push(act);
        } else if (item.type === 'EVENT') {
          const evt = allEvents.find(e => e.id === item.referenceId) || 
                      allEvents.find(e => e.title.toLowerCase().replace(/\s+/g, '-') === item.referenceId.toLowerCase());
          if (evt) items.push(evt);
        }
      });
    });
    return items;
  }, [selectedTrip, allActivities, allEvents]);

  const mapCenter = React.useMemo(() => {
    if (tripActivities.length > 0) {
      const first = tripActivities[0];
      return { lat: first.lat, lng: first.lng };
    }
    if (selectedTrip && selectedTrip.cities.length > 0) {
      const city = allCities.find(c => c.id === selectedTrip.cities[0].cityId);
      if (city) return { lat: city.lat, lng: city.lng };
    }
    return { lat: 40.7128, lng: -74.0060 }; // NYC Default
  }, [tripActivities, selectedTrip, allCities]);

  // Helper to find data from props instead of mockStore directly on client
  const getCityById = React.useCallback((id: string) => allCities.find(c => c.id === id), [allCities]);
  const getActivityById = React.useCallback((id: string) => {
    return allActivities.find(a => a.id === id) || 
           allActivities.find(a => a.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase());
  }, [allActivities]);
  
  const getEventById = React.useCallback((id: string) => {
    return allEvents.find(e => e.id === id) || 
           allEvents.find(e => e.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase());
  }, [allEvents]);

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <Head>
        <title>Travel Dashboard - My Itineraries</title>
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: My Trips List */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-2">My Journeys</h1>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Managing {trips.length} adventures</p>
            </div>

            <div className="space-y-4">
              {trips.map((trip) => (
                <motion.div
                  key={trip.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedTrip(trip)}
                  className={`p-6 rounded-[35px] cursor-pointer transition-all border-2 ${
                    selectedTrip?.id === trip.id 
                      ? 'bg-white border-purple-600 shadow-2xl shadow-purple-100' 
                      : 'bg-white/50 border-transparent hover:bg-white hover:border-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                      <MapIcon className="w-6 h-6" />
                    </div>
                    <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      trip.status === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-1">{trip.title}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <CalendarDaysIcon className="w-3 h-3" /> {trip.startDate} — {trip.endDate}
                  </p>
                  
                  <div className="mt-6 flex -space-x-2">
                    {trip.cities.map((tc, i) => {
                      const city = getCityById(tc.cityId);
                      return (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                          <Image src={city?.images?.[0] || ""} alt={city?.name || ""} width={32} height={32} className="object-cover" />
                        </div>
                      );
                    })}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[8px] font-black text-gray-400">
                      +{trip.cities.length}
                    </div>
                  </div>
                </motion.div>
              ))}

              <button 
                onClick={() => router.push('/')}
                className="w-full p-6 rounded-[35px] border-2 border-dashed border-gray-200 text-gray-400 font-black uppercase tracking-widest text-[10px] hover:border-purple-300 hover:text-purple-600 transition-all flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-4 h-4" /> Plan New Trip
              </button>
            </div>
          </div>

          {/* Right Column: Trip Detail Itinerary */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedTrip ? (
                <motion.div
                  key={selectedTrip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  {/* Hero Header */}
                  <div className="relative h-[300px] rounded-[50px] overflow-hidden shadow-2xl">
                    <Image 
                      src={getCityById(selectedTrip.cities[0].cityId)?.images?.[0] || ""} 
                      alt="Trip Header" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                      <div className="absolute top-10 right-10 flex items-center gap-3">
                        {/* High-end Floating Menu from mockup */}
                        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-2xl p-2 rounded-[28px] shadow-2xl border border-white/50">
                          <button 
                            className="w-12 h-12 rounded-[22px] bg-orange-50 text-orange-500 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
                            title="Weather"
                          >
                            <SunIcon className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={() => setIsBagOpen(true)}
                            className="w-12 h-12 rounded-[22px] bg-purple-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-purple-200"
                            title="My Bag"
                          >
                            <ShoppingBagIcon className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={() => setView('map')}
                            className={cn(
                              "w-12 h-12 rounded-[22px] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm",
                              view === 'map' ? "bg-blue-600 text-white shadow-blue-200" : "bg-blue-50 text-blue-500"
                            )}
                            title="Map View"
                          >
                            <MapPinIcon className="w-6 h-6" />
                          </button>
                          <button 
                            className="w-12 h-12 rounded-[22px] bg-indigo-50 text-indigo-500 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
                            title="Profile"
                          >
                            <UserCircleIcon className="w-6 h-6" />
                          </button>
                        </div>

                        <button 
                          onClick={() => setShowCancelConfirm(true)}
                          className="px-6 py-4 rounded-[28px] bg-red-500 text-white shadow-xl shadow-red-200 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all"
                        >
                          <TrashIcon className="w-4 h-4" /> Cancel
                        </button>
                      </div>

                    <div className="absolute bottom-10 left-10">
                      <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-2">{selectedTrip.title}</h2>
                      <div className="flex gap-4">
                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-purple-400" /> {selectedTrip.cities.length} Cities
                        </span>
                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                          <TicketIcon className="w-4 h-4 text-blue-400" /> {selectedTrip.cities.reduce((acc, c) => acc + c.items.length, 0)} Items
                        </span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {view === 'itinerary' ? (
                      <motion.div 
                        key="itinerary"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-[50px] p-12 shadow-2xl border border-gray-50"
                      >
                        <div className="flex items-center justify-between mb-12">
                          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Trip Itinerary</h3>
                          <button className="bg-purple-50 text-purple-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">Download PDF</button>
                        </div>

                        <div className="space-y-16">
                          {selectedTrip.cities.map((cityTrip, i) => {
                            const city = getCityById(cityTrip.cityId);
                            return (
                              <div key={cityTrip.id} className="relative pl-20">
                                {/* Vertical Line */}
                                {i !== selectedTrip.cities.length - 1 && (
                                  <div className="absolute left-[39px] top-12 bottom-[-64px] w-0.5 bg-gray-100 border-l-2 border-dashed border-gray-100" />
                                )}
                                
                                {/* City Marker */}
                                <div className="absolute left-0 top-0 w-20 h-20 rounded-[30px] overflow-hidden border-4 border-white shadow-xl">
                                  <Image src={city?.images?.[0] || ""} alt={city?.name || ""} fill className="object-cover" />
                                </div>

                                <div className="mb-8">
                                  <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">{city?.name}</h4>
                                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 mt-1">
                                    <CalendarDaysIcon className="w-3 h-3" /> {cityTrip.startDate} — {cityTrip.endDate}
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {cityTrip.items.map((item) => {
                                    const activity = item.type === 'ACTIVITY' ? getActivityById(item.referenceId) : null;
                                    const event = item.type === 'EVENT' ? getEventById(item.referenceId) : null;
                                    const data = activity || event;
                                    return (
                                      <div key={item.id} className="bg-gray-50 p-6 rounded-[30px] border border-gray-100 group hover:border-purple-200 transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${item.type === 'ACTIVITY' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                                            {item.type === 'ACTIVITY' ? <SparklesIconSolid className="w-5 h-5" /> : <CalendarDaysIcon className="w-5 h-5" />}
                                          </div>
                                          <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.type}</p>
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                                          </div>
                                        </div>
                                        <h5 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors">{data?.title}</h5>
                                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{data?.description}</p>
                                        
                                        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                                          <div className="flex items-center gap-2 text-gray-400">
                                            <ClockIcon className="w-4 h-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Flexible Time</span>
                                          </div>
                                          <button className="text-purple-600 hover:text-purple-800 transition-all">
                                            <ArrowRightIcon className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  
                                  {cityTrip.items.length === 0 && (
                                    <div className="col-span-2 py-10 text-center border-2 border-dashed border-gray-100 rounded-[30px]">
                                      <p className="text-gray-300 font-black uppercase tracking-widest text-[10px]">No activities planned for this city</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="map"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="h-[800px] bg-white rounded-[60px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white"
                      >
                        <CityMapView 
                          activities={tripActivities}
                          center={mapCenter}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-white rounded-[50px] shadow-2xl border border-gray-100">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <RocketLaunchIcon className="w-12 h-12 text-gray-200" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">No trips planned yet</h3>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs max-w-sm mb-10">
                    Start your travel journey by creating your first multi-city itinerary.
                  </p>
                  <button 
                    onClick={() => router.push('/')}
                    className="bg-purple-600 text-white px-10 py-5 rounded-[25px] font-black uppercase tracking-widest text-xs hover:bg-purple-700 transition-all shadow-xl shadow-purple-100"
                  >
                    Start Planning →
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

        <Footer />

        {/* Cancellation Confirmation Modal */}
        <AnimatePresence>
          {showCancelConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCancelConfirm(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-[50px] shadow-2xl p-12 text-center"
              >
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
                  <ExclamationTriangleIcon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Cancel your trip?</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-10 px-4">
                  Are you sure you want to cancel <span className="text-gray-900">"{selectedTrip?.title}"</span>? This action cannot be undone.
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleCancelTrip}
                    disabled={isDeleting}
                    className="w-full py-6 bg-red-500 text-white rounded-[25px] font-black uppercase tracking-widest text-xs shadow-xl shadow-red-200 hover:bg-red-600 transition-all disabled:opacity-50"
                  >
                    {isDeleting ? 'Processing...' : 'Yes, Cancel Trip'}
                  </button>
                  <button 
                    onClick={() => setShowCancelConfirm(false)}
                    className="w-full py-6 bg-gray-50 text-gray-400 rounded-[25px] font-black uppercase tracking-widest text-xs hover:bg-gray-100 hover:text-gray-900 transition-all"
                  >
                    Keep My Trip
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {selectedTrip && (
          <PackingBagModal 
            isOpen={isBagOpen}
            onClose={() => setIsBagOpen(false)}
            trip={selectedTrip}
            allCities={allCities}
            allDocs={allDocs}
            allRecommendedItems={allRecommendedItems}
            allApps={allApps}
          />
        )}
      </div>
    );
  };

export const getServerSideProps = async (context: any) => {
  const { userId } = getAuth(context.req);
  if (!userId) {
    return { redirect: { destination: '/signin', permanent: false } };
  }

  // Ensure mock data is seeded
  seedMockData();

  const trips = tripStore.getByUserId(userId);
  const allCities = cityStore.getAll();
  const allActivities = activityStore.getAll();
  const allEvents = eventStore.getAll();
  const allDocs = documentStore.getAll();
  const allRecommendedItems = itemStore.getAll();
  const allApps = applicationStore.getAll();

  return {
    props: {
      trips: JSON.parse(JSON.stringify(trips)),
      allCities: JSON.parse(JSON.stringify(allCities)),
      allActivities: JSON.parse(JSON.stringify(allActivities)),
      allEvents: JSON.parse(JSON.stringify(allEvents)),
      allDocs: JSON.parse(JSON.stringify(allDocs)),
      allRecommendedItems: JSON.parse(JSON.stringify(allRecommendedItems)),
      allApps: JSON.parse(JSON.stringify(allApps)),
    }
  };
};

export default Dashboard;

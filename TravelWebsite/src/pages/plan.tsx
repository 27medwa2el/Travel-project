import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRightIcon, 
  ChevronLeftIcon,
  CalendarIcon,
  MapPinIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  CurrencyDollarIcon,
  TicketIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { cityStore, countryStore, activityStore, eventStore, settingsStore, seedMockData } from '@/lib/mockStore';
import { City, Country, Activity, CityEvent, Trip, TripCity, TripItem, AppSettings } from '@/types/domain';
import Footer from '../components/Footer';
import { toast } from 'sonner';

type Props = {
  initialCountry: Country | null;
  initialCities: City[];
  initialSettings: AppSettings;
  allActivities: Activity[];
  allEvents: CityEvent[];
};

const PlanPage = ({ initialCountry, initialCities, initialSettings, allActivities, allEvents }: Props) => {
  const router = useRouter();
  const { countryId } = router.query;

  const [step, setStep] = useState(1);
  const [country, setCountry] = useState<Country | null>(initialCountry);
  const [availableCities, setAvailableCities] = useState<City[]>(initialCities);
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [itinerary, setItinerary] = useState<TripCity[]>([]);
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  const [selectedDay, setSelectedCityDay] = useState<{ cityId: string, date: string } | null>(null);
  const [showItemPicker, setShowItemPicker] = useState(false);

  // Sync state if initial props change
  useEffect(() => {
    setCountry(initialCountry);
    setAvailableCities(initialCities);
    setSettings(initialSettings);
  }, [initialCountry, initialCities, initialSettings]);

  // Additional client-side check if country is still null but we have a countryId
  useEffect(() => {
    if (!country && countryId) {
      const c = countryStore.getById(countryId as string) || 
                countryStore.getAll().find(cc => 
                  cc.name.toLowerCase() === countryId.toString().toLowerCase() ||
                  cc.code.toLowerCase() === countryId.toString().toLowerCase()
                );
      if (c) {
        setCountry(c);
        setAvailableCities(cityStore.getByCountryId(c.id));
      }
    }
  }, [countryId, country]);

  const toggleCity = (city: City) => {
    if (selectedCities.find(c => c.id === city.id)) {
      setSelectedCities(selectedCities.filter(c => c.id !== city.id));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const startPlanning = () => {
    if (selectedCities.length === 0) {
      toast.error('Please select at least one city');
      return;
    }
    
    // Initialize itinerary
    const initialItinerary: TripCity[] = selectedCities.map(city => ({
      id: Math.random().toString(36).substring(7),
      cityId: city.id,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      items: []
    }));
    
    setItinerary(initialItinerary);
    setStep(2);
  };

  const updateCityDates = (cityId: string, field: 'startDate' | 'endDate', value: string) => {
    setItinerary(itinerary.map(item => 
      item.cityId === cityId ? { ...item, [field]: value } : item
    ));
  };

  const calculateTotalPrice = () => {
    if (!settings) return 0;
    return selectedCities.length * settings.standardCityPrice;
  };

  const getDaysArray = (start: string, end: string) => {
    const arr = [];
    const dt = new Date(start);
    const endDt = new Date(end);
    while (dt <= endDt) {
      arr.push(new Date(dt).toISOString().split('T')[0]);
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  const addItemToItinerary = (cityId: string, date: string, type: 'ACTIVITY' | 'EVENT', referenceId: string) => {
    setItinerary(itinerary.map(city => {
      if (city.cityId === cityId) {
        return {
          ...city,
          items: [...city.items, { id: Math.random().toString(36).substring(7), type, referenceId, date }]
        };
      }
      return city;
    }));
    setShowItemPicker(false);
  };

  const removeItemFromItinerary = (cityId: string, itemId: string) => {
    setItinerary(itinerary.map(city => {
      if (city.cityId === cityId) {
        return {
          ...city,
          items: city.items.filter(i => i.id !== itemId)
        };
      }
      return city;
    }));
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <Head>
        <title>Plan Your Trip - {country?.name}</title>
      </Head>

      <main className="pt-32 pb-20 px-10">
        <div className="max-w-7xl mx-auto">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex gap-4 items-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= 1 ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-white text-gray-300'}`}>1</div>
              <div className="w-12 h-0.5 bg-gray-200 rounded-full" />
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= 2 ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-white text-gray-300'}`}>2</div>
              <div className="w-12 h-0.5 bg-gray-200 rounded-full" />
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= 3 ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-white text-gray-300'}`}>3</div>
              <div className="w-12 h-0.5 bg-gray-200 rounded-full" />
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= 4 ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-white text-gray-300'}`}>4</div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Planning trip to</p>
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                {country ? country.name : (router.isReady ? 'Country Not Found' : 'Loading...')}
              </h1>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Choose your cities</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Select one or more cities to create your personalized tour.</p>
                </div>

                {availableCities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {availableCities.map((city) => {
                      const isSelected = selectedCities.find(c => c.id === city.id);
                      return (
                        <motion.div
                          key={city.id}
                          whileHover={{ y: -5 }}
                          onClick={() => toggleCity(city)}
                          className={`group relative h-[400px] rounded-[40px] overflow-hidden cursor-pointer border-4 transition-all ${isSelected ? 'border-purple-600 shadow-2xl shadow-purple-100' : 'border-transparent shadow-xl'}`}
                        >
                          <Image src={city.images?.[0] || ""} alt={city.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{city.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest">Explore</span>
                              {isSelected && (
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                  <CheckIcon className="w-5 h-5 stroke-[3]" />
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-32 text-center border-4 border-dashed border-gray-100 rounded-[60px] flex flex-col items-center gap-6">
                    <MapPinIcon className="w-16 h-16 text-gray-200" />
                    <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-sm">
                      {country ? `No cities found for ${country.name}` : 'Country not found or ID expired'}
                    </p>
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-gray-400 text-xs font-medium max-w-md">Your link might be using an outdated ID. Please select a country from the list to continue planning.</p>
                      <button 
                        onClick={() => router.push('/explore')}
                        className="bg-purple-600 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-200 hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all"
                      >
                        Go to Explore Countries
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-10">
                  <button 
                    onClick={startPlanning}
                    className="bg-gray-900 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 transition-all flex items-center gap-4 shadow-xl"
                  >
                    Next: Set Dates <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Set your stay</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Define how many days you want to spend in each city.</p>
                </div>

                <div className="space-y-6">
                  {itinerary.map((item) => {
                    const city = selectedCities.find(c => c.id === item.cityId);
                    return (
                      <div key={item.id} className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          <div className="w-24 h-24 rounded-3xl overflow-hidden relative">
                            <Image src={city?.images?.[0] || ""} alt={city?.name || ""} fill className="object-cover" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{city?.name}</h3>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Destination {itinerary.indexOf(item) + 1}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-10">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-2">Arrive</label>
                            <input 
                              type="date" 
                              value={item.startDate} 
                              onChange={(e) => updateCityDates(item.cityId, 'startDate', e.target.value)}
                              className="bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div className="w-6 h-0.5 bg-gray-200 rounded-full mt-6" />
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-2">Depart</label>
                            <input 
                              type="date" 
                              value={item.endDate} 
                              onChange={(e) => updateCityDates(item.cityId, 'endDate', e.target.value)}
                              className="bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-10">
                  <button onClick={() => setStep(1)} className="text-gray-400 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:text-gray-900 transition-all">
                    <ChevronLeftIcon className="w-4 h-4" /> Back to Cities
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="bg-gray-900 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 transition-all flex items-center gap-4 shadow-xl"
                  >
                    Next: Plan Activities <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Plan your days</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Assign activities and events to each day of your stay.</p>
                </div>

                <div className="space-y-12">
                  {itinerary.map((cityTrip) => {
                    const city = selectedCities.find(c => c.id === cityTrip.cityId);
                    const days = getDaysArray(cityTrip.startDate, cityTrip.endDate);
                    
                    return (
                      <div key={cityTrip.id} className="space-y-6">
                        <div className="flex items-center gap-4">
                          <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">{city?.name}</h3>
                          <div className="h-px flex-1 bg-gray-100" />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {days.map((date, idx) => {
                            const dayItems = cityTrip.items.filter(i => i.date === date);
                            return (
                              <div key={date} className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm flex items-start gap-8">
                                <div className="w-24 text-center">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Day {idx + 1}</p>
                                  <p className="text-lg font-black text-gray-900">{new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                                </div>

                                <div className="flex-1 flex flex-wrap gap-4">
                                  {dayItems.map(item => {
                                    const activity = item.type === 'ACTIVITY' ? allActivities.find(a => a.id === item.referenceId) : null;
                                    const event = item.type === 'EVENT' ? allEvents.find(e => e.id === item.referenceId) : null;
                                    const data = activity || event;

                                    return (
                                      <div key={item.id} className="bg-gray-50 px-4 py-3 rounded-2xl flex items-center gap-3 border border-gray-100 group">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${item.type === 'ACTIVITY' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                                          {item.type === 'ACTIVITY' ? <SparklesIcon className="w-4 h-4" /> : <CalendarIcon className="w-4 h-4" />}
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-tight text-gray-700">{data?.title || 'Unknown Item'}</span>
                                        <button onClick={() => removeItemFromItinerary(cityTrip.cityId, item.id)} className="text-gray-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                          <TrashIcon className="w-4 h-4" />
                                        </button>
                                      </div>
                                    );
                                  })}
                                  <button 
                                    onClick={() => { setSelectedCityDay({ cityId: cityTrip.cityId, date }); setShowItemPicker(true); }}
                                    className="border-2 border-dashed border-gray-100 text-gray-300 hover:border-purple-200 hover:text-purple-500 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                                  >
                                    <PlusIcon className="w-4 h-4" /> Add Activity
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-10">
                  <button onClick={() => setStep(2)} className="text-gray-400 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:text-gray-900 transition-all">
                    <ChevronLeftIcon className="w-4 h-4" /> Back to Dates
                  </button>
                  <button 
                    onClick={() => setStep(4)}
                    className="bg-gray-900 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 transition-all flex items-center gap-4 shadow-xl"
                  >
                    Next: Final Review <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Review & Confirm</h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Total for your {selectedCities.length}-city experience.</p>
                  </div>
                  <div className="bg-purple-600 p-8 rounded-[40px] text-white shadow-2xl shadow-purple-200 min-w-[300px]">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Total Booking Price</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black">{settings?.currency} {calculateTotalPrice()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[50px] p-12 shadow-2xl border border-gray-50">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest mb-10 pb-6 border-b border-gray-100 flex items-center gap-4">
                    <SparklesIcon className="w-6 h-6 text-purple-600" /> Itinerary Summary
                  </h3>
                  
                  <div className="space-y-12">
                    {itinerary.map((item, i) => {
                      const city = selectedCities.find(c => c.id === item.cityId);
                      return (
                        <div key={item.id} className="relative pl-12">
                          {i !== itinerary.length - 1 && <div className="absolute left-[19px] top-10 bottom-[-60px] w-0.5 bg-gray-100" />}
                          <div className="absolute left-0 top-1.5 w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 font-black border-4 border-white shadow-sm">{i + 1}</div>
                          
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">{city?.name}</h4>
                              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 mt-1">
                                <CalendarIcon className="w-3 h-3" /> {item.startDate} — {item.endDate}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-black text-gray-900">{settings?.currency} {settings?.standardCityPrice}</p>
                              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Base City Fee</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {item.items.length > 0 ? item.items.map(tripItem => {
                              const activity = tripItem.type === 'ACTIVITY' ? allActivities.find(a => a.id === tripItem.referenceId) : null;
                              const event = tripItem.type === 'EVENT' ? allEvents.find(e => e.id === tripItem.referenceId) : null;
                              return (
                                <div key={tripItem.id} className="bg-gray-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 border border-gray-100">
                                  {activity?.title || event?.title || 'Unknown Item'}
                                </div>
                              );
                            }) : (
                              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">No activities added</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-10">
                  <button onClick={() => setStep(3)} className="text-gray-400 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:text-gray-900 transition-all">
                    <ChevronLeftIcon className="w-4 h-4" /> Back to Planning
                  </button>
                  <button 
                    onClick={async () => {
                      try {
                        const tripData = {
                          title: `My Trip to ${country?.name}`,
                          startDate: itinerary[0].startDate,
                          endDate: itinerary[itinerary.length - 1].endDate,
                          status: 'upcoming',
                          countryId: country?.id,
                          cities: itinerary
                        };

                        const res = await fetch('/api/trips', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(tripData)
                        });

                        if (!res.ok) throw new Error('Failed to save trip');

                        toast.success('Itinerary created! Redirecting to dashboard...');
                        setTimeout(() => router.push('/dashboard'), 2000);
                      } catch (err) {
                        toast.error('Could not save trip. Please try again.');
                      }
                    }}
                    className="bg-purple-600 text-white px-16 py-8 rounded-[35px] font-black uppercase tracking-[0.2em] text-sm hover:bg-purple-700 transition-all flex items-center gap-4 shadow-2xl shadow-purple-200 scale-110"
                  >
                    Confirm & Book Trip <SparklesIcon className="w-5 h-5 animate-pulse" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Item Picker Modal */}
      <AnimatePresence>
        {showItemPicker && selectedDay && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowItemPicker(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[50px] shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            >
              <div className="p-10 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Add to your day</h3>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">
                    {selectedCities.find(c => c.id === selectedDay.cityId)?.name} — {new Date(selectedDay.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                  </p>
                </div>
                <button onClick={() => setShowItemPicker(false)} className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
                  <PlusIcon className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-12">
                {/* Activities Section */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-purple-600 mb-6 flex items-center gap-3">
                    <SparklesIcon className="w-4 h-4" /> Available Activities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allActivities.filter(a => a.cityId === selectedDay.cityId).map(activity => (
                      <div 
                        key={activity.id} 
                        onClick={() => addItemToItinerary(selectedDay.cityId, selectedDay.date, 'ACTIVITY', activity.id)}
                        className="group bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all cursor-pointer flex items-center gap-6"
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0">
                          <Image src={activity.images?.[0] || ""} alt={activity.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-black text-gray-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors">{activity.title}</h5>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{activity.price} {activity.currency}</p>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                          <PlusIcon className="w-5 h-5" />
                        </div>
                      </div>
                    ))}
                    {allActivities.filter(a => a.cityId === selectedDay.cityId).length === 0 && (
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest p-6 text-center col-span-2">No activities found for this city</p>
                    )}
                  </div>
                </div>

                {/* Events Section */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-6 flex items-center gap-3">
                    <CalendarIcon className="w-4 h-4" /> Local Events
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allEvents.filter(e => e.cityId === selectedDay.cityId).map(event => (
                      <div 
                        key={event.id} 
                        onClick={() => addItemToItinerary(selectedDay.cityId, selectedDay.date, 'EVENT', event.id)}
                        className="group bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-6"
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 bg-blue-100 flex items-center justify-center">
                          {event.imageUrl ? <Image src={event.imageUrl} alt={event.title} fill className="object-cover" /> : <CalendarIcon className="w-8 h-8 text-blue-400" />}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{event.title}</h5>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                          <PlusIcon className="w-5 h-5" />
                        </div>
                      </div>
                    ))}
                    {allEvents.filter(e => e.cityId === selectedDay.cityId).length === 0 && (
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest p-6 text-center col-span-2">No events found for this city</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { countryId } = context.query;
  
  // Ensure mock data is seeded
  seedMockData();

  let country = null;
  let cities: City[] = [];

  if (countryId) {
    const allCountries = countryStore.getAll();
    country = countryStore.getById(countryId as string);
    
    // If ID not found, try to find by name (slug match) or code
    if (!country) {
      const searchStr = countryId.toString().toLowerCase().trim();
      country = allCountries.find(c => 
        c.id === searchStr ||
        c.name.toLowerCase().replace(/\s+/g, '-') === searchStr ||
        c.name.toLowerCase() === searchStr ||
        c.code.toLowerCase() === searchStr ||
        c.name.toLowerCase().includes(searchStr)
      ) || null;
    }

    if (country) {
      cities = cityStore.getByCountryId(country.id);
    }
  }

  const settings = settingsStore.get();
  const allActivities = activityStore.getAll();
  const allEvents = eventStore.getAll();

  return {
    props: {
      initialCountry: JSON.parse(JSON.stringify(country)),
      initialCities: JSON.parse(JSON.stringify(cities)),
      initialSettings: JSON.parse(JSON.stringify(settings)),
      allActivities: JSON.parse(JSON.stringify(allActivities)),
      allEvents: JSON.parse(JSON.stringify(allEvents)),
    },
  };
};

export default PlanPage;

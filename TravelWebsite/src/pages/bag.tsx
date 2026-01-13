import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';
import { tripStore } from '@/lib/mockStore';
import { PackingItem, Trip } from '@/types/domain';
import { 
  CheckCircleIcon, 
  ChevronLeftIcon,
  ShoppingBagIcon,
  PlusIcon,
  TrashIcon,
  BriefcaseIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

const Bag = ({ initialTrip }: { initialTrip: Trip | null }) => {
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(initialTrip);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!trip) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#f8faff] min-h-screen flex flex-col items-center justify-center"
      >
        <Navbar />
        <h1 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">No Active Trip</h1>
        <button onClick={() => router.push('/dashboard')} className="text-blue-600 font-bold uppercase tracking-widest text-xs">Back to Dashboard</button>
      </motion.div>
    );
  }

  const categories = ['All', 'Essentials', 'Clothing', 'Electronics', 'Documents', 'Other'];
  
  const filteredItems = activeCategory === 'All' 
    ? trip.packingList 
    : trip.packingList.filter(item => item.category === activeCategory);

  const toggleItem = (itemId: string) => {
    const updatedList = trip.packingList.map(item => 
      item.id === itemId ? { ...item, isPacked: !item.isPacked } : item
    );
    const packedCount = updatedList.filter(i => i.isPacked).length;
    const progress = Math.round((packedCount / (updatedList.length || 1)) * 100);
    
    setTrip({ ...trip, packingList: updatedList, progress });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Essentials': return <SparklesIcon className="w-5 h-5" />;
      case 'Clothing': return <BriefcaseIcon className="w-5 h-5" />;
      case 'Electronics': return <DevicePhoneMobileIcon className="w-5 h-5" />;
      case 'Documents': return <DocumentTextIcon className="w-5 h-5" />;
      default: return <ShoppingBagIcon className="w-5 h-5" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f8faff] min-h-screen"
    >
      <Head>
        <title>Packing List - {trip.title}</title>
      </Head>

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Packing List</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{trip.title}</p>
          </motion.div>
        </div>

        {/* Progress Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-[40px] p-8 shadow-xl shadow-black/[0.02] border border-gray-100 mb-10"
        >
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Your Progress</p>
              <p className="text-3xl font-black text-gray-900">{trip.progress}% <span className="text-lg text-gray-300">Packed</span></p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Status</p>
              <div className="bg-green-50 px-3 py-1 rounded-full border border-green-100">
                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">In Progress</span>
              </div>
            </div>
          </div>
          <div className="h-4 w-full bg-gray-50 rounded-full overflow-hidden p-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${trip.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
            />
          </div>
        </motion.div>

        {/* Categories Tab */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex gap-2 mb-10 overflow-x-auto no-scrollbar pb-2"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                activeCategory === cat 
                  ? "bg-gray-900 text-white border-gray-900 shadow-xl shadow-gray-900/20" 
                  : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Items List */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ x: 10 }}
                className={cn(
                  "group p-6 rounded-[32px] border transition-all flex items-center justify-between cursor-pointer",
                  item.isPacked 
                    ? "bg-green-50/50 border-green-100" 
                    : "bg-white border-gray-100 hover:border-gray-300 shadow-sm"
                )}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center gap-5">
                  <motion.div 
                    animate={{ 
                      scale: item.isPacked ? [1, 1.2, 1] : 1,
                      rotate: item.isPacked ? [0, 10, 0] : 0
                    }}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                      item.isPacked ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                    )}
                  >
                    {item.isPacked ? <CheckCircleSolid className="w-7 h-7" /> : <CheckCircleIcon className="w-7 h-7" />}
                  </motion.div>
                  <div>
                    <h3 className={cn(
                      "text-xl font-black transition-all",
                      item.isPacked ? "text-green-600 line-through opacity-60" : "text-gray-900"
                    )}>{item.title}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">
                      {getCategoryIcon(item.category)}
                      {item.category}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.2 }}
                    className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add New Item Button */}
          <motion.button 
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 p-8 rounded-[32px] border-2 border-dashed border-gray-200 hover:border-gray-400 text-gray-400 hover:text-gray-600 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all"
          >
            <PlusIcon className="w-6 h-6" /> Add something else
          </motion.button>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Bag;

export const getServerSideProps = async () => {
  const trips = tripStore.getAll();
  // For demo, just take the active trip
  const activeTrip = trips.find(t => t.status === 'active') || trips[0] || null;

  return {
    props: {
      initialTrip: JSON.parse(JSON.stringify(activeTrip))
    }
  };
};
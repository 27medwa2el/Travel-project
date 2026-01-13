import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnalyticsCard from '../components/dashboard/AnalyticsCard';
import ActiveTripCard from '../components/dashboard/ActiveTripCard';
import { cn } from '@/lib/utils';
import { tripStore, cityStore, countryStore, activityStore } from '@/lib/mockStore';
import { Trip } from '@/types/domain';
import { 
  MapPinIcon, 
  GlobeAltIcon, 
  MapIcon, 
  StarIcon, 
  ChartBarSquareIcon,
  CalendarDaysIcon,
  TicketIcon,
  PaperAirplaneIcon,
  PlusIcon,
  RocketLaunchIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const Dashboard = ({ stats = [], activeTrip = null }: { 
  stats?: { title: string; value: string | number; trend: string; color: string }[],
  activeTrip?: Trip | null
}) => {
  const router = useRouter();
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f8faff] min-h-screen"
    >
      <Head>
        <title>Travel Dashboard - My Journeys</title>
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex-1">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4"
            >
              My Journeys
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-gray-500 text-lg font-medium max-w-xl"
            >
              Discover amazing destinations, plan unforgettable journeys, and create memories that last a lifetime.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white p-6 rounded-[32px] shadow-xl shadow-black/[0.02] border border-gray-100 flex items-center gap-6"
          >
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <ChartBarSquareIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Travel Summary</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-black text-gray-900 leading-none">{stats[0]?.value || 0}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Trips</p>
                </div>
                <div className="w-[1px] h-8 bg-gray-100" />
                <div>
                  <p className="text-2xl font-black text-gray-900 leading-none">{stats[1]?.value || 0}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Countries</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Create Trip', icon: PlusIcon, color: 'from-[#3b82f6] to-[#2563eb]', desc: 'Plan your next adventure', href: '/' },
            { label: 'My Bookings', icon: TicketIcon, color: 'from-[#a855f7] to-[#9333ea]', desc: 'View tickets', href: '/bookings' },
            { label: 'Explore', icon: GlobeAltIcon, color: 'from-[#22c55e] to-[#16a34a]', desc: 'Discover places', href: '/' },
            { label: 'Packing Bag', icon: ShoppingBagIcon, color: 'from-[#f97316] to-[#ea580c]', desc: 'Checklist', href: '/bag' },
          ].map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05, translateY: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(action.href)}
              className="bg-white group p-6 rounded-[32px] shadow-xl shadow-black/[0.02] border border-gray-100 flex flex-col items-start text-left transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${action.color} flex items-center justify-center text-white mb-4 shadow-lg shadow-black/5 group-hover:rotate-6 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <p className="text-lg font-black text-gray-900 mb-1">{action.label}</p>
              <p className="text-xs font-medium text-gray-400">{action.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Analytics & Active Trip Section */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 mb-16">
          {/* Left: Active Trip (4 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="xl:col-span-4 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <PaperAirplaneIcon className="w-6 h-6 rotate-45" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Active Trips</h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {activeTrip ? "You're currently on 1 adventure!" : "No active trips right now."}
                </p>
              </div>
            </div>
            {activeTrip ? (
              <ActiveTripCard 
                title={activeTrip.title} 
                progress={activeTrip.progress} 
                daysLeft={14} 
                places={activeTrip.cityIds.length} 
              />
            ) : (
              <div className="bg-white rounded-[40px] p-10 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center h-[350px]">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <MapPinIcon className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-400 font-bold">No active trip found.</p>
                <button className="mt-4 text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">Start a journey →</button>
              </div>
            )}
          </motion.div>

          {/* Right: Analytics Grid (8 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="xl:col-span-8 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <ChartBarSquareIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Travel Analytics</h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Track your adventure progress</p>
                </div>
              </div>
              
              <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center gap-2 border border-blue-100">
                <RocketLaunchIcon className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Live Stats</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((item, index) => {
                const icons: Record<string, any> = {
                  'Total Trips': <MapPinIcon className="w-7 h-7 text-blue-600" />,
                  'Countries': <GlobeAltIcon className="w-7 h-7 text-green-600" />,
                  'Cities': <MapIcon className="w-7 h-7 text-purple-600" />,
                  'Places': <StarIcon className="w-7 h-7 text-orange-600" />,
                  'KM Traveled': <ChartBarSquareIcon className="w-7 h-7 text-pink-600" />,
                  'Upcoming': <CalendarDaysIcon className="w-7 h-7 text-indigo-600" />,
                };
                return (
                  <AnalyticsCard 
                    key={item.title} 
                    {...item} 
                    icon={icons[item.title]} 
                    index={index} 
                  />
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Charts & Graphs Section (Matching Image 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Monthly Activity (8 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-8 bg-white p-10 rounded-[48px] border border-gray-100 shadow-xl shadow-black/[0.02]"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Monthly Activity</h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last 12 months</span>
            </div>
            
            {/* Simple SVG Chart Placeholder */}
            <div className="h-[250px] w-full flex items-end justify-between gap-2 px-2">
              {[40, 60, 30, 70, 90, 45, 20, 55, 80, 100, 65, 30].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 1, duration: 1, ease: "easeOut" }}
                    className={cn(
                      "w-full rounded-t-xl transition-all group-hover:scale-x-110",
                      i === 9 ? "bg-[#3b82f6]" : "bg-gray-100 group-hover:bg-blue-200"
                    )}
                  />
                  <span className="text-[10px] font-black text-gray-300 uppercase">{['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'][i]}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-6 mt-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Trips</span>
              </div>
            </div>
          </motion.div>

          {/* Weekly Users vs Trips (4 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:col-span-4 bg-white p-10 rounded-[48px] border border-gray-100 shadow-xl shadow-black/[0.02] flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-8">Weekly Users vs Trips</h2>
            
            {/* Circular Progress / Speedometer style indicator */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
                <motion.circle 
                  initial={{ strokeDasharray: "0 502" }}
                  whileInView={{ strokeDasharray: "350 502" }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
                  cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" fill="transparent" className="text-[#3b82f6]" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Today vs weekly avg</p>
                <p className="text-4xl font-black text-gray-900">70%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Dashboard;

export const getServerSideProps = async () => {
  const trips = tripStore.getAll();
  const cities = cityStore.getAll();
  const countries = countryStore.getAll();
  const activities = activityStore.getAll();

  const activeTrip = trips.find(t => t.status === 'active') || null;

  const stats = [
    { title: 'Total Trips', value: trips.length, trend: '+12%', color: 'bg-blue-50' },
    { title: 'Countries', value: countries.length, trend: '+8%', color: 'bg-green-50' },
    { title: 'Cities', value: cities.length, trend: '+15%', color: 'bg-purple-50' },
    { title: 'Places', value: activities.length, trend: '+23%', color: 'bg-orange-50' },
    { title: 'KM Traveled', value: '2,450', trend: '+5%', color: 'bg-pink-50' },
    { title: 'Upcoming', value: trips.filter(t => t.status === 'upcoming').length, trend: '+3%', color: 'bg-indigo-50' },
  ];

  return {
    props: {
      stats: JSON.parse(JSON.stringify(stats)),
      activeTrip: JSON.parse(JSON.stringify(activeTrip))
    }
  };
};

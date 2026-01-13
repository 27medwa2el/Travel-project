import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';
import { tripStore, activityStore } from '@/lib/mockStore';
import { Trip, TripActivity, Activity } from '@/types/domain';
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

type Props = {
  initialTrip: Trip | null;
  activitiesMap: Record<string, Activity>;
};

const Calendar = ({ initialTrip, activitiesMap }: Props) => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!initialTrip) {
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

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getDayActivities = (day: Date) => {
    return (initialTrip.tripActivities || []).filter(ta => isSameDay(new Date(ta.date), day));
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f8faff] min-h-screen"
    >
      <Head>
        <title>Itinerary - {initialTrip.title}</title>
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Calendar View (8 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <div className="bg-white rounded-[48px] p-10 shadow-xl shadow-black/[0.02] border border-gray-100">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Itinerary</h1>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">{initialTrip.title}</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-6 bg-gray-50 p-2 rounded-2xl border border-gray-100"
                >
                  <button onClick={prevMonth} className="p-2 hover:bg-white rounded-xl transition-all"><ChevronLeftIcon className="w-5 h-5" /></button>
                  <span className="text-sm font-black uppercase tracking-widest min-w-[120px] text-center">{format(currentDate, 'MMMM yyyy')}</span>
                  <button onClick={nextMonth} className="p-2 hover:bg-white rounded-xl transition-all"><ChevronRightIcon className="w-5 h-5" /></button>
                </motion.div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 py-4">{day}</div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100">
                {calendarDays.map((day, i) => {
                  const dayActivities = getDayActivities(day);
                  const isSelected = isSameDay(day, selectedDate);
                  const isCurrentMonth = isSameMonth(day, monthStart);
                  
                  return (
                    <motion.div
                      key={day.toString()}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.01 }}
                      whileHover={{ scale: 1.02, zIndex: 20 }}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "min-h-[140px] p-4 cursor-pointer transition-all flex flex-col gap-2 relative",
                        isCurrentMonth ? "bg-white" : "bg-gray-50/50",
                        isSelected && "ring-2 ring-blue-500 ring-inset z-10 shadow-xl shadow-blue-500/10"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-black transition-colors",
                        isCurrentMonth ? (isSameDay(day, new Date()) ? "text-blue-600" : "text-gray-900") : "text-gray-300"
                      )}>
                        {format(day, 'd')}
                      </span>
                      
                      <div className="flex flex-col gap-1">
                        <AnimatePresence>
                          {dayActivities.slice(0, 2).map((ta, idx) => (
                            <motion.div 
                              key={ta.id}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-blue-50 text-[10px] font-bold text-blue-600 px-2 py-1 rounded-lg truncate border border-blue-100"
                            >
                              {ta.startTime} {activitiesMap[ta.activityId]?.title}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {dayActivities.length > 2 && (
                          <div className="text-[10px] font-black text-gray-400 ml-1">+{dayActivities.length - 2} more</div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Day Details & Optimizer (4 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-black/[0.02] border border-gray-100 sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  key={selectedDate.toString()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Daily Schedule</p>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{format(selectedDate, 'EEEE, MMM do')}</h2>
                </motion.div>
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <CalendarDaysIcon className="w-6 h-6" />
                </div>
              </div>

              <div className="flex flex-col gap-6 mb-10">
                <AnimatePresence mode="wait">
                  {getDayActivities(selectedDate).length > 0 ? (
                    <motion.div 
                      key={selectedDate.toString()}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6"
                    >
                      {getDayActivities(selectedDate).sort((a,b) => a.startTime.localeCompare(b.startTime)).map((ta, i) => (
                        <motion.div 
                          key={ta.id} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="relative pl-8 border-l-2 border-dashed border-gray-100 pb-2 last:pb-0"
                        >
                          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#3b82f6] shadow-lg shadow-blue-500/20 ring-4 ring-white" />
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                              <ClockIcon className="w-4 h-4" />
                              {ta.startTime} {ta.endTime && `- ${ta.endTime}`}
                            </div>
                            <h3 className="text-lg font-black text-gray-900 leading-tight">{activitiesMap[ta.activityId]?.title}</h3>
                            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                              <MapPinIcon className="w-4 h-4" />
                              {activitiesMap[ta.activityId]?.tags?.join(', ')}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-10 flex flex-col items-center justify-center text-center opacity-40"
                    >
                      <SparklesIcon className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">No activities planned</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Route Optimizer Tool */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto"
              >
                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                      <SparklesIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">AI Route Optimizer</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 mb-6 leading-relaxed">Let AI calculate the most efficient path between your 3 activities to save 45 mins of travel time.</p>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white hover:bg-purple-600 text-purple-600 hover:text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-purple-100 transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    Optimize Route <ArrowRightIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Calendar;

export const getServerSideProps = async () => {
  const trips = tripStore.getAll();
  const activeTrip = trips.find(t => t.status === 'active') || trips[0] || null;
  
  const allActivities = activityStore.getAll();
  const activitiesMap: Record<string, Activity> = {};
  allActivities.forEach(a => activitiesMap[a.id] = a);

  return {
    props: {
      initialTrip: JSON.parse(JSON.stringify(activeTrip)),
      activitiesMap: JSON.parse(JSON.stringify(activitiesMap))
    }
  };
};
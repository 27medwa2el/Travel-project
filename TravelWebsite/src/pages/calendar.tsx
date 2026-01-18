import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';
import { Trip, Activity, CityEvent, TripItem } from '@/types/domain';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
  SparklesIcon,
  ArrowRightIcon,
  TicketIcon
} from '@heroicons/react/24/outline';
import { StarIcon, SparklesIcon as SparklesIconSolid } from '@heroicons/react/24/solid';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';

type Props = {
  initialTrip: any | null;
  activitiesMap: Record<string, Activity>;
  eventsMap: Record<string, CityEvent>;
};

const Calendar = ({ initialTrip, activitiesMap, eventsMap }: Props) => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!initialTrip) {
    return (
      <div className="bg-[#f8faff] min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <Navbar />
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <CalendarDaysIcon className="w-12 h-12 text-gray-200" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">No Active Trip</h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs max-w-sm mb-10">
          You don't have any active or upcoming trips scheduled yet.
        </p>
        <button 
          onClick={() => router.push('/dashboard')} 
          className="bg-purple-600 text-white px-10 py-5 rounded-[25px] font-black uppercase tracking-widest text-xs hover:bg-purple-700 transition-all shadow-xl shadow-purple-100"
        >
          View Dashboard
        </button>
      </div>
    );
  }

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getDayItems = (day: Date) => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const allItems: any[] = [];
    initialTrip.cities.forEach((cityTrip: any) => {
      cityTrip.items.forEach((item: any) => {
        if (item.date === dayStr) {
          allItems.push(item);
        }
      });
    });
    return allItems;
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <Head>
        <title>Itinerary - {initialTrip.title}</title>
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Calendar View (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[48px] p-10 shadow-xl shadow-black/[0.02] border border-gray-100">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">My Itinerary</h1>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1 flex items-center gap-2">
                    <MapPinIcon className="w-3 h-3 text-purple-500" /> {initialTrip.title}
                  </p>
                </div>
                
                <div className="flex items-center gap-6 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                  <button onClick={prevMonth} className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-gray-900"><ChevronLeftIcon className="w-5 h-5" /></button>
                  <span className="text-sm font-black uppercase tracking-widest min-w-[120px] text-center text-gray-900">{format(currentDate, 'MMMM yyyy')}</span>
                  <button onClick={nextMonth} className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-gray-900"><ChevronRightIcon className="w-5 h-5" /></button>
                </div>
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
                  const dayItems = getDayItems(day);
                  const isSelected = isSameDay(day, selectedDate);
                  const isCurrentMonth = isSameMonth(day, monthStart);
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div
                      key={day.toString()}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "min-h-[140px] p-4 cursor-pointer transition-all flex flex-col gap-2 relative",
                        isCurrentMonth ? "bg-white" : "bg-gray-50/50",
                        isSelected && "ring-2 ring-purple-500 ring-inset z-10 shadow-xl shadow-purple-500/10",
                        !isCurrentMonth && "opacity-40"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-black transition-colors",
                        isToday ? "text-purple-600 bg-purple-50 w-7 h-7 flex items-center justify-center rounded-lg" : (isCurrentMonth ? "text-gray-900" : "text-gray-300")
                      )}>
                        {format(day, 'd')}
                      </span>
                      
                      <div className="flex flex-col gap-1 overflow-hidden">
                        {dayItems.slice(0, 2).map((item, idx) => {
                          const data = item.type === 'ACTIVITY' ? activitiesMap[item.activityId || item.referenceId] : eventsMap[item.eventId || item.referenceId];
                          return (
                            <div 
                              key={item.id}
                              className={cn(
                                "text-[8px] font-black uppercase tracking-tight px-2 py-1 rounded-lg truncate border",
                                item.type === 'ACTIVITY' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-purple-50 text-purple-600 border-purple-100"
                              )}
                            >
                              {item.startTime ? `${item.startTime} ` : ''}{data?.title || 'Unknown'}
                            </div>
                          );
                        })}
                        {dayItems.length > 2 && (
                          <div className="text-[8px] font-black text-gray-400 ml-1 uppercase tracking-widest">+{dayItems.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Day Details (4 columns) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-black/[0.02] border border-gray-100 sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Daily Schedule</p>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{format(selectedDate, 'EEEE, MMM do')}</h2>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm">
                  <CalendarDaysIcon className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-6">
                {getDayItems(selectedDate).length > 0 ? (
                  <div className="space-y-6">
                    {getDayItems(selectedDate).sort((a,b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00')).map((item, i) => {
                      const activity = item.type === 'ACTIVITY' ? activitiesMap[item.activityId || item.referenceId] : null;
                      const event = item.type === 'EVENT' ? eventsMap[item.eventId || item.referenceId] : null;
                      const data = activity || event;
                      
                      return (
                        <motion.div 
                          key={item.id} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="relative pl-8 border-l-2 border-dashed border-gray-100 pb-2 last:pb-0"
                        >
                          <div className={cn(
                            "absolute left-[-9px] top-0 w-4 h-4 rounded-full shadow-lg ring-4 ring-white",
                            item.type === 'ACTIVITY' ? "bg-blue-500 shadow-blue-500/20" : "bg-purple-500 shadow-purple-500/20"
                          )} />
                          <div className="flex flex-col gap-2">
                            <div className={cn(
                              "flex items-center gap-2 font-black text-[10px] uppercase tracking-widest",
                              item.type === 'ACTIVITY' ? "text-blue-600" : "text-purple-600"
                            )}>
                              <ClockIcon className="w-4 h-4" />
                              {item.startTime ? `${item.startTime} ${item.endTime ? `- ${item.endTime}` : ''}` : 'Flexible Time'}
                            </div>
                            <h3 className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tight">{data?.title}</h3>
                            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                              <MapPinIcon className="w-3.5 h-3.5" />
                              {item.type} • {activity?.tags?.[0] || 'Discovery'}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                    <SparklesIcon className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">No activities planned for this day</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-10 pt-10 border-t border-gray-50 space-y-3">
                <button 
                  onClick={() => router.push(`/plan?tripId=${initialTrip.id}`)}
                  className="w-full bg-gray-900 text-white py-5 rounded-[22px] font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3"
                >
                  <PlusIcon className="w-4 h-4" /> Edit Itinerary
                </button>
                <button 
                  className="w-full bg-white text-gray-400 py-5 rounded-[22px] font-black uppercase tracking-widest text-[10px] border border-gray-100 hover:border-gray-200 hover:text-gray-600 transition-all flex items-center justify-center gap-3"
                >
                  <ArrowRightIcon className="w-4 h-4 rotate-90" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calendar;

export const getServerSideProps = async (context: any) => {
  const { userId } = getAuth(context.req);
  const { tripId } = context.query;

  if (!userId) {
    return { redirect: { destination: '/sign-in', permanent: false } };
  }

  // Get today's date in YYYY-MM-DD (local time)
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  let activeTrip = null;

  if (tripId) {
    activeTrip = await prisma.trip.findUnique({
      where: { id: tripId as string },
      include: {
        cities: {
          include: {
            items: true
          }
        }
      }
    });

    // Security check: ensure the trip belongs to the user
    if (activeTrip && activeTrip.userId !== userId) {
      activeTrip = null;
    }
  }

  if (!activeTrip) {
    const trips = await prisma.trip.findMany({
      where: { userId },
      include: {
        cities: {
          include: {
            items: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Pick the most relevant trip: active, then upcoming, then latest created
    activeTrip = trips.find(t => today >= t.startDate && today <= t.endDate);
    if (!activeTrip) {
      activeTrip = trips.find(t => today < t.startDate) || trips[0] || null;
    }
  }

  const [allActivities, allEvents] = await Promise.all([
    prisma.activity.findMany(),
    prisma.cityEvent.findMany(),
  ]);

  const activitiesMap: Record<string, Activity> = {};
  allActivities.forEach(a => activitiesMap[a.id] = a);

  const eventsMap: Record<string, CityEvent> = {};
  allEvents.forEach(e => eventsMap[e.id] = e);

  return {
    props: {
      initialTrip: JSON.parse(JSON.stringify(activeTrip)),
      activitiesMap: JSON.parse(JSON.stringify(activitiesMap)),
      eventsMap: JSON.parse(JSON.stringify(eventsMap))
    }
  };
};
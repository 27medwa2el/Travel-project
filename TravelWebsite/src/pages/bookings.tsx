import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { Booking } from '@/types/domain';
import { 
  ShoppingBagIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ReceiptRefundIcon,
  TicketIcon
} from '@heroicons/react/24/outline';
import { useUser } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';

const Bookings = ({ initialBookings }: { initialBookings: any[] }) => {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#f8faff] min-h-screen"
    >
      <Head>
        <title>My Bookings - Travel</title>
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20">
        <div className="flex flex-col gap-2 mb-10 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">My Bookings</h1>
          <p className="text-gray-400 md:text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">Manage your reservations and tickets</p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          {initialBookings.length > 0 ? (
            initialBookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-xl shadow-black/[0.02] border border-gray-100 flex flex-col md:flex-row gap-6 md:gap-8 items-center"
              >
                <div className="relative w-full md:w-48 h-40 md:h-48 rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0">
                  <Image 
                    src={booking.details?.images?.[0] || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80'} 
                    alt="Booking" 
                    fill 
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-4 w-full">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest",
                          booking.type === 'ACTIVITY' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                        )}>
                          {booking.type}
                        </div>
                        <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <CheckCircleIcon className="w-3 h-3" /> Confirmed
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter line-clamp-1">
                        {booking.details?.title || booking.details?.name}
                      </h2>
                    </div>
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price Paid</p>
                      <p className="text-3xl font-black text-gray-900 leading-none">{booking.price} {booking.currency}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0">
                        <CalendarDaysIcon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">Date</p>
                        <p className="text-xs md:text-sm font-bold text-gray-900 truncate">Jan 15, 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0">
                        <MapPinIcon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">Location</p>
                        <p className="text-xs md:text-sm font-bold text-gray-900 truncate">{booking.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 col-span-2 md:col-span-1">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0">
                        <TicketIcon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">Ticket ID</p>
                        <p className="text-xs md:text-sm font-bold text-gray-900 truncate">#TRV-{booking.id.slice(-4).toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:hidden flex justify-between items-center pt-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price Paid</p>
                    <p className="text-xl font-black text-gray-900">{booking.price} {booking.currency}</p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-3 w-full md:w-auto">
                  <button className="flex-1 md:w-32 py-4 bg-gray-900 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all">Get Ticket</button>
                  <button className="flex-1 md:w-32 py-4 bg-white text-gray-400 border border-gray-100 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-red-500 hover:border-red-100 transition-all">Cancel</button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-40 text-center border-2 border-dashed border-gray-100 rounded-[60px] flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                <ShoppingBagIcon className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">No bookings found</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Start exploring to place your first reservation</p>
              </div>
              <button 
                onClick={() => router.push('/')}
                className="mt-4 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform"
              >
                Go to Explorer
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Bookings;

export const getServerSideProps = async (context: any) => {
  const { userId } = getAuth(context.req);
  
  if (!userId) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      activity: {
        include: {
          city: true
        }
      },
      driver: {
        include: {
          city: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  const enrichedBookings = bookings.map(b => {
    return { 
      ...b, 
      details: b.activity || b.driver,
      location: b.activity?.city?.name || b.driver?.city?.name || 'Unknown'
    };
  });

  return {
    props: {
      initialBookings: JSON.parse(JSON.stringify(enrichedBookings))
    }
  };
};
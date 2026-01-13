import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';
import { activityStore, driverStore, bookingStore } from '@/lib/mockStore';
import { Activity, Driver } from '@/types/domain';
import { 
  ChevronLeftIcon,
  CheckBadgeIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  UserIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useUser } from '@clerk/nextjs';

const Checkout = () => {
  const router = useRouter();
  const { type, id } = router.query;
  const { user } = useUser();
  
  const [item, setItem] = useState<Activity | Driver | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (type === 'activity' && id) {
      setItem(activityStore.getById(id as string) || null);
    } else if (type === 'driver' && id) {
      setItem(driverStore.getById(id as string) || null);
    }
  }, [type, id]);

  const handleConfirmBooking = async () => {
    if (!item || !user) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      bookingStore.create({
        userId: user.id,
        type: type === 'activity' ? 'ACTIVITY' : 'DRIVER',
        referenceId: item.id,
        date: new Date().toISOString(),
        status: 'confirmed',
        price: type === 'activity' ? (item as Activity).price || 0 : (item as Driver).pricePerDay || 0,
        currency: type === 'activity' ? (item as Activity).currency || 'USD' : 'USD',
      });
      
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!item) return null;

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <Head>
        <title>Checkout - Confirm your Booking</title>
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left Side: Details (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => router.back()}
                    className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                  <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Confirm Booking</h1>
                </div>

                {/* Booking Summary Card */}
                <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-black/[0.02] border border-gray-100">
                  <div className="flex gap-6 mb-8">
                    <div className="relative w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0">
                      <Image 
                        src={type === 'activity' ? (item as Activity).images?.[0] || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80' : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=400&q=80'} 
                        alt="Booking" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="bg-blue-50 px-3 py-1 rounded-full w-fit mb-2">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{type}</span>
                      </div>
                      <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                        {type === 'activity' ? (item as Activity).title : (item as Driver).name}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                        <MapPinIcon className="w-4 h-4" />
                        <span>Paris, France</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                        <CalendarDaysIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                        <p className="font-bold text-gray-900">Jan 15, 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Guest</p>
                        <p className="font-bold text-gray-900">1 Adult</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-black/[0.02] border border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Payment Method</h3>
                    <div className="flex gap-2">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={20} />
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={30} height={20} />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-6 rounded-3xl border-2 border-blue-500 bg-blue-50/30">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white">
                      <CreditCardIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-gray-900 leading-none mb-1">•••• •••• •••• 4242</p>
                      <p className="text-xs text-gray-400 font-bold">Expires 12/28</p>
                    </div>
                    <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Right Side: Price Summary (5 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-gray-900 rounded-[48px] p-10 text-white shadow-2xl shadow-blue-900/20 sticky top-32">
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Price Summary</h3>
                  
                  <div className="flex flex-col gap-4 mb-10">
                    <div className="flex justify-between items-center opacity-60">
                      <span className="font-bold text-sm">Subtotal</span>
                      <span className="font-black">{type === 'activity' ? (item as Activity).price : (item as Driver).pricePerDay} USD</span>
                    </div>
                    <div className="flex justify-between items-center opacity-60">
                      <span className="font-bold text-sm">Service Fee</span>
                      <span className="font-black">12.00 USD</span>
                    </div>
                    <div className="flex justify-between items-center opacity-60">
                      <span className="font-bold text-sm">Tax</span>
                      <span className="font-black">5.00 USD</span>
                    </div>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black uppercase tracking-tighter">Total Price</span>
                      <span className="text-3xl font-black">{(type === 'activity' ? (item as Activity).price || 0 : (item as Driver).pricePerDay || 0) + 17} USD</span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-3xl p-6 mb-10 flex items-start gap-4">
                    <ShieldCheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <p className="text-xs font-medium text-white/60 leading-relaxed">
                      Your booking is protected by our Travel Guarantee. Free cancellation up to 24 hours before the event.
                    </p>
                  </div>

                  <motion.button 
                    onClick={handleConfirmBooking}
                    disabled={isProcessing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-3",
                      isProcessing ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20"
                    )}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm & Pay <ArrowRightIcon className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto py-20 text-center"
            >
              <div className="w-32 h-32 bg-green-100 rounded-[48px] flex items-center justify-center text-green-600 mx-auto mb-10 shadow-xl shadow-green-500/10">
                <CheckBadgeIcon className="w-16 h-16" />
              </div>
              <h1 className="text-6xl font-black text-gray-900 uppercase tracking-tighter mb-6 leading-none">Booking <br /> Confirmed!</h1>
              <p className="text-gray-500 text-lg font-medium mb-12">
                Your reservation has been successfully placed. We've sent the confirmation details to your email.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => router.push('/bookings')}
                  className="py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all"
                >
                  View Bookings
                </button>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="py-5 bg-white text-gray-900 border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all shadow-sm"
                >
                  Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

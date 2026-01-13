import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  MapIcon,
  SunIcon,
  BriefcaseIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  CalendarDaysIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { cityStore } from '@/lib/mockStore';
import { City } from '@/types/domain';

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinations, setDestinations] = useState<City[]>([]);

  useEffect(() => {
    // Fetch top destinations for the dropdown
    setDestinations(cityStore.getAll().slice(0, 5));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: HomeIcon, color: 'text-[#3b82f6]' },
    { name: 'Explore', href: '/search', icon: MagnifyingGlassIcon, color: 'text-[#9333ea]' },
    { name: 'Destinations', href: '#', icon: MapIcon, color: 'text-[#ea580c]', isDropdown: true },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, color: 'text-[#06b6d4]' },
    { name: 'Itinerary', href: '/calendar', icon: CalendarDaysIcon, color: 'text-[#db2777]' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4",
      scrolled ? "mt-0" : "mt-4"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between transition-all duration-500",
        scrolled 
          ? "bg-white/80 backdrop-blur-2xl py-3 px-8 rounded-full shadow-2xl shadow-black/5 border border-white/50" 
          : "bg-white/40 backdrop-blur-md py-4 px-10 rounded-[32px] border border-white/30"
      )}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#9333ea] to-[#3b82f6] rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/20 group-hover:scale-110 transition-transform text-white">
            <BriefcaseIcon className="w-7 h-7" />
          </div>
          <div className="hidden md:block">
            <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">Travel</span>
            <div className="h-1 w-full bg-gradient-to-r from-[#9333ea] to-[#3b82f6] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-200/50">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            
            if (link.isDropdown) {
              return (
                <div key={link.name} className="relative group/dropdown">
                  <button
                    className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-gray-400 hover:text-gray-600 hover:bg-white/50 cursor-pointer"
                    )}
                  >
                    <link.icon className={cn("w-4 h-4", link.color)} />
                    {link.name}
                    <ChevronDownIcon className="w-3 h-3 ml-1 group-hover/dropdown:rotate-180 transition-transform" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white p-4 opacity-0 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto transition-all translate-y-2 group-hover/dropdown:translate-y-0 z-50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-2">Top Destinations</p>
                    <div className="flex flex-col gap-1">
                      {destinations.map(city => (
                        <Link 
                          key={city.id} 
                          href={`/details?id=${city.id}`}
                          className="flex items-center gap-3 p-2 rounded-2xl hover:bg-blue-50 transition-colors group/item"
                        >
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                            <Image src={city.images?.[0] || ""} alt={city.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900 uppercase tracking-tighter">{city.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Explore →</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  isActive 
                    ? "bg-white text-gray-900 shadow-md" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                )}
              >
                <link.icon className={cn("w-4 h-4", link.color)} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Section Icons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/50 p-1 rounded-2xl border border-white">
            <div className="p-2.5 rounded-xl hover:bg-white transition-colors cursor-pointer text-yellow-500">
              <SunIcon className="w-5 h-5" />
            </div>
            <div className="p-2.5 rounded-xl hover:bg-white transition-colors cursor-pointer text-green-600">
              <MapIcon className="w-5 h-5" />
            </div>
          </div>
          
          <div className="h-10 w-[1px] bg-gray-200 mx-2 hidden sm:block" />

          <Link href="/admin/profile" className="w-12 h-12 bg-[#9333ea] rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all">
            <UserCircleIcon className="w-7 h-7 text-white" />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-2xl bg-white/50 border border-white text-gray-900"
          >
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 bg-white/90 backdrop-blur-2xl rounded-[32px] p-6 shadow-2xl border border-white lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <link.icon className={cn("w-6 h-6", link.color)} />
                  <span className="text-lg font-black text-gray-900 uppercase tracking-widest">{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  value: string | number;
  trend: string;
  icon: React.ReactNode;
  color: string;
  index: number;
};

const AnalyticsCard = ({ title, value, trend, icon, color, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-[32px] p-6 shadow-xl shadow-black/[0.03] border border-gray-100 flex flex-col items-center text-center group hover:scale-[1.02] transition-all"
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12",
        color
      )}>
        {icon}
      </div>
      
      <p className="text-4xl font-black text-gray-900 mb-1 tracking-tighter">{value}</p>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">{title}</p>
      
      <div className="bg-green-50 px-3 py-1 rounded-full border border-green-100">
        <p className="text-[10px] font-bold text-green-600">{trend}</p>
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;

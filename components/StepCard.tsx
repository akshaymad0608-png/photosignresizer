import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
}

const StepCard = ({ icon: Icon, title, description, step }: StepCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
    <div className="absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-brand to-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-brand/30 group-hover:scale-110 group-hover:rotate-6 transition-transform">
      {step}
    </div>
    <div className="w-16 h-16 bg-brand/10 dark:bg-blue-900/30 text-brand dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{description}</p>
  </div>
);

export default StepCard;

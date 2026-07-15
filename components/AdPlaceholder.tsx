import React from 'react';

interface AdPlaceholderProps {
  text: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ text }) => {
  return (
    <a 
      href="https://aimastertools.space" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full max-w-4xl mx-auto my-12 overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-sm hover:shadow-sm"
    >
      <div className="px-4 py-2 bg-gray-50/80 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center backdrop-">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Sponsored Content</span>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
      <div className="h-40 flex flex-col items-center justify-center p-8 text-center bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full"></div>
        <div className="bg-accent/10 dark:bg-accent/20 px-6 py-3 rounded-2xl mb-3 border border-accent/20 dark:border-accent/20 backdrop- shadow-sm group-hover:scale-105 transition-transform duration-300">
          <p className="text-brand dark:text-accent font-black text-lg tracking-tight">AIMASTERTOOLS.SPACE</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md font-medium leading-relaxed relative z-10">
          {text} - Discover the best AI tools for your next project. Support PhotoResizer.click by visiting our partners.
        </p>
      </div>
    </a>
  );
};

export default AdPlaceholder;
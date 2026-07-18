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
      className="block w-full max-w-4xl mx-auto my-12 overflow-hidden rounded-2xl border border-rule bg-card shadow-sm group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-sm"
    >
      <div className="px-4 py-2 bg-card-sunk/80 border-b border-rule flex justify-between items-center backdrop-blur-md">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Sponsored Content</span>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-rule" />
          <div className="w-1.5 h-1.5 rounded-full bg-rule" />
        </div>
      </div>
      <div className="h-40 flex flex-col items-center justify-center p-8 text-center bg-card-sunk relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-signal/5 rounded-full"></div>
        <div className="bg-signal/10 px-6 py-3 rounded-2xl mb-3 border border-signal backdrop-blur-md shadow-sm group-hover:scale-105 transition-transform duration-300">
          <p className="text-signal font-bold text-lg tracking-tight">AIMASTERTOOLS.SPACE</p>
        </div>
        <p className="text-xs text-muted max-w-md font-medium leading-relaxed relative z-10">
          {text} - Discover the best AI tools for your next project. Support PhotoResizer.click by visiting our partners.
        </p>
      </div>
    </a>
  );
};

export default AdPlaceholder;
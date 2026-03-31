import React, { useState } from 'react';
import { Sliders, RotateCcw } from 'lucide-react';

interface ImageControlsProps {
  brightness: number;
  setBrightness: (v: number) => void;
  contrast: number;
  setContrast: (v: number) => void;
  grayscale: boolean;
  setGrayscale: (v: boolean) => void;
  t: any;
}

const ImageControls = ({ 
  brightness, setBrightness, contrast, setContrast, grayscale, setGrayscale, t 
}: ImageControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-cyan-400 transition-all bg-gray-50/80 dark:bg-gray-900/50 px-5 py-3 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 w-full justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
      >
        <Sliders size={16} className={isOpen ? "text-brand dark:text-cyan-400" : ""} /> {isOpen ? 'Hide' : 'Show'} {t.advancedAdjustments}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6 animate-fade-in bg-white/80 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-gray-100/50 dark:border-gray-800/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 dark:bg-cyan-500/5 blur-[40px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <label className="flex items-center gap-3 cursor-pointer select-none group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={grayscale} 
                  onChange={(e) => setGrayscale(e.target.checked)}
                  className="peer w-6 h-6 appearance-none border-2 border-gray-200 dark:border-gray-700 rounded-lg checked:bg-brand dark:checked:bg-cyan-500 checked:border-brand dark:checked:border-cyan-500 transition-all cursor-pointer shadow-sm group-hover:border-brand/50 dark:group-hover:border-cyan-500/50"
                />
                <svg className="absolute w-3.5 h-3.5 text-white left-1.5 top-1.5 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity drop-shadow-sm" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors">{t.grayscale}</span>
            </label>
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] font-black text-gray-400 dark:text-gray-500">
              <span>{t.brightness}</span>
              <span className="text-brand dark:text-cyan-400 bg-brand/10 dark:bg-cyan-500/10 px-2 py-0.5 rounded-md">{brightness > 0 ? `+${brightness}` : brightness}%</span>
            </div>
            <input 
              type="range" min="-50" max="50" value={brightness} 
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-brand dark:accent-cyan-500 shadow-inner"
            />
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] font-black text-gray-400 dark:text-gray-500">
              <span>{t.contrast}</span>
              <span className="text-brand dark:text-cyan-400 bg-brand/10 dark:bg-cyan-500/10 px-2 py-0.5 rounded-md">{contrast > 0 ? `+${contrast}` : contrast}%</span>
            </div>
            <input 
              type="range" min="-50" max="50" value={contrast} 
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-brand dark:accent-cyan-500 shadow-inner"
            />
          </div>
          
          <button 
            onClick={() => { setBrightness(0); setContrast(0); setGrayscale(false); }}
            className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-600 flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800 w-full justify-center transition-colors relative z-10 group"
          >
            <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" /> {t.resetAdjustments}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageControls;

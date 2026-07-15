import React, { useState } from 'react';
import { Sliders, RotateCcw } from 'lucide-react';

interface ImageControlsProps {
  brightness: number;
  setBrightness: (v: number) => void;
  contrast: number;
  setContrast: (v: number) => void;
  grayscale: boolean;
  setGrayscale: (v: boolean) => void;
  removeBg?: boolean;
  setRemoveBg?: (v: boolean) => void;
  t: any;
}

const ImageControls = ({ 
  brightness, setBrightness, contrast, setContrast, grayscale, setGrayscale, removeBg, setRemoveBg, t 
}: ImageControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 w-full justify-center"
      >
        <Sliders size={16} /> {isOpen ? 'Hide' : 'Show'} {t.advancedAdjustments}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={grayscale} 
                  onChange={(e) => setGrayscale(e.target.checked)}
                  className="peer w-5 h-5 appearance-none border border-gray-300 dark:border-gray-600 rounded-md checked:bg-brand dark:checked:bg-accent checked:border-brand transition-colors cursor-pointer bg-white dark:bg-gray-700"
                />
                <svg className="absolute w-3.5 h-3.5 text-white left-[3px] top-[3px] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.grayscale}</span>
            </label>

            {setRemoveBg && (
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={removeBg} 
                    onChange={(e) => setRemoveBg(e.target.checked)}
                    className="peer w-5 h-5 appearance-none border border-gray-300 dark:border-gray-600 rounded-md checked:bg-brand dark:checked:bg-accent checked:border-brand transition-colors cursor-pointer bg-white dark:bg-gray-700"
                  />
                  <svg className="absolute w-3.5 h-3.5 text-white left-[3px] top-[3px] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Remove Background</span>
              </label>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <span>{t.brightness}</span>
              <span className="text-gray-700 dark:text-gray-300">{brightness > 0 ? `+${brightness}` : brightness}%</span>
            </div>
            <input 
              type="range" min="-50" max="50" value={brightness} 
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand dark:accent-accent"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <span>{t.contrast}</span>
              <span className="text-gray-700 dark:text-gray-300">{contrast > 0 ? `+${contrast}` : contrast}%</span>
            </div>
            <input 
              type="range" min="-50" max="50" value={contrast} 
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand dark:accent-accent"
            />
          </div>
          
          <button 
            onClick={() => { setBrightness(0); setContrast(0); setGrayscale(false); if(setRemoveBg) setRemoveBg(false); }}
            className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1.5 pt-4 border-t border-gray-200 dark:border-gray-700 w-full justify-center transition-colors"
          >
            <RotateCcw size={14} /> {t.resetAdjustments}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageControls;

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
    <div className="mt-4 border-t dark:border-gray-700 pt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-brand transition-colors"
      >
        <Sliders size={16} /> {isOpen ? 'Hide' : 'Show'} {t.advancedAdjustments}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={grayscale} 
                onChange={(e) => setGrayscale(e.target.checked)}
                className="w-4 h-4 text-brand rounded focus:ring-brand"
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{t.grayscale}</span>
            </label>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-gray-500">
              <span>{t.brightness}</span>
              <span>{brightness > 0 ? `+${brightness}` : brightness}%</span>
            </div>
            <input 
              type="range" min="-50" max="50" value={brightness} 
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-gray-500">
              <span>{t.contrast}</span>
              <span>{contrast > 0 ? `+${contrast}` : contrast}%</span>
            </div>
            <input 
              type="range" min="-50" max="50" value={contrast} 
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand"
            />
          </div>
          
          <button 
            onClick={() => { setBrightness(0); setContrast(0); setGrayscale(false); }}
            className="text-[10px] text-red-500 hover:underline flex items-center gap-1"
          >
            <RotateCcw size={10} /> {t.resetAdjustments}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageControls;

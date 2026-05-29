import React from 'react';
import { Upload, X, CheckCircle, RotateCw, RotateCcw } from 'lucide-react';
import { Language } from '../types';

interface ImageUploaderProps {
  title: string;
  image: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
  rotation?: number;
  onRotate?: (deg: number) => void;
  accept?: string;
  lang: Language;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  image,
  onUpload,
  onClear,
  rotation = 0,
  onRotate,
  accept = "image/*",
  lang
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 flex justify-between items-center tracking-tight">
        <span className="flex items-center gap-2 sm:gap-3">
          {title}
        </span>
        {image && (
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-400 flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-green-200/50 dark:border-green-800/50">
             <CheckCircle size={14}/> Ready
          </span>
        )}
      </h3>
      {!image ? (
        <div className="flex flex-row gap-3">
          <label className="relative flex-1 flex flex-col items-center justify-center h-28 sm:h-48 border-2 border-brand/20 dark:border-cyan-500/20 border-dashed rounded-[1.5rem] sm:rounded-[2rem] cursor-pointer bg-brand/5 dark:bg-cyan-500/5 hover:bg-brand/10 dark:hover:bg-cyan-500/10 hover:border-brand/40 dark:hover:border-cyan-500/40 transition-all duration-300 group overflow-hidden shadow-inner">
            <div className="flex flex-col items-center justify-center p-2 sm:p-4 relative z-10 text-brand dark:text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
              <p className="text-xs sm:text-base font-black tracking-tight">{lang === 'en' ? 'Take Photo' : 'फोटो खींचें'}</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              capture="environment"
              onChange={handleChange}
            />
          </label>
          
          <label className="relative flex-1 flex flex-col items-center justify-center h-28 sm:h-48 border-2 border-gray-200 dark:border-gray-700 border-dashed rounded-[1.5rem] sm:rounded-[2rem] cursor-pointer bg-white/50 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 group overflow-hidden shadow-inner">
            <div className="flex flex-col items-center justify-center p-2 sm:p-4 relative z-10 text-gray-700 dark:text-gray-300">
              <Upload className="w-7 h-7 sm:w-8 sm:h-8 mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform text-gray-500 dark:text-gray-400" />
              <p className="text-xs sm:text-base font-black tracking-tight">{lang === 'en' ? 'Upload Gallery' : 'गैलरी से चुनें'}</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept={accept}
              onChange={handleChange}
            />
          </label>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-48 sm:h-64 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-gray-100 dark:border-gray-800 shadow-xl group">
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse -z-10"></div>
            <img 
              src={image} 
              alt={`${title} preview for PHOTORESIZER`} 
              className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out" 
              style={{ transform: `rotate(${rotation}deg)` }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                onClick={onClear}
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-lg transition-all hover:scale-110 active:scale-95"
                title="Remove Image"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Rotation Controls */}
          {onRotate && (
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => onRotate(rotation - 90)}
                className="flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand dark:hover:border-blue-500 transition-all shadow-sm active:scale-95 flex-1 justify-center"
              >
                <RotateCcw size={18} /> {lang === 'en' ? 'Rotate Left' : 'बाएं घुमाएं'}
              </button>
              <button 
                onClick={() => onRotate(rotation + 90)}
                className="flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand dark:hover:border-blue-500 transition-all shadow-sm active:scale-95 flex-1 justify-center"
              >
                {lang === 'en' ? 'Rotate Right' : 'दाएं घुमाएं'} <RotateCw size={18} /> 
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
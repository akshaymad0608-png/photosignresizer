import React from 'react';
import { Upload, X, CheckCircle, RotateCw, RotateCcw } from 'lucide-react';
import { Language } from '../types';

interface ImageUploaderProps {
  title: string;
  image: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
  label: string;
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
  label,
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
        <label className="relative flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-gray-200 dark:border-gray-700 border-dashed rounded-[2rem] cursor-pointer bg-white/50 dark:bg-gray-800/30 hover:bg-brand/5 dark:hover:bg-brand/10 hover:border-brand/50 dark:hover:border-brand/50 transition-all duration-300 group overflow-hidden backdrop-blur-sm shadow-inner hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 shadow-xl shadow-gray-200/40 dark:shadow-none group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 border border-gray-50 dark:border-gray-700 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent dark:from-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
               <div className="absolute inset-0 bg-brand/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-brand dark:text-cyan-400 relative z-10 group-hover:animate-bounce" />
            </div>
            <p className="mb-2 text-lg sm:text-xl text-gray-900 dark:text-white font-black tracking-tight group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors">
              {label}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium px-4 text-center max-w-xs">
              {lang === 'en' ? 'Supports JPG, PNG. High quality images are recommended.' : 'JPG, PNG का समर्थन करता है। उच्च गुणवत्ता वाली छवियों की सिफारिश की जाती है।'}
            </p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept={accept}
            onChange={handleChange}
          />
        </label>
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
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
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex justify-between items-center">
        <span className="flex items-center gap-2">
          {title}
        </span>
        {image && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400 flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md border border-green-200 dark:border-green-800">
             <CheckCircle size={14}/> Ready
          </span>
        )}
      </h3>
      {!image ? (
        <div className="flex flex-row gap-3">
          <label className="relative flex-1 flex flex-col items-center justify-center h-32 sm:h-40 border-2 border-brand/30 dark:border-cyan-500/30 border-dashed rounded-xl cursor-pointer bg-brand/5 dark:bg-cyan-500/5 hover:bg-brand/10 transition-colors group">
            <div className="flex flex-col items-center justify-center p-2 sm:p-4 text-brand dark:text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
              <p className="text-sm font-semibold">{lang === 'en' ? 'Take Photo' : 'फोटो खींचें'}</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              capture="environment"
              onChange={handleChange}
            />
          </label>
          
          <label className="relative flex-1 flex flex-col items-center justify-center h-32 sm:h-40 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
            <div className="flex flex-col items-center justify-center p-2 sm:p-4 text-gray-700 dark:text-gray-300">
              <Upload className="w-7 h-7 mb-2 text-gray-500 dark:text-gray-400" />
              <p className="text-sm font-semibold">{lang === 'en' ? 'Upload Gallery' : 'गैलरी से चुनें'}</p>
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
          <div className="relative w-full h-48 sm:h-64 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700 group">
            <img 
              src={image} 
              alt={`${title} preview`} 
              className="max-h-full max-w-full object-contain transition-transform duration-300" 
              style={{ transform: `rotate(${rotation}deg)` }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={onClear}
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg shadow-sm transition-colors"
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-1 justify-center"
              >
                <RotateCcw size={16} /> {lang === 'en' ? 'Rotate Left' : 'बाएं घुमाएं'}
              </button>
              <button 
                onClick={() => onRotate(rotation + 90)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-1 justify-center"
              >
                {lang === 'en' ? 'Rotate Right' : 'दाएं घुमाएं'} <RotateCw size={16} /> 
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
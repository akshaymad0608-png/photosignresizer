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
      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2 flex justify-between items-center">
        <span>{title}</span>
        {image && (
          <span className="text-xs font-normal text-green-600 dark:text-green-400 flex items-center gap-1">
             <CheckCircle size={12}/> Ready
          </span>
        )}
      </h3>
      {!image ? (
        <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50/50 dark:bg-gray-800/50 hover:bg-brand/5 dark:hover:bg-blue-900/10 hover:border-brand dark:hover:border-blue-500 transition-all group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-gray-100 dark:border-gray-700">
               <Upload className="w-8 h-8 text-brand dark:text-blue-400" />
            </div>
            <p className="mb-2 text-lg text-gray-900 dark:text-white font-black tracking-tight">
              {lang === 'en' ? 'Click to upload' : 'अपलोड करने के लिए क्लिक करें'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
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
          <div className="relative w-full h-64 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-gray-100 dark:border-gray-800 shadow-xl group">
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand dark:hover:border-blue-500 transition-all shadow-sm active:scale-95"
              >
                <RotateCcw size={16} /> {lang === 'en' ? 'Rotate Left' : 'बाएं घुमाएं'}
              </button>
              <button 
                onClick={() => onRotate(rotation + 90)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand dark:hover:border-blue-500 transition-all shadow-sm active:scale-95"
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
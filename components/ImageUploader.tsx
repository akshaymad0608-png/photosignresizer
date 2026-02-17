import React from 'react';
import { Upload, X, CheckCircle, RotateCw, RotateCcw } from 'lucide-react';

interface ImageUploaderProps {
  title: string;
  image: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
  label: string;
  rotation?: number;
  onRotate?: (deg: number) => void;
  accept?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  image,
  onUpload,
  onClear,
  label,
  rotation = 0,
  onRotate,
  accept = "image/*"
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
        <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
               <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
              Click to upload image
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept={accept}
            onChange={handleChange}
          />
        </label>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="relative w-full h-56 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden border border-gray-300 dark:border-gray-600 shadow-inner">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={image} 
              alt="Preview" 
              className="max-h-full max-w-full object-contain transition-transform duration-300" 
              style={{ transform: `rotate(${rotation}deg)` }}
            />
            <button
              onClick={onClear}
              className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 hover:bg-red-500 hover:text-white text-gray-600 dark:text-gray-300 p-1.5 rounded-full shadow-md transition-all z-10"
              title="Remove Image"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Rotation Controls */}
          {onRotate && (
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => onRotate(rotation - 90)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <RotateCcw size={14} /> Rotate Left
              </button>
              <button 
                onClick={() => onRotate(rotation + 90)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Rotate Right <RotateCw size={14} /> 
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
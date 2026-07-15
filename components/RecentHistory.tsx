import React from 'react';
import { Download, History, X } from 'lucide-react';
import { ProcessedImage } from '../types';

interface RecentHistoryProps {
  history: ProcessedImage[];
  onClear: () => void;
  title: string;
}

const RecentHistory = ({ history, onClear, title }: RecentHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <History size={16} /> {title}
        </h3>
        <button 
          onClick={onClear}
          className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <X size={12} /> Clear
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {history.map((item, idx) => (
          item.processedUrl ? (
            <div key={idx} className="flex-shrink-0 w-32 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 group relative">
              <div className="aspect-[3/4] flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-2">
                <img 
                  src={item.processedUrl} 
                  alt="Recent resize" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="text-[10px] text-center text-gray-500 dark:text-gray-400 mb-2 truncate">
                {item.width}x{item.height}px • {item.fileSizeKB}KB
              </div>
              <a 
                href={item.processedUrl}
                download={`${item.name}_${idx}.jpg`}
                className="w-full flex items-center justify-center gap-1 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-brand hover:text-white dark:hover:bg-brand text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold transition-colors"
              >
                <Download size={12} /> Download
              </a>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default RecentHistory;

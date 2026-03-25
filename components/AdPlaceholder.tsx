import React from 'react';

interface AdPlaceholderProps {
  text: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ text }) => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <div className="px-3 py-1 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Sponsored Content</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="h-32 flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg mb-2">
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">{text}</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md">
          Support PhotoResizer.click by visiting our partners. This helps us keep the tool free for all students.
        </p>
        <div className="mt-3 text-sm font-medium text-blue-500 dark:text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
          Learn More <span className="text-lg">→</span>
        </div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
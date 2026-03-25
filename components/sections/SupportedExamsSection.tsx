import React from 'react';
import { EXAM_PRESETS } from '../../constants';

const SupportedExamsSection = () => (
  <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 mb-24 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
    
    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-12 text-center tracking-tight">Supported Government Exams</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
      {Object.values(EXAM_PRESETS).map((exam, idx) => (
        <div key={idx} className="group bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
            <span className="text-brand dark:text-blue-400 font-black text-lg">{exam.name.charAt(0)}</span>
          </div>
          <span className="font-black text-gray-900 dark:text-white text-xs uppercase tracking-tighter leading-tight">{exam.name}</span>
          <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-2 font-black uppercase tracking-widest">Photo & Sign</span>
        </div>
      ))}
    </div>
  </div>
);

export default SupportedExamsSection;

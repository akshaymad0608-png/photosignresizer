import React from 'react';
import { EXAM_PRESETS } from '../../constants';

const SupportedExamsSection = () => (
  <div className="bg-white dark:bg-gray-900/50 rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 mb-24 relative overflow-hidden group/section">
    <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 dark:bg-cyan-500/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 dark:bg-brand/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
    
    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-16 text-center tracking-tight relative z-10">Supported Government Exams</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
      {Object.values(EXAM_PRESETS).map((exam, idx) => (
        <div key={idx} className="group bg-gray-50/50 dark:bg-gray-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl hover:shadow-brand/5 dark:hover:shadow-cyan-500/5 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent dark:from-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-gray-100 dark:border-gray-700 group-hover:scale-110 group-hover:shadow-md transition-all duration-500 relative z-10">
            <span className="text-brand dark:text-cyan-400 font-black text-lg">{exam.name.charAt(0)}</span>
          </div>
          <span className="font-black text-gray-900 dark:text-white text-xs uppercase tracking-tighter leading-tight relative z-10 group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors">{exam.name}</span>
          <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-2 font-black uppercase tracking-widest relative z-10">Photo & Sign</span>
        </div>
      ))}
    </div>
  </div>
);

export default SupportedExamsSection;

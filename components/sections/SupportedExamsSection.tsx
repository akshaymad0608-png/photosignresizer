import React from 'react';
import { EXAM_PRESETS } from '../../constants';

const SupportedExamsSection = () => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 sm:p-12 md:p-16 mb-16 sm:mb-24">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center tracking-tight">Supported Government Exams</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
      {Object.values(EXAM_PRESETS).map((exam, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center transition-colors">
          <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3">
            <span className="text-brand dark:text-cyan-400 font-bold">{exam.name.charAt(0)}</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-xs leading-tight">{exam.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SupportedExamsSection;

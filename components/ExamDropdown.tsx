import React from 'react';
import { EXAM_PRESETS } from '../constants';
import { ExamRequirement } from '../types';
import { ChevronDown } from 'lucide-react';

interface ExamDropdownProps {
  selectedExam: ExamRequirement;
  onSelect: (exam: ExamRequirement) => void;
  label: string;
}

const ExamDropdown: React.FC<ExamDropdownProps> = ({ selectedExam, onSelect, label }) => {
  const categories = Array.from(new Set(EXAM_PRESETS.map(e => e.category)));

  return (
    <div className="w-full mb-8 relative group">
      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        {label}
      </label>
      <div className="relative">
        <select
          className="appearance-none block w-full px-5 py-4 text-base font-bold border-2 border-gray-100 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand dark:focus:border-blue-500 sm:text-sm rounded-2xl shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pr-12 transition-all cursor-pointer hover:border-gray-200 dark:hover:border-gray-600"
          value={selectedExam.id}
          onChange={(e) => {
            const exam = EXAM_PRESETS.find(ex => ex.id === e.target.value);
            if (exam) onSelect(exam);
          }}
        >
          {categories.map((cat) => (
            <optgroup key={cat} label={cat} className="font-black text-brand dark:text-blue-400 bg-white dark:bg-gray-800">
              {EXAM_PRESETS.filter(e => e.category === cat).map(exam => (
                <option key={exam.id} value={exam.id} className="text-gray-900 dark:text-gray-100 font-bold py-2">
                  {exam.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 dark:text-gray-500">
          <ChevronDown size={20} className="group-hover:text-brand transition-colors" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 px-2">
        <div className="w-1.5 h-1.5 rounded-full bg-brand dark:bg-blue-500 animate-pulse"></div>
        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400 dark:text-gray-500">
          Current: <span className="text-gray-900 dark:text-white">{selectedExam.name}</span>
        </span>
      </div>
    </div>
  );
};

export default ExamDropdown;
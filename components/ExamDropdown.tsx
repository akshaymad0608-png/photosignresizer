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
      <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3 ml-1">
        {label}
      </label>
      <div className="relative">
        <select
          className="appearance-none block w-full px-4 py-3 sm:px-6 sm:py-4.5 text-sm font-black border-2 border-gray-200/80 dark:border-gray-800 focus:outline-none focus:ring-4 focus:ring-brand/10 dark:focus:ring-cyan-500/10 focus:border-brand dark:focus:border-cyan-500 sm:text-base rounded-2xl shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-900 dark:text-white pr-12 transition-all cursor-pointer hover:border-brand/30 dark:hover:border-cyan-500/30 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md"
          value={selectedExam.id}
          onChange={(e) => {
            const exam = EXAM_PRESETS.find(ex => ex.id === e.target.value);
            if (exam) onSelect(exam);
          }}
        >
          {categories.map((cat) => (
            <optgroup key={cat} label={cat} className="font-black text-brand dark:text-cyan-400 bg-white dark:bg-gray-900 py-2">
              {EXAM_PRESETS.filter(e => e.category === cat).map(exam => (
                <option key={exam.id} value={exam.id} className="text-gray-700 dark:text-gray-300 font-bold py-3 text-sm">
                  {exam.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-400 dark:text-gray-500">
          <ChevronDown size={20} className="group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors group-hover:translate-y-0.5 duration-300" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2.5 px-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand dark:bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand dark:bg-cyan-500"></span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Selected: <span className="text-brand dark:text-cyan-400">{selectedExam.name}</span>
        </span>
      </div>
    </div>
  );
};

export default ExamDropdown;
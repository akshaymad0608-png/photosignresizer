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
    <div className="w-full mb-8 relative">
      <label htmlFor="exam-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 ml-1">
        {label}
      </label>
      <div className="relative">
        <select
          id="exam-select"
          className="appearance-none block w-full px-4 py-3 text-sm font-medium border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10 transition-colors cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
          value={selectedExam.id}
          onChange={(e) => {
            const exam = EXAM_PRESETS.find(ex => ex.id === e.target.value);
            if (exam) onSelect(exam);
          }}
        >
          {categories.map((cat) => (
            <optgroup key={cat} label={cat} className="font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
              {EXAM_PRESETS.filter(e => e.category === cat).map(exam => (
                <option key={exam.id} value={exam.id} className="text-gray-700 dark:text-gray-300">
                  {exam.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
};

export default ExamDropdown;
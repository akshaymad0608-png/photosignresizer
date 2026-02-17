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
    <div className="w-full mb-6 relative group">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          className="appearance-none block w-full px-4 py-3 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-govBlue focus:border-govBlue sm:text-sm rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pr-10"
          value={selectedExam.id}
          onChange={(e) => {
            const exam = EXAM_PRESETS.find(ex => ex.id === e.target.value);
            if (exam) onSelect(exam);
          }}
        >
          {categories.map((cat) => (
            <optgroup key={cat} label={cat} className="font-bold text-govBlue dark:text-blue-400">
              {EXAM_PRESETS.filter(e => e.category === cat).map(exam => (
                <option key={exam.id} value={exam.id} className="text-gray-900 dark:text-gray-100 font-normal">
                  {exam.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <ChevronDown size={16} />
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Selected: <span className="font-semibold text-govBlue dark:text-blue-400">{selectedExam.name}</span>
      </div>
    </div>
  );
};

export default ExamDropdown;
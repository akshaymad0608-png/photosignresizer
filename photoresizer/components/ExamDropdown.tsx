import React, { useMemo, useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { EXAM_PRESETS } from '../constants';
import { ExamRequirement } from '../types';

interface ExamDropdownProps {
  selectedExam: ExamRequirement;
  onSelect: (exam: ExamRequirement) => void;
  label: string;
}

/**
 * There are 50+ presets. A native select buries them, so this is a
 * type-to-filter list that also matches on the numbers people search by
 * ("50kb", "350x450") — the way aspirants actually describe their form.
 */
const ExamDropdown = ({ selectedExam, onSelect, label }: ExamDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EXAM_PRESETS;
    return EXAM_PRESETS.filter(e => {
      const haystack = [
        e.name,
        e.category,
        `${e.photo.width}x${e.photo.height}`,
        `${e.photo.maxKB}kb`,
        `${e.signature.width}x${e.signature.height}`,
        `${e.signature.maxKB}kb`,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, ExamRequirement[]>();
    results.forEach(e => {
      if (!map.has(e.category)) map.set(e.category, []);
      map.get(e.category)!.push(e);
    });
    return Array.from(map.entries());
  }, [results]);

  return (
    <div className="relative">
      <label className="label-field block mb-2">{label}</label>

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg border border-rule bg-card text-left hover:border-muted transition-colors"
      >
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold text-ink truncate">
            {selectedExam.name}
          </span>
          <span className="block font-mono text-[11px] text-muted truncate">
            {selectedExam.photo.width}×{selectedExam.photo.height}px · {selectedExam.photo.minKB}–
            {selectedExam.photo.maxKB}KB
          </span>
        </span>
        <ChevronDown
          size={17}
          className={`shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute z-40 left-0 right-0 mt-2 card shadow-xl shadow-ink/10 overflow-hidden animate-fade-in">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-rule">
              <Search size={15} className="text-muted shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Exam name, 350x450, or 50kb"
                className="w-full bg-transparent outline-none text-[14px] text-ink placeholder:text-muted"
              />
            </div>

            <div className="max-h-72 overflow-y-auto">
              {grouped.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <p className="text-[14px] text-ink font-semibold">No preset matches "{query}"</p>
                  <p className="text-[12px] text-muted mt-1">
                    Pick Custom Size and type the numbers from your notification.
                  </p>
                </div>
              )}

              {grouped.map(([category, exams]) => (
                <div key={category}>
                  <div className="label-field sticky top-0 bg-card-sunk px-3.5 py-1.5 border-y border-rule-soft">
                    {category}
                  </div>
                  {exams.map(exam => {
                    const active = exam.id === selectedExam.id;
                    return (
                      <button
                        key={exam.id}
                        onClick={() => {
                          onSelect(exam);
                          setOpen(false);
                          setQuery('');
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left border-b border-rule-soft transition-colors ${
 active ? 'bg-signal-tint' : 'hover:bg-card-sunk'
 }`}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] font-medium text-ink truncate">
                            {exam.name}
                          </span>
                          <span className="block font-mono text-[11px] text-muted">
                            {exam.photo.width}×{exam.photo.height} · {exam.photo.maxKB}KB max
                          </span>
                        </span>
                        {active && <Check size={15} className="text-signal shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExamDropdown;

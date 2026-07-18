import React, { useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { EXAM_PRESETS } from '../../constants';
import { ExamRequirement, Language } from '../../types';

interface Props {
  lang?: Language;
  onSelectExam?: (exam: ExamRequirement) => void;
}

const CATEGORIES = ['All', 'Central', 'Entrance', 'Defence', 'State PSC'] as const;

const COPY = {
  en: {
    heading: 'Supported exams',
    sub: 'Sizes taken from the official notification. Pick one and the tool configures itself.',
    search: 'Search exam, size or KB…',
    empty: 'No exam matched. Use Custom to enter your own numbers.',
    use: 'Use these specs',
  },
  hi: {
    heading: 'समर्थित परीक्षाएँ',
    sub: 'आकार आधिकारिक अधिसूचना से लिए गए हैं। एक चुनिए और टूल खुद सेट हो जाएगा।',
    search: 'परीक्षा, आकार या KB खोजिए…',
    empty: 'कोई परीक्षा नहीं मिली। Custom में अपने नंबर डालिए।',
    use: 'ये आकार लगाइए',
  },
};

export default function SupportedExamsSection({ lang = 'en', onSelectExam }: Props) {
  const c = COPY[lang === 'hi' ? 'hi' : 'en'];
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('All');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, '');
    return EXAM_PRESETS.filter(e => {
      if (cat !== 'All' && e.category !== cat) return false;
      if (!q) return true;
      const hay = [
        e.name,
        e.category,
        `${e.photo.width}x${e.photo.height}`,
        `${e.photo.maxKB}kb`,
        `${e.signature.width}x${e.signature.height}`,
      ]
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '');
      return hay.includes(q);
    });
  }, [query, cat]);

  return (
    <section className="mb-16">
      <h2 className="mb-2">{c.heading}</h2>
      <p className="text-[15px] text-fg-muted mb-6 max-w-[62ch]">{c.sub}</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-faint pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={c.search}
            aria-label={c.search}
            className="field w-full pl-9"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar" role="tablist" aria-label="Category">
          {CATEGORIES.map(x => (
            <button
              key={x}
              type="button"
              role="tab"
              aria-selected={cat === x}
              onClick={() => setCat(x)}
              className={`pill shrink-0 transition-colors ${
                cat === x
                  ? 'pill-brand'
                  : 'bg-surface border border-line text-fg-muted hover:text-brand-600 hover:border-brand-400'
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="card-sunk py-10 text-center text-[14px] text-fg-muted">{c.empty}</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(e => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => onSelectExam?.(e)}
                className="card card-lift w-full text-left p-4 group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-[14.5px] font-semibold text-fg leading-snug">{e.name}</h3>
                  <span className="pill bg-surface-2 text-fg-muted text-[10.5px] shrink-0">
                    {e.category}
                  </span>
                </div>

                <dl className="space-y-1 font-mono text-[12px] tabular-nums text-fg-muted">
                  <div className="flex justify-between gap-2">
                    <dt>Photo</dt>
                    <dd className="text-fg-soft">
                      {e.photo.width}×{e.photo.height} · ≤{e.photo.maxKB}KB
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt>Sign</dt>
                    <dd className="text-fg-soft">
                      {e.signature.width}×{e.signature.height} · ≤{e.signature.maxKB}KB
                    </dd>
                  </div>
                </dl>

                <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {c.use}
                  <ArrowRight size={13} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

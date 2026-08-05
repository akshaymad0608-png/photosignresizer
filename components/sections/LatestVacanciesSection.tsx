import React, { useMemo, useState } from 'react';
import { ExternalLink, CalendarClock, Clock, AlertTriangle, Search, MapPin, X } from 'lucide-react';
import {
  VACANCIES,
  AS_OF,
  resolveLink,
  isExpired,
  parseLastDate,
  type Vacancy,
} from '../../data/vacancies';

type LinkKind = 'apply' | 'result' | 'admitCard';

const COLUMNS: { kind: LinkKind; heading: string; suffix: string }[] = [
  { kind: 'apply', heading: 'Latest jobs', suffix: 'Online Form' },
  { kind: 'result', heading: 'Results', suffix: 'Result' },
  { kind: 'admitCard', heading: 'Admit cards', suffix: 'Admit Card' },
];

const FILTERS = ['All', 'Central Govt', 'State Govt', 'Banking', 'Railway', 'Defence'] as const;

/** Days left, or null when the date can't be parsed. */
function daysLeft(job: Vacancy): number | null {
  const d = parseLastDate(job.lastDate);
  if (!d) return null;
  const today = new Date();
  const ms = d.getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return Math.round(ms / 86_400_000);
}

/**
 * One row in a column. A link is only ever rendered as an anchor when a real
 * URL exists — a missing URL renders as plain text, never as href="#".
 */
interface JobLinkProps {
  job: Vacancy;
  kind: LinkKind;
  suffix: string;
}

const JobLink: React.FC<JobLinkProps> = ({ job, kind, suffix }) => {
  const target = resolveLink(job, kind);
  const label = `${job.board} ${job.post} ${suffix} 2026`;

  if (!target) {
    return (
      <li className="flex items-start gap-2 py-2 border-b border-line-soft last:border-0">
        <span className="flex-1 text-[13.5px] leading-snug text-fg-faint">{label}</span>
        <span className="pill bg-surface-2 text-fg-faint text-[10px] shrink-0 mt-0.5">
          Link soon
        </span>
      </li>
    );
  }

  return (
    <li className="border-b border-line-soft last:border-0">
      <a
        href={target.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-2 py-2 group"
      >
        <span className="flex-1 text-[13.5px] leading-snug text-fg-soft group-hover:text-brand-600 transition-colors">
          {label}
        </span>
        {!target.exact && (
          <span
            className="pill bg-surface-2 text-fg-muted text-[10px] shrink-0 mt-0.5"
            title="Goes to the official portal — search there for this notification"
          >
            Portal
          </span>
        )}
        <ExternalLink
          size={13}
          className="shrink-0 mt-1 text-fg-faint group-hover:text-brand-600 transition-colors"
        />
      </a>
    </li>
  );
};

export default function LatestVacanciesSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [stateFilter, setStateFilter] = useState('All states');
  const [query, setQuery] = useState('');

  // Unique states present in the data, for the dropdown.
  const states = useMemo(
    () => ['All states', ...Array.from(new Set(VACANCIES.map(j => j.state))).sort()],
    [],
  );

  const jobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = VACANCIES.filter(
      j =>
        (filter === 'All' || j.category === filter) &&
        (stateFilter === 'All states' || j.state === stateFilter) &&
        (!q || `${j.board} ${j.post} ${j.state}`.toLowerCase().includes(q)),
    );
    // Soonest deadline first; undated and expired entries sink to the bottom.
    return [...list].sort((a, b) => {
      const ea = isExpired(a) ? 1 : 0;
      const eb = isExpired(b) ? 1 : 0;
      if (ea !== eb) return ea - eb;
      const da = parseLastDate(a.lastDate)?.getTime() ?? Infinity;
      const db = parseLastDate(b.lastDate)?.getTime() ?? Infinity;
      return da - db;
    });
  }, [filter, stateFilter, query]);

  const featured = jobs.filter(j => !isExpired(j)).slice(0, 6);
  const openCount = jobs.filter(j => !isExpired(j)).length;
  const activeFilters = filter !== 'All' || stateFilter !== 'All states' || query.trim() !== '';

  return (
    <section className="mb-16">
      <h2 className="mb-2">Latest vacancies</h2>
      <p className="text-[15px] text-fg-muted mb-2 max-w-[62ch]">
        Sorted by closing date. Search or filter by exam, state and category. Always confirm details
        on the official notification before applying.
      </p>
      <p className="font-mono text-[12px] text-fg-faint mb-6">
        List last checked: {AS_OF} · {VACANCIES.length} listings · {openCount} shown
      </p>

      {/* Search + state */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
        <div className="relative flex-1">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-faint"
          />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search exam or board — SSC, UPPSC, police, clerk…"
            aria-label="Search vacancies"
            className="w-full h-11 rounded-xl border border-line bg-surface pl-9 pr-3 text-[14px] text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-brand-400"
          />
        </div>
        <div className="relative sm:w-56">
          <MapPin
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-faint"
          />
          <select
            value={stateFilter}
            onChange={e => setStateFilter(e.target.value)}
            aria-label="Filter by state"
            className="w-full h-11 rounded-xl border border-line bg-surface pl-9 pr-8 text-[14px] text-fg outline-none appearance-none transition-colors focus:border-brand-400"
          >
            {states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-6" role="tablist" aria-label="Job category">
        {FILTERS.map(f => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`pill shrink-0 transition-colors ${
              filter === f
                ? 'pill-brand'
                : 'bg-surface border border-line text-fg-muted hover:text-brand-600 hover:border-brand-400'
            }`}
          >
            {f}
          </button>
        ))}
        {activeFilters && (
          <button
            type="button"
            onClick={() => { setFilter('All'); setStateFilter('All states'); setQuery(''); }}
            className="pill shrink-0 inline-flex items-center gap-1 bg-surface border border-line text-fg-faint hover:text-danger hover:border-danger/40 transition-colors"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {jobs.length === 0 && (
        <div className="card p-8 text-center text-[14px] text-fg-muted mb-10">
          No vacancies match your search.{' '}
          <button
            type="button"
            onClick={() => { setFilter('All'); setStateFilter('All states'); setQuery(''); }}
            className="font-semibold text-brand-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Closing soon */}
      {featured.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {featured.map(job => {
            const left = daysLeft(job);
            const urgent = left !== null && left <= 7;
            const target = resolveLink(job, 'apply');

            const body = (
              <>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h3 className="text-[14.5px] font-semibold text-fg leading-snug">{job.board}</h3>
                    <p className="text-[13px] text-fg-muted mt-0.5">{job.post}</p>
                  </div>
                  <span className="pill bg-surface-2 text-fg-muted text-[10.5px] shrink-0">
                    {job.vacancies}
                  </span>
                </div>

                <dl className="text-[12px] text-fg-muted space-y-1 mb-3">
                  <div className="flex gap-1.5">
                    <dt className="sr-only">Qualification</dt>
                    <dd>{job.qualification}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarClock size={12} aria-hidden="true" />
                    <dt className="sr-only">Last date</dt>
                    <dd className="font-mono tabular-nums">{job.lastDate}</dd>
                    {!job.verified && (
                      <dd
                        className="pill bg-surface-2 text-fg-faint text-[10px]"
                        title={`Not re-checked on ${AS_OF} — confirm the date on the official site`}
                      >
                        Unconfirmed
                      </dd>
                    )}
                  </div>
                </dl>

                <div className="flex items-center justify-between gap-2">
                  {left !== null && (
                    <span
                      className={`inline-flex items-center gap-1 text-[11.5px] font-semibold ${
                        urgent ? 'text-danger' : 'text-success'
                      }`}
                    >
                      <Clock size={11} aria-hidden="true" />
                      {left === 0 ? 'Closes today' : `${left} days left`}
                    </span>
                  )}
                  {target ? (
                    <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600">
                      Apply
                      <ExternalLink size={12} />
                    </span>
                  ) : (
                    <span className="text-[11.5px] text-fg-faint">Link soon</span>
                  )}
                </div>
              </>
            );

            return (
              <li key={job.id}>
                {target ? (
                  <a
                    href={target.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-lift p-4 block h-full"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="card p-4 h-full opacity-75">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Three columns */}
      {jobs.length > 0 && (
      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map(col => (
          <div key={col.kind} className="card overflow-hidden">
            <h3 className="px-4 py-3 border-b border-line text-[13px] font-bold uppercase tracking-[0.1em] text-fg bg-surface-2">
              {col.heading}
            </h3>
            <ul className="px-4 py-1 max-h-[380px] overflow-y-auto">
              {jobs.map(job => (
                <JobLink key={`${col.kind}-${job.id}`} job={job} kind={col.kind} suffix={col.suffix} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      )}

      <p className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-fg-muted">
        <AlertTriangle size={13} className="shrink-0 mt-0.5 text-warning" aria-hidden="true" />
        This list is compiled from public job listings and is not an official source. Entries marked{' '}
        <strong className="font-semibold">Portal</strong> open the board's official homepage rather
        than the exact notification page. <strong className="font-semibold">Link soon</strong> means
        no confirmed official URL yet, so the row is plain text instead of a dead link.{' '}
        <strong className="font-semibold">Unconfirmed</strong> means the date was not re-checked on{' '}
        {AS_OF}. Always verify on the official website before paying any fee.
      </p>
    </section>
  );
}

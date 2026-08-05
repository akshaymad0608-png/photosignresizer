import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Search, X } from 'lucide-react';
import { TOOLS, TOOL_GROUPS, type Tool } from '../../data/tools';

const OUTPUT_LABEL: Record<Tool['output'], string> = {
  png: 'PNG',
  jpeg: 'JPG',
  webp: 'WebP',
  pdf: 'PDF',
  same: 'Keeps format',
};

/**
 * Lists only the tools that genuinely work. The catalogue used to advertise
 * PDF, video and archive conversion that the browser pipeline cannot do.
 */
export default function ToolCategorySection() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<'All' | (typeof TOOL_GROUPS)[number]>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter(
      t =>
        (cat === 'All' || t.group === cat) &&
        (!q || `${t.name} ${t.blurb} ${t.group}`.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  const active = query.trim() !== '' || cat !== 'All';
  const reset = () => { setQuery(''); setCat('All'); };
  const groupsToShow = cat === 'All' ? TOOL_GROUPS : [cat];

  return (
    <section className="mb-16">
      <h2 className="mb-2">Free image tools</h2>
      <p className="text-[15px] text-fg-muted mb-2 max-w-[62ch]">
        Small, single-purpose tools that run entirely on your device.
      </p>
      <p className="mb-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-success">
        <ShieldCheck size={13} />
        No uploads, no sign-up, no file size limit · {filtered.length} of {TOOLS.length} tools
      </p>

      {/* Search */}
      <div className="relative max-w-md mb-4">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-faint"
        />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search tools — resize, compress, WebP, background…"
          aria-label="Search image tools"
          className="w-full h-11 rounded-xl border border-line bg-surface pl-9 pr-3 text-[14px] text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-brand-400"
        />
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-8" role="tablist" aria-label="Tool category">
        {(['All', ...TOOL_GROUPS] as const).map(g => {
          const count = g === 'All' ? TOOLS.length : TOOLS.filter(t => t.group === g).length;
          return (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={cat === g}
              onClick={() => setCat(g)}
              className={`pill shrink-0 transition-colors ${
                cat === g
                  ? 'pill-brand'
                  : 'bg-surface border border-line text-fg-muted hover:text-brand-600 hover:border-brand-400'
              }`}
            >
              {g} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
        {active && (
          <button
            type="button"
            onClick={reset}
            className="pill shrink-0 inline-flex items-center gap-1 bg-surface border border-line text-fg-faint hover:text-danger hover:border-danger/40 transition-colors"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-8 text-center text-[14px] text-fg-muted">
          No tool matches your search.{' '}
          <button type="button" onClick={reset} className="font-semibold text-brand-600 hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {groupsToShow.map(group => {
            const items = filtered.filter(t => t.group === group);
            if (items.length === 0) return null;

            return (
              <div key={group}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-fg-muted mb-4">
                  {group}
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(tool => (
                    <li key={tool.id}>
                      <Link to={`/tools/${tool.id}`} className="card card-lift p-4 block h-full group">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-[14.5px] font-semibold text-fg">{tool.name}</h4>
                          <span className="pill bg-surface-2 text-fg-faint text-[10px] shrink-0 mt-0.5">
                            {OUTPUT_LABEL[tool.output]}
                          </span>
                        </div>
                        <p className="text-[13px] leading-snug text-fg-muted">{tool.blurb}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          Open tool
                          <ArrowRight size={13} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

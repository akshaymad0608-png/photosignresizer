import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { TOOLS, TOOL_GROUPS } from '../../data/tools';

/**
 * Lists only the tools that genuinely work. The catalogue used to advertise
 * PDF, video and archive conversion that the browser pipeline cannot do.
 */
export default function ToolCategorySection() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter(t => `${t.name} ${t.blurb} ${t.group}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="mb-16">
      <h2 className="mb-2">Free image tools</h2>
      <p className="text-[15px] text-fg-muted mb-2 max-w-[62ch]">
        Small, single-purpose tools that run entirely on your device.
      </p>
      <p className="mb-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-success">
        <ShieldCheck size={13} />
        No uploads, no sign-up, no file size limit · {TOOLS.length} tools
      </p>

      {/* Search */}
      <div className="relative max-w-md mb-8">
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

      {filtered.length === 0 ? (
        <div className="card p-8 text-center text-[14px] text-fg-muted">
          No tool matches “{query.trim()}”.{' '}
          <button
            type="button"
            onClick={() => setQuery('')}
            className="font-semibold text-brand-600 hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {TOOL_GROUPS.map(group => {
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
                        <h4 className="text-[14.5px] font-semibold text-fg mb-1.5">{tool.name}</h4>
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

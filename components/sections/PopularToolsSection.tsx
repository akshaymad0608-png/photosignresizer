import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { TOOLS } from '../../data/tools';

// A hand-picked shortlist for the home page; the full catalogue lives on
// /free-image-tools. IDs that don't exist are skipped, so this never breaks.
const FEATURED = [
  'passport-photo',
  'image-compressor',
  'remove-background',
  'jpg-to-png',
  'add-white-background',
  'resize-200x230',
  'signature-300x80',
  'image-to-pdf',
];

export default function PopularToolsSection() {
  const tools = FEATURED.map(id => TOOLS.find(t => t.id === id)).filter(Boolean) as typeof TOOLS;

  return (
    <section className="shell mt-16">
      <div className="flex items-end justify-between gap-4 mb-1">
        <h2 className="mb-0">Popular image tools</h2>
        <Link
          to="/free-image-tools"
          className="shrink-0 inline-flex items-center gap-1 text-[13px] font-bold text-brand-600 hover:underline"
        >
          All {TOOLS.length} tools <ArrowRight size={14} />
        </Link>
      </div>
      <p className="mb-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-success">
        <ShieldCheck size={13} />
        Free · private · instant — no uploads, no sign-up
      </p>

      <ul className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map(tool => (
          <li key={tool.id}>
            <Link to={`/tools/${tool.id}`} className="card card-lift p-4 block h-full group">
              <h3 className="text-[14px] font-semibold text-fg leading-snug mb-1">{tool.name}</h3>
              <p className="text-[12.5px] leading-snug text-fg-muted">{tool.blurb}</p>
              <span className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Open tool
                <ArrowRight size={12} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

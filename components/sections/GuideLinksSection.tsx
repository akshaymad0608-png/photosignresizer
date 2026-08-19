import React from 'react';
import { GUIDE_GROUPS, GUIDE_COUNT } from '../../data/guides';

/**
 * Internal links to the static exam and size guides.
 *
 * These pages had no link path in the rendered site. The only anchors pointing
 * at them sat in index.html's `.seo-fallback` block inside #root, and React
 * discards that on mount — so a crawler executing JavaScript, which Google
 * does, saw a homepage with no route to any of them.
 *
 * Plain <a> rather than react-router <Link>: these are static .html files in
 * public/, not app routes, so the router must not intercept the click.
 *
 * The qualifier sits outside the anchor deliberately. "SSC photo & signature
 * size (CGL, CHSL, MTS, JE)" is a nine-word anchor; closing the link before
 * the bracket keeps it to five words while the exam codes stay on the page as
 * text, which is where they earn their keep.
 */
export default function GuideLinksSection() {
  return (
    <section className="shell mt-16">
      <h2 className="mb-1">Exam photo &amp; signature size guides</h2>
      <p className="mb-6 text-[13.5px] text-fg-muted max-w-[62ch]">
        {GUIDE_COUNT} guides with the exact pixel dimensions and KB limits each
        form asks for. Always confirm against the current notification before
        you upload.
      </p>

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {GUIDE_GROUPS.map(group => (
          <div key={group.heading}>
            <h3 className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em] text-fg-muted">
              {group.heading}
            </h3>
            <ul className="space-y-1.5">
              {group.links.map(link => (
                <li key={link.href} className="text-[13.5px] leading-snug">
                  <a href={link.href} className="text-fg-soft hover:text-brand-600 hover:underline">
                    {link.label}
                  </a>
                  {link.note && <span className="text-fg-faint"> ({link.note})</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

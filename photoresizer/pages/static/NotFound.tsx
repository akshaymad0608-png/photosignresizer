import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Seo from '../../seo/Seo';

const SUGGESTIONS = [
  { label: 'Photo & signature resizer', href: '/' },
  { label: 'All free image tools', href: '/free-image-tools' },
  { label: 'Frequently asked questions', href: '/faq' },
  { label: 'Latest vacancies', href: '/jobs' },
];

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found — PhotoResizer"
        description="This page could not be found. Head back to the photo and signature resizer."
        path="/404"
        noindex
      />
    <div className="min-h-screen flex flex-col bg-bg">
      <Header onOpenSearch={() => {}} />

      <main className="flex-grow flex items-center aurora">
        <div className="shell py-24 text-center max-w-[52ch]">
          <p className="font-mono text-[13px] font-semibold tracking-[0.2em] text-brand-600 mb-4">
            ERROR 404
          </p>

          <h1 className="font-display text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-extrabold tracking-tight text-fg leading-tight">
            That page didn't <span className="grad-text">resize into view</span>.
          </h1>

          <p className="mt-4 text-[16px] leading-relaxed text-fg-soft">
            The link may be old, or the page may have moved. The resizer itself is still exactly
            where you left it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn btn-primary btn-lg">
              <Home size={17} />
              Back to the resizer
            </Link>
            <Link to="/free-image-tools" className="btn btn-outline btn-lg">
              <Search size={17} />
              Browse all tools
            </Link>
          </div>

          <ul className="mt-12 grid gap-2 sm:grid-cols-2 text-left">
            {SUGGESTIONS.map(s => (
              <li key={s.href}>
                <Link
                  to={s.href}
                  className="card card-lift p-3.5 flex items-center justify-between gap-2 text-[13.5px] font-medium text-fg-soft hover:text-brand-600"
                >
                  {s.label}
                  <ArrowRight size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
    </>
  );
}

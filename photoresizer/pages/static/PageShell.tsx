import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Seo from '../../seo/Seo';
import { breadcrumbSchema, webPageSchema } from '../../seo/schema';

interface Props {
  title: string;
  intro?: string;
  updated?: string;
  /** Route path — used for the canonical URL and breadcrumb schema. */
  path: string;
  /** Meta description; falls back to the intro paragraph. */
  description?: string;
  noindex?: boolean;
  children: React.ReactNode;
}

/** Shared frame for the static content pages: SEO, header, breadcrumb, prose, footer. */
export default function PageShell({
  title,
  intro,
  updated,
  path,
  description,
  noindex,
  children,
}: Props) {
  const desc = description || intro || `${title} — PhotoResizer`;

  return (
    <>
      <Seo
        title={`${title} — PhotoResizer`}
        description={desc}
        path={path}
        noindex={noindex}
        schema={[
          webPageSchema({ title, description: desc, path }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: title, path },
          ]),
        ]}
      />

      <div className="min-h-screen flex flex-col bg-bg">
        <Header onOpenSearch={() => {}} />

        <main id="main" className="flex-grow pt-24 pb-16">
          <div className="shell max-w-[76ch]">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-[12.5px] text-fg-muted">
                <li>
                  <Link to="/" className="hover:text-brand-600 transition-colors">
                    Home
                  </Link>
                </li>
                <ChevronRight size={13} aria-hidden="true" />
                <li aria-current="page" className="text-fg-soft font-medium">
                  {title}
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.8rem)] font-extrabold tracking-tight text-fg leading-tight">
              {title}
            </h1>

            {intro && <p className="mt-4 text-[16.5px] leading-relaxed text-fg-soft">{intro}</p>}

            {updated && (
              <p className="mt-3 font-mono text-[12px] text-fg-faint">Last updated: {updated}</p>
            )}

            <div className="prose-page mt-10">{children}</div>
          </div>
        </main>

        <React.Suspense fallback={<div className="h-56" />}>
          <Footer lang="en" />
        </React.Suspense>
      </div>
    </>
  );
}

import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ShieldCheck, WifiOff, Gauge, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GenericUploader from '../components/GenericUploader';
import Seo from '../seo/Seo';
import { breadcrumbSchema, webPageSchema } from '../seo/schema';
import { getTool, RETIRED_TOOL_IDS, TOOLS } from '../data/tools';

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = getTool(toolId);

  // Retired or unknown tool IDs must not render a page — they would be thin,
  // duplicated content competing with the tools that actually work.
  if (!tool) {
    if (toolId && RETIRED_TOOL_IDS.includes(toolId)) {
      return <Navigate to="/free-image-tools" replace />;
    }
    return <Navigate to="/404" replace />;
  }

  const path = `/tools/${tool.id}`;
  const related = TOOLS.filter(t => t.id !== tool.id && t.group === tool.group).slice(0, 3);

  return (
    <>
      <Seo
        title={`${tool.name} — free and private | PhotoResizer`}
        description={tool.blurb}
        path={path}
        schema={[
          webPageSchema({ title: tool.name, description: tool.blurb, path }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Free image tools', path: '/free-image-tools' },
            { name: tool.name, path },
          ]),
        ]}
      />

      <div className="min-h-screen flex flex-col bg-bg">
        <Header onOpenSearch={() => {}} />

        <main id="main" className="flex-grow pt-24 pb-16">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-fg-muted">
                <li><Link to="/" className="hover:text-brand-600 transition-colors">Home</Link></li>
                <ChevronRight size={13} aria-hidden="true" />
                <li>
                  <Link to="/free-image-tools" className="hover:text-brand-600 transition-colors">
                    Free image tools
                  </Link>
                </li>
                <ChevronRight size={13} aria-hidden="true" />
                <li aria-current="page" className="text-fg-soft font-medium">{tool.name}</li>
              </ol>
            </nav>

            <div className="max-w-[62ch] mb-10">
              <h1 className="font-display text-[clamp(1.9rem,1.3rem+2.4vw,3rem)] font-extrabold tracking-tight text-fg leading-tight">
                {tool.name}
              </h1>
              <p className="mt-4 text-[16.5px] leading-relaxed text-fg-soft">{tool.blurb}</p>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <li className="flex items-center gap-2 text-[13px] font-medium text-fg-soft">
                  <ShieldCheck size={15} className="text-success" />
                  Nothing is uploaded
                </li>
                <li className="flex items-center gap-2 text-[13px] font-medium text-fg-soft">
                  <WifiOff size={15} className="text-success" />
                  Works offline
                </li>
                <li className="flex items-center gap-2 text-[13px] font-medium text-fg-soft">
                  <Gauge size={15} className="text-success" />
                  No file size cap
                </li>
              </ul>
            </div>

            <GenericUploader toolId={tool.id} toolName={tool.name} />

            <div className="mt-16 grid gap-6 lg:grid-cols-2 max-w-5xl">
              <section className="card p-6">
                <h2 className="font-display text-[20px] font-bold text-fg mb-4">How to use it</h2>
                <ol className="list-decimal pl-5 space-y-2 text-[14px] leading-relaxed text-fg-muted">
                  <li>Choose a file, or drag one onto the box above.</li>
                  <li>The file is read into a canvas in this page — it is not sent anywhere.</li>
                  <li>Press download. The converted file is written straight to your device.</li>
                </ol>
              </section>

              <section className="card p-6">
                <h2 className="font-display text-[20px] font-bold text-fg mb-4">Common questions</h2>
                <dl className="space-y-4 text-[14px] leading-relaxed">
                  <div>
                    <dt className="font-semibold text-fg mb-1">Are my files uploaded?</dt>
                    <dd className="text-fg-muted">
                      No. There is no upload endpoint. Everything runs in your browser, which is
                      also why the tool keeps working with the network switched off.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-fg mb-1">Does it work on a phone?</dt>
                    <dd className="text-fg-muted">
                      Yes. Very large images may be slow on older phones, since the work happens
                      on your device rather than on a server.
                    </dd>
                  </div>
                </dl>
              </section>
            </div>

            {related.length > 0 && (
              <section className="mt-12 max-w-5xl">
                <h2 className="font-display text-[18px] font-bold text-fg mb-4">Related tools</h2>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {related.map(t => (
                    <li key={t.id}>
                      <Link to={`/tools/${t.id}`} className="card card-lift p-4 block h-full">
                        <p className="text-[14px] font-semibold text-fg">{t.name}</p>
                        <p className="text-[12.5px] text-fg-muted mt-1 leading-snug">{t.blurb}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </main>

        <Footer lang="en" />
      </div>
    </>
  );
}

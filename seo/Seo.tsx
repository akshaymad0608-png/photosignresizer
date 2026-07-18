import { useEffect } from 'react';
import { abs, graph, SITE_NAME } from './schema';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** noindex for thin/utility pages like search results and 404 */
  noindex?: boolean;
  /** JSON-LD nodes to place in the @graph for this page */
  schema?: object[];
  /** og:type — 'website' | 'article' */
  type?: 'website' | 'article';
  keywords?: string;
}

const LD_ID = 'ld-json-page';

/** Idempotently upsert a <meta> tag. */
function meta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function link(rel: string, href: string, extra?: Record<string, string>) {
  const sel = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(extra || {}).forEach(([k, v]) => el!.setAttribute(k, v));
}

/**
 * Head manager. No extra dependency — writes directly to document.head and
 * cleans up the page-scoped JSON-LD block on unmount so schemas never stack.
 */
export default function Seo({
  title,
  description,
  path,
  image = '/og-image.png',
  noindex = false,
  schema = [],
  type = 'website',
  keywords,
}: SeoProps) {
  useEffect(() => {
    const canonical = abs(path);
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    meta('name', 'description', description);
    if (keywords) meta('name', 'keywords', keywords);
    meta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'
    );

    link('canonical', canonical);
    link('alternate', canonical, { hreflang: 'en-IN' });
    link('alternate', canonical, { hreflang: 'hi-IN' });
    link('alternate', canonical, { hreflang: 'x-default' });

    meta('property', 'og:type', type);
    meta('property', 'og:site_name', SITE_NAME);
    meta('property', 'og:locale', 'en_IN');
    meta('property', 'og:url', canonical);
    meta('property', 'og:title', fullTitle);
    meta('property', 'og:description', description);
    meta('property', 'og:image', abs(image));
    meta('property', 'og:image:width', '1200');
    meta('property', 'og:image:height', '630');
    meta('property', 'og:image:alt', `${SITE_NAME} — exam photo and signature resizer`);

    meta('name', 'twitter:card', 'summary_large_image');
    meta('name', 'twitter:title', fullTitle);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', abs(image));

    if (schema.length) {
      let el = document.getElementById(LD_ID);
      if (!el) {
        el = document.createElement('script');
        el.id = LD_ID;
        (el as HTMLScriptElement).type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(graph(schema));
    }

    return () => {
      document.getElementById(LD_ID)?.remove();
    };
  }, [title, description, path, image, noindex, type, keywords, schema]);

  return null;
}

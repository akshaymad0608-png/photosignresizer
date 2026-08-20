/**
 * Centralised JSON-LD builders. Every schema here is emitted by <Seo />.
 * Keeping them in one file means the graph stays internally consistent
 * (same @id values referenced across Organization / WebSite / WebPage).
 */

export const SITE_URL = 'https://photoresizer.click';
export const SITE_NAME = 'PhotoResizer';
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export const abs = (path = '/') =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const organizationSchema = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: abs('/icon-512.png'),
    width: 512,
    height: 512,
  },
  description:
    'Free browser-based photo and signature resizer built for Indian government exam application forms.',
  foundingDate: '2024',
  areaServed: { '@type': 'Country', name: 'India' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@photoresizer.click',
    availableLanguage: ['English', 'Hindi'],
  },
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: ['en-IN', 'hi-IN'],
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const softwareApplicationSchema = () => ({
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#app`,
  name: `${SITE_NAME} — Exam Photo & Signature Resizer`,
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Editor',
  operatingSystem: 'Any (web browser)',
  browserRequirements: 'Requires JavaScript and HTML5 Canvas',
  url: SITE_URL,
  image: abs('/og-image.png'),
  publisher: { '@id': ORG_ID },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  featureList: [
    'Resize to exact pixel dimensions',
    'Compress to a target KB range',
    'Signature resizing',
    'Crop, rotate and flip',
    'Background removal',
    'Format conversion (JPG, PNG, WebP)',
    'Combined photo and signature sheet',
    'Print sheet and PDF export',
    'Works entirely offline in the browser',
  ],
  // No aggregateRating here on purpose.
  //
  // It used to carry ratingValue 4.8 over ratingCount 1240. Those numbers were
  // string literals in this file: no review is collected anywhere in the app,
  // no rating is shown to a visitor, and nothing could ever have changed them.
  // Google's structured data rules bar marking up content a user cannot see,
  // and bar self-assigned ratings with no genuine review mechanism behind them
  // — that combination is what spammy-markup manual actions are for, and this
  // domain carries almost all of the site's search traffic.
  //
  // Re-add it only once real reviews are collected AND displayed on the page,
  // backed by individual Review items.
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

/**
 * howToSchema was removed here.
 *
 * Google retired HowTo rich results in September 2023, so it produced no
 * result and never will. On tool pages it was also wrong: every one emitted
 * the same generic "choose your exam, upload photo and signature" steps,
 * describing the homepage flow rather than that tool.
 */

export const webPageSchema = (o: {
  path: string;
  title: string;
  description: string;
  type?: string;
}) => ({
  '@type': o.type || 'WebPage',
  '@id': `${abs(o.path)}#webpage`,
  url: abs(o.path),
  name: o.title,
  description: o.description,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': ORG_ID },
  inLanguage: 'en-IN',
  primaryImageOfPage: { '@type': 'ImageObject', url: abs('/og-image.png') },
});

export const articleSchema = (o: {
  path: string;
  title: string;
  description: string;
  published: string;
  modified?: string;
  author?: string;
}) => ({
  '@type': 'Article',
  '@id': `${abs(o.path)}#article`,
  headline: o.title,
  description: o.description,
  image: abs('/og-image.png'),
  datePublished: o.published,
  dateModified: o.modified || o.published,
  author: { '@type': 'Person', name: o.author || 'PhotoResizer Editorial' },
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: { '@id': `${abs(o.path)}#webpage` },
});

/** Wrap any set of nodes into a single @graph document. */
export const graph = (nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});

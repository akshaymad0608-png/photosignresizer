/**
 * The static exam and size guide pages in public/.
 *
 * These 35 pages are plain HTML files, not React routes, so nothing in the app
 * imported them and nothing linked to them. Their only internal links lived in
 * the `.seo-fallback` block inside index.html's #root — which createRoot wipes
 * the moment React mounts. Raw HTML had the links; the rendered DOM Google
 * evaluates had none of them, on any route.
 *
 * Confirmed on the live site: the hydrated homepage carried 199 links and not
 * one pointed at a guide page. That left all 35 reachable only from sitemap.xml,
 * and URL Inspection duly reported "URL is unknown to Google" for several.
 *
 * Keeping the list here means the links survive hydration and the fallback
 * block and the rendered page can be built from the same source.
 */

export interface GuideLink {
  /** Path of the static file in public/, served at the site root. */
  href: string;
  label: string;
  /** Shown after the link as plain text — see the note in GuideLinksSection. */
  note?: string;
}

export interface GuideGroup {
  heading: string;
  links: GuideLink[];
}

export const GUIDE_GROUPS: GuideGroup[] = [
  {
    heading: 'Government exam photo & signature size',
    links: [
      { href: '/ssc-photo-signature-size.html', label: 'SSC photo & signature size', note: 'CGL, CHSL, MTS, JE' },
      { href: '/ssc-gd-constable-photo-signature-size.html', label: 'SSC GD Constable photo & signature size' },
      { href: '/upsc-photo-signature-size.html', label: 'UPSC photo & signature size' },
      { href: '/rrb-photo-signature-size.html', label: 'RRB photo & signature size', note: 'NTPC, Group D, ALP' },
      { href: '/upsssc-photo-signature-size.html', label: 'UPSSSC photo & signature size' },
      { href: '/isro-photo-signature-size.html', label: 'ISRO photo & signature size' },
      { href: '/state-psc-photo-signature-size.html', label: 'State PSC photo & signature size' },
      { href: '/police-constable-photo-signature-size.html', label: 'Police Constable photo & signature size' },
      { href: '/agniveer-photo-signature-size.html', label: 'Agniveer photo & signature size', note: 'Army, Navy, Air Force' },
      { href: '/neet-photo-signature-size.html', label: 'NEET photo & signature size' },
    ],
  },
  {
    heading: 'Bank & insurance form uploads',
    links: [
      { href: '/ibps-photo-signature-size.html', label: 'IBPS photo & signature size' },
      { href: '/sbi-photo-signature-size.html', label: 'SBI photo & signature size' },
      { href: '/rbi-photo-signature-size.html', label: 'RBI photo & signature size' },
      { href: '/nicl-photo-signature-size.html', label: 'NICL photo & signature size' },
      { href: '/lic-photo-signature-size.html', label: 'LIC photo & signature size' },
      { href: '/bank-exam-photo-signature-size.html', label: 'Bank exam photo & signature size' },
      { href: '/epfo-photo-signature-size.html', label: 'EPFO photo & signature size' },
      { href: '/tcs-photo-signature-size.html', label: 'TCS NQT & iON photo & signature size' },
      { href: '/handwritten-declaration-resizer.html', label: 'Handwritten declaration size', note: '50 KB / 100 KB' },
      { href: '/thumb-impression-resizer.html', label: 'Thumb impression size', note: '240 × 240 px' },
    ],
  },
  {
    heading: 'Identity documents',
    links: [
      { href: '/passport-size-photo.html', label: 'Passport size photo dimensions' },
      { href: '/pan-card-photo-signature.html', label: 'PAN card photo & signature size' },
      { href: '/voter-id-photo.html', label: 'Voter ID photo size' },
    ],
  },
  {
    heading: 'Resize to an exact file size',
    links: [
      { href: '/signature-resizer.html', label: 'Signature resizer in KB', note: '10 KB / 20 KB' },
      { href: '/photo-and-signature-resizer-for-exams.html', label: 'Photo & signature resizer for exams' },
      { href: '/free-online-photo-resizer.html', label: 'Free online photo resizer' },
      { href: '/resize-image-to-10kb.html', label: 'Resize image to 10 KB' },
      { href: '/resize-image-to-20kb.html', label: 'Resize image to 20 KB' },
      { href: '/resize-image-to-30kb.html', label: 'Resize image to 30 KB' },
      { href: '/resize-image-to-50kb.html', label: 'Resize image to 50 KB' },
      { href: '/resize-image-to-100kb.html', label: 'Resize image to 100 KB' },
      { href: '/resize-image-to-200kb.html', label: 'Resize image to 200 KB' },
      { href: '/resize-image-to-500kb.html', label: 'Resize image to 500 KB' },
      { href: '/compress-image-to-1mb.html', label: 'Compress image to 1 MB' },
      { href: '/compress-image-to-2mb.html', label: 'Compress image to 2 MB' },
    ],
  },
];

export const GUIDE_COUNT = GUIDE_GROUPS.reduce((n, g) => n + g.links.length, 0);

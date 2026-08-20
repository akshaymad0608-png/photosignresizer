/**
 * Post-build prerender for the Netlify static host.
 *
 * The app is a client-rendered SPA, so every deep link was served the same
 * index.html — meaning crawlers saw the homepage title/description on the tool
 * pages, /jobs and /free-image-tools instead of each page's own. This writes a
 * static <path>/index.html per route with the correct <title>, description,
 * canonical and Open Graph tags baked in; React still hydrates and takes over.
 * Netlify serves the specific file when it exists and only falls back to the
 * SPA redirect for unknown paths.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const DIST = 'dist';
const SITE = 'https://photoresizer.click';

// Pull the tool catalogue straight out of the TS source (types are erased).
const toolsSrc = readFileSync('data/tools.ts', 'utf8');
const arrStart = toolsSrc.indexOf('Tool[] = [') + 'Tool[] = ['.length - 1;
const arrEnd = toolsSrc.indexOf('\n];', arrStart);
const TOOLS = eval(toolsSrc.slice(arrStart, arrEnd + 2));

/**
 * Fits a title into the 50-60 characters a result listing shows.
 *
 * Tool names run from 10 to 26 characters, so no single suffix works for all
 * 27 — one fixed string left every tool page short, several in the low forties.
 * This picks the longest suffix that still lands inside the window, so the
 * name always leads and the padding is whatever room is left over.
 */
const TITLE_MIN = 50;
const TITLE_MAX = 60;

const fitTitle = (name, suffixes) => {
  const fits = suffixes.find(
    (s) => name.length + s.length >= TITLE_MIN && name.length + s.length <= TITLE_MAX,
  );
  // Nothing fits only if a name is longer than the window itself; the shortest
  // suffix is then the least bad answer, and the check below will report it.
  return name + (fits ?? suffixes[suffixes.length - 1]);
};

const TOOL_TITLE_SUFFIXES = [
  ' — Free Online Image Tool, No Upload | PhotoResizer',
  ' — Free Online Tool, No Sign-Up | PhotoResizer',
  ' — Free Online Tool, No Upload | PhotoResizer',
  ' — Free Online Tool | PhotoResizer',
  ' — Free & Private | PhotoResizer',
  ' | PhotoResizer',
];

/**
 * The blurbs are card copy on /free-image-tools, 65 to 71 characters — right
 * for a card and short for a meta description. Rather than stretch the visible
 * copy, the page description is the blurb plus a factual tail, sized to land
 * between 120 and 160.
 */
const DESC_MIN = 120;
const DESC_MAX = 160;

const DESC_TAILS = [
  ' No uploads and no sign-up — the file never leaves your device, and there is no size limit.',
  ' No uploads and no sign-up — the file never leaves your device.',
  ' Free, private and browser-based. No uploads, no sign-up.',
  ' Free and private, straight in your browser.',
];

const fitDescription = (blurb) => {
  const tail = DESC_TAILS.find(
    (t) => blurb.length + t.length >= DESC_MIN && blurb.length + t.length <= DESC_MAX,
  );
  return blurb + (tail ?? DESC_TAILS[DESC_TAILS.length - 1]);
};

const routes = [
  {
    path: '/free-image-tools',
    title: 'Free Image Tools — Resize, Compress and Convert Online',
    description: `${TOOLS.length} free browser-based image tools — resize, compress, convert to WebP/PNG/JPG, remove background, rotate and more. No uploads, no sign-up, no limits.`,
  },
  {
    path: '/jobs',
    title: 'Latest Govt Jobs 2026 — Vacancies and Last Dates Online',
    description: 'Latest government job vacancies with last dates and official apply links — SSC, RRB, SBI, IBPS, UPPSC, BPSC and state exams. Free photo & signature resizer too.',
  },
  {
    path: '/blog',
    title: 'Guides — Photo Size, Signature and Govt Exam Tips (2026)',
    description: 'Simple guides on exam photo and signature sizes, KB limits and how to resize images for UPSC, SSC, banking and state government forms — free.',
  },
  {
    path: '/about',
    title: 'About PhotoResizer — Free, Private Online Image Tools',
    description: 'PhotoResizer is a free, private, browser-based photo and signature resizer for government exam forms. No uploads, no sign-up, no file size limit.',
  },
  // The remaining app routes. These were missing, so a crawler asking for
  // /contact or /faq was served the homepage's title and description — and,
  // more to the point, they had no file of their own, which is what forced
  // the catch-all rewrite that turned every unknown URL into a soft 404.
  {
    path: '/faq',
    title: 'PhotoResizer FAQ — Sizes, Formats and Privacy',
    description: 'Answers on exam photo and signature sizes, KB limits, supported formats, and why nothing you upload ever leaves your own browser.',
  },
  {
    path: '/contact',
    title: 'Contact PhotoResizer — Corrections and Questions',
    description: 'Tell us about a wrong size, a form that rejected your upload, or a tool that misbehaved. Corrections to exam specifications are especially welcome.',
  },
  {
    path: '/links',
    title: 'Every PhotoResizer Guide and Tool in One List',
    description: 'The full index: exam photo and signature size guides, KB-target resizers, identity document sizes, and every free image tool on the site.',
  },
  {
    path: '/privacy',
    title: 'Privacy — Nothing You Upload Leaves Your Browser',
    description: 'PhotoResizer processes images entirely on your device using HTML5 Canvas. There is no upload endpoint, so your photo is never sent anywhere.',
  },
  {
    path: '/terms',
    title: 'Terms of Use for PhotoResizer — Free Image Tools',
    description: 'The terms that apply when you use PhotoResizer, what the exam size guides are and are not, and the limits of what a free tool can promise.',
  },
  {
    path: '/cookies',
    title: 'Cookie Policy — What PhotoResizer Stores Locally',
    description: 'Which cookies and local storage PhotoResizer uses, what each one is for, and how to clear them from your browser at any time.',
  },
  // One page per tool.
  ...TOOLS.map((t) => ({
    path: `/tools/${t.id}`,
    title: fitTitle(t.name, TOOL_TITLE_SUFFIXES),
    description: fitDescription(t.blurb),
  })),
];

// Fail loudly rather than shipping a listing that reads wrong.
for (const r of routes) {
  if (r.title.length < TITLE_MIN || r.title.length > TITLE_MAX)
    console.warn(`prerender: title ${r.title.length} chars on ${r.path} — "${r.title}"`);
  if (r.description.length < DESC_MIN || r.description.length > DESC_MAX)
    console.warn(`prerender: description ${r.description.length} chars on ${r.path}`);
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

let n = 0;
for (const route of routes) {
  const url = `${SITE}${route.path}`;
  const t = esc(route.title);
  const d = esc(route.description);
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${d}" />`);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${d}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta property="twitter:title"[^>]*>/, `<meta property="twitter:title" content="${t}" />`);
  html = html.replace(/<meta property="twitter:description"[^>]*>/, `<meta property="twitter:description" content="${d}" />`);

  const outPath = join(DIST, route.path.slice(1), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  n++;
}

console.log(`prerendered ${n} routes (${TOOLS.length} tools + ${routes.length - TOOLS.length} pages)`);

/**
 * A real 404 document.
 *
 * Vercel serves this, with a 404 status, for any path that does not match a
 * file — but only once the catch-all rewrite in vercel.json stops swallowing
 * every request first. Until now every typo and stale link returned 200 with
 * the homepage and `index, follow`, which let Google collect an unbounded
 * number of duplicate pages at invented URLs.
 *
 * It carries noindex as well as the status, because the two say different
 * things and a crawler may act on either.
 */
const notFound = template
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found — PhotoResizer</title>')
  .replace(
    /<meta name="description"[^>]*>/,
    '<meta name="description" content="That page does not exist. The photo and signature resizers, exam size guides and job listings are all still here." />',
  )
  .replace(
    /<meta name="robots"[^>]*>/,
    '<meta name="robots" content="noindex, follow" />',
  )
  // Matched by regex, not exact string: the built #root carries utility classes
  // ("w-full overflow-x-hidden"), so a literal '<div id="root">' silently found
  // nothing and shipped a 404 with an empty body.
  .replace(
    /<div id="root"[^>]*>/,
    `$&
      <main>
        <h1>Page not found</h1>
        <p>That page does not exist — the link may be out of date, or the address mistyped.</p>
        <ul>
          <li><a href="/">Photo &amp; signature resizer</a></li>
          <li><a href="/free-image-tools">All free image tools</a></li>
          <li><a href="/links">Every exam size guide</a></li>
          <li><a href="/jobs">Government job vacancies</a></li>
        </ul>
      </main>`,
  );

writeFileSync(join(DIST, '404.html'), notFound);
console.log('prerendered 404.html (noindex)');

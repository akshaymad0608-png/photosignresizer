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

const routes = [
  {
    path: '/free-image-tools',
    title: 'Free Image Tools — Resize, Compress, Convert, Edit | PhotoResizer',
    description: `${TOOLS.length} free browser-based image tools — resize, compress, convert to WebP/PNG/JPG, remove background, rotate and more. No uploads, no sign-up, no limits.`,
  },
  {
    path: '/jobs',
    title: 'Latest Govt Job Vacancies 2026 — Last Dates & Official Links | PhotoResizer',
    description: 'Latest government job vacancies with last dates and official apply links — SSC, RRB, SBI, IBPS, UPPSC, BPSC and state exams. Free photo & signature resizer too.',
  },
  {
    path: '/blog',
    title: 'Guides — Photo Size, Signature & Govt Exam Tips | PhotoResizer',
    description: 'Simple guides on exam photo and signature sizes, KB limits and how to resize images for UPSC, SSC, banking and state government forms — free.',
  },
  {
    path: '/about',
    title: 'About PhotoResizer — Free, Private Image Tools',
    description: 'PhotoResizer is a free, private, browser-based photo and signature resizer for government exam forms. No uploads, no sign-up, no file size limit.',
  },
  // One page per tool.
  ...TOOLS.map((t) => ({
    path: `/tools/${t.id}`,
    title: `${t.name} — Free & Private | PhotoResizer`,
    description: t.blurb,
  })),
];

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

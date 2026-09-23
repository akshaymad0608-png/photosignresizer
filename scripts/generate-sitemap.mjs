#!/usr/bin/env node
/**
 * Builds public/sitemap.xml from the sources that define the site's routes.
 *
 * It used to be written by hand, which drifted twice over: /cookies and
 * /terms shipped without ever reaching the sitemap, and every lastmod stood
 * at 2026-09-09 while the pages underneath had changed later. A sitemap that
 * omits a page costs an index entry; one whose lastmod is behind tells Google
 * there is nothing to recrawl, which is how this site lost three weeks once
 * already.
 *
 * Routes come from the same places prerender.mjs reads, so adding a tool to
 * data/tools.ts or a guide to data/guides.ts puts it in the sitemap with no
 * second edit.
 *
 * lastmod is the honest part, and the reason this script is not four lines.
 * Stamping today's date on every URL at every build is the mirror of the bug
 * it replaces: it claims the whole site changed on every deploy, and a
 * crawler that is lied to consistently learns to ignore the field. So each
 * URL's date comes from the last commit that touched the file actually
 * governing that page. Where git history is unavailable — a shallow CI
 * checkout resolves every path to HEAD, which would flatten the dates into
 * exactly that lie — the date already recorded in the committed sitemap is
 * kept instead, and a brand-new URL is written without a lastmod at all.
 * Google reads a missing lastmod as "unknown", which is true; a wrong one is
 * worse than none.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://photoresizer.click';
const OUT = resolve(ROOT, 'public/sitemap.xml');

const read = (rel) => {
  const p = resolve(ROOT, rel);
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
};

/* ------------------------------------------------------------ git dates -- */

const git = (args) => {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

/**
 * A shallow clone answers `git log -1 -- <path>` with HEAD for every path,
 * because it has no older commits to attribute a change to. Detecting that up
 * front is what lets the fallback below stay honest rather than writing the
 * same date everywhere.
 */
const HISTORY_OK = (() => {
  if (!git(['rev-parse', '--git-dir'])) return false;
  if (existsSync(resolve(ROOT, '.git/shallow'))) return false;
  return Number(git(['rev-list', '--count', 'HEAD']) || 0) > 1;
})();

const dateCache = new Map();
const lastChanged = (relPaths) => {
  if (!HISTORY_OK) return '';
  const key = relPaths.join('|');
  if (dateCache.has(key)) return dateCache.get(key);
  const dates = relPaths
    .filter((p) => existsSync(resolve(ROOT, p)))
    .map((p) => git(['log', '-1', '--format=%cs', '--', p]))
    .filter(Boolean);
  const newest = dates.sort().pop() || '';
  dateCache.set(key, newest);
  return newest;
};

/* ------------------------------------------------- what the previous run -- */

const previous = new Map();
{
  const xml = read('public/sitemap.xml');
  const re = /<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]*)<\/lastmod>)?\s*(?:<changefreq>([^<]*)<\/changefreq>)?\s*(?:<priority>([^<]*)<\/priority>)?/g;
  let m;
  while ((m = re.exec(xml))) {
    previous.set(m[1], { lastmod: m[2] || '', changefreq: m[3] || '', priority: m[4] || '' });
  }
}

/* ------------------------------------------------------------- the routes -- */

/** Guide pages are plain .html files in public/, listed in data/guides.ts. */
const guideHrefs = [...read('data/guides.ts').matchAll(/href:\s*'(\/[^']+\.html)'/g)].map((m) => m[1]);

/** Tool pages are React routes, one per id in data/tools.ts. */
const toolIds = [...read('data/tools.ts').matchAll(/^\s{2}\{\s*$[\s\S]*?^\s{4}id:\s*'([^']+)'/gm)].map((m) => m[1]);

// A truncated sitemap is worse than a stale one: it tells Google pages that
// still exist are gone. Fail rather than write one.
if (guideHrefs.length < 30) throw new Error(`generate-sitemap: only ${guideHrefs.length} guides parsed from data/guides.ts`);
if (toolIds.length < 20) throw new Error(`generate-sitemap: only ${toolIds.length} tools parsed from data/tools.ts`);

/**
 * Every prerendered route's HTML is shaped by prerender.mjs and the
 * index.html it starts from, so a change to either really does change all of
 * them — the site-wide link footer added in 4e16474 rewrote all 38. Both
 * belong in every app route's sources. The guide pages in public/ are served
 * as-is and never pass through prerender, so they track only their own file.
 */
const SHELL = ['prerender.mjs', 'index.html'];
const HOME = [...SHELL, 'pages/Home.tsx', 'components', 'data'];

const routes = [
  { path: '/', changefreq: 'daily', priority: '1.0', from: HOME },
  { path: '/free-image-tools', changefreq: 'weekly', priority: '0.9', from: [...SHELL, 'pages/Home.tsx', 'data/tools.ts'] },
  { path: '/jobs', changefreq: 'daily', priority: '0.9', from: [...SHELL, 'pages/Home.tsx', 'data/vacancies.ts'] },
  { path: '/blog', changefreq: 'weekly', priority: '0.7', from: HOME },
  { path: '/faq', changefreq: 'monthly', priority: '0.7', from: HOME },
  { path: '/links', changefreq: 'weekly', priority: '0.8', from: [...SHELL, 'pages/Home.tsx', 'data/guides.ts'] },
  { path: '/about', changefreq: 'monthly', priority: '0.6', from: [...SHELL, 'pages/static/About.tsx'] },
  { path: '/contact', changefreq: 'monthly', priority: '0.6', from: [...SHELL, 'pages/static/Contact.tsx'] },
  { path: '/privacy', changefreq: 'monthly', priority: '0.5', from: [...SHELL, 'pages/static/Privacy.tsx'] },
  { path: '/terms', changefreq: 'monthly', priority: '0.5', from: [...SHELL, 'pages/static/Terms.tsx'] },
  { path: '/cookies', changefreq: 'monthly', priority: '0.5', from: [...SHELL, 'pages/static/Privacy.tsx'] },
  ...guideHrefs.map((href) => ({
    path: href,
    changefreq: 'monthly',
    priority: '0.9',
    from: [`public${href}`],
  })),
  ...toolIds.map((id) => ({
    path: `/tools/${id}`,
    changefreq: 'monthly',
    priority: '0.7',
    from: [...SHELL, 'data/tools.ts'],
  })),
];

/* ------------------------------------------------------------------ write -- */

const seen = new Set();
const entries = [];
for (const r of routes) {
  const loc = `${SITE}${r.path === '/' ? '/' : r.path}`;
  if (seen.has(loc)) continue;
  seen.add(loc);
  const prev = previous.get(loc);
  // Real date where git can give one; otherwise whatever the committed
  // sitemap already claimed; otherwise nothing at all.
  const lastmod = lastChanged(r.from) || prev?.lastmod || '';
  entries.push({ loc, lastmod, changefreq: r.changefreq, priority: r.priority });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/generate-sitemap.mjs — do not edit by hand.
     Run \`npm run sitemap\` (or any build) after adding a tool or guide. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(OUT, xml);

const dated = entries.filter((e) => e.lastmod).length;
const dropped = [...previous.keys()].filter((u) => !seen.has(u));
console.log(
  `sitemap: ${entries.length} URLs (${guideHrefs.length} guides, ${toolIds.length} tools), ` +
    `${dated} with lastmod, git history ${HISTORY_OK ? 'used' : 'unavailable — dates preserved'}`,
);
if (dropped.length) console.log(`sitemap: dropped ${dropped.length} URL(s) no longer generated:\n  ${dropped.join('\n  ')}`);

/**
 * Build step: give each exam guide its own live "what is open right now".
 *
 * Why
 * ---
 * The exam guides were near-duplicates — 44% average word overlap, and 91%
 * between LIC, SBI and RBI. That is not sloppy writing: those boards share one
 * identical photo and signature specification, so any honest page about the
 * spec says the same thing. Rewording cannot fix it, and Google de-duplicates
 * on meaning anyway.
 *
 * What genuinely differs per board is which of its posts are open today. That
 * is real, already in data/vacancies.ts, different on every page, useful to
 * someone who is mid-application, and it changes over time — which keeps the
 * pages from being frozen text.
 *
 * Why a build step rather than an edit to public/
 * ----------------------------------------------
 * Baking today's vacancies into the source HTML would go stale the moment
 * vacancies.ts changes, and nothing would flag it. Injecting into dist/ at
 * build time means the section is regenerated from the data on every deploy.
 *
 * Pages with no matching vacancy get nothing. An empty "no vacancies right
 * now" box would be identical on every such page — the very problem this is
 * meant to solve.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

/* ----------------------------------------------------------- load data -- */

const src = readFileSync('data/vacancies.ts', 'utf8');
const marker = 'VACANCIES: Vacancy[] = ';
const start = src.indexOf('[', src.indexOf(marker) + marker.length - 1);
let depth = 0;
let end = start;
for (let k = start; k < src.length; k++) {
  if (src[k] === '[') depth++;
  else if (src[k] === ']' && --depth === 0) { end = k + 1; break; }
}
const VACANCIES = eval(src.slice(start, end));

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const parseLastDate = (value) => {
  const m = /^(\d{2})-([A-Za-z]{3})-(\d{4})$/.exec(String(value).trim());
  if (!m) return null;
  const month = MONTHS.indexOf(m[2].toLowerCase());
  return month < 0 ? null : new Date(Number(m[3]), month, Number(m[1]));
};

const today = new Date();
const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const isOpen = (v) => {
  const d = parseLastDate(v.lastDate);
  return d === null ? false : d.getTime() >= midnight.getTime();
};
const daysLeft = (v) => {
  const d = parseLastDate(v.lastDate);
  return d === null ? null : Math.round((d.getTime() - midnight.getTime()) / 86_400_000);
};

/* ------------------------------------------------------------ mapping -- */

/**
 * Page slug -> which vacancies belong on it.
 *
 * `boards` matches data/vacancies.ts exactly. `post` narrows further where two
 * pages would otherwise draw the same rows: the SSC guide and the SSC GD guide
 * both match board "SSC", so splitting them by post keeps the two pages from
 * growing an identical section — which would recreate the duplication.
 *
 * NICL is deliberately absent. It carries almost all of the site's traffic at
 * position 2.5 and is left alone.
 */
const PAGES = {
  'agniveer-photo-signature-size': { boards: ['Indian Air Force'] },
  'bank-exam-photo-signature-size': { boards: ['IBPS', 'SBI', 'RBI', 'India Post'] },
  'ibps-photo-signature-size': { boards: ['IBPS'] },
  'rbi-photo-signature-size': { boards: ['RBI'] },
  'sbi-photo-signature-size': { boards: ['SBI'] },
  'rrb-photo-signature-size': {
    boards: ['RRB', 'RRC Central Railway', 'Northeast Frontier Railway (NFR)'],
  },
  'ssc-photo-signature-size': { boards: ['SSC'], excludePost: /general duty|\bGD\b/i },
  'ssc-gd-constable-photo-signature-size': { boards: ['SSC'], post: /general duty|\bGD\b/i },
  'police-constable-photo-signature-size': {
    boards: ['UP Police (UPPRPB)', 'Bihar Police (CSBC)', 'MP Police (ESB)', 'Rajasthan Police'],
  },
  'state-psc-photo-signature-size': {
    boards: ['UPPSC', 'BPSC', 'MPPSC', 'RPSC', 'MPSC', 'WBPSC', 'TNPSC', 'KPSC'],
  },
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const linkFor = (v) => v.links?.apply || v.portal || null;

/* ------------------------------------------------------------- render -- */

const rowFor = (v) => {
  const left = daysLeft(v);
  const href = linkFor(v);
  const when =
    left === null
      ? esc(v.lastDate)
      : left === 0
        ? `closes today (${esc(v.lastDate)})`
        : `${left} day${left === 1 ? '' : 's'} left &mdash; ${esc(v.lastDate)}`;

  const name = `${esc(v.board)} &mdash; ${esc(v.post)}`;
  const title = href ? `<a href="${esc(href)}" rel="nofollow noopener" target="_blank">${name}</a>` : name;
  const count = v.vacancies && v.vacancies !== 'Multiple' ? ` <strong>${esc(v.vacancies)}</strong> posts.` : '';
  const caveat = v.verified ? '' : ' Confirm on the official notification.';

  return `<li>${title} &mdash; ${when}.${count}${caveat}</li>`;
};

let injected = 0;
const skipped = [];

for (const [slug, rule] of Object.entries(PAGES)) {
  const file = join(DIST, `${slug}.html`);
  if (!existsSync(file)) { skipped.push(`${slug}: not in dist`); continue; }

  let mine = VACANCIES.filter((v) => rule.boards.includes(v.board));
  if (rule.post) mine = mine.filter((v) => rule.post.test(v.post));
  if (rule.excludePost) mine = mine.filter((v) => !rule.excludePost.test(v.post));

  // Dated and still open is the useful, time-sensitive half. The rest are the
  // recurring exams that have no fixed date — worth naming, since they are what
  // this board actually recruits for, but kept clearly apart from live dates.
  const open = mine.filter(isOpen).sort(
    (a, b) => (parseLastDate(a.lastDate) ?? 0) - (parseLastDate(b.lastDate) ?? 0),
  );
  const rolling = mine.filter((v) => parseLastDate(v.lastDate) === null);

  if (!open.length && !rolling.length) { skipped.push(`${slug}: nothing to list`); continue; }

  let html = readFileSync(file, 'utf8');
  // Page structures vary — some have "Common reasons", some do not — so try a
  // few headings before giving up.
  const anchors = ['<h2>Common reasons', '<h2>How to resize', '<div class="faq">', '<h2>Frequently asked'];
  const anchor = anchors.map((a) => html.indexOf(a)).find((i) => i >= 0) ?? -1;
  if (anchor < 0) { skipped.push(`${slug}: no insertion point`); continue; }

  const openBlock = open.length
    ? `<h3>Open right now</h3><ul>${open.map(rowFor).join('')}</ul>`
    : '';
  const rollingBlock = rolling.length
    ? `<h3>Recruits for this on a cycle</h3><ul>${rolling.map(rowFor).join('')}</ul>`
    : '';

  const section = `
  <section id="open-now">
    <h2>Which vacancies need this photo size</h2>
    <p>Resize once to the sizes above and the same pair of files works for every
      form listed here.</p>
    ${openBlock}${rollingBlock}
    <p><a href="/jobs">See all government job vacancies &rarr;</a></p>
  </section>
`;

  writeFileSync(file, html.slice(0, anchor) + section + html.slice(anchor));
  injected++;
  console.log(`  ${slug}: ${open.length} open, ${rolling.length} recurring`);
}

console.log(`exam vacancy sections injected: ${injected}`);
if (skipped.length) {
  console.log(`skipped ${skipped.length}: ${skipped.join('; ')}`);
}

/**
 * Site health dashboard.
 *
 * Every check here is a regression test for something the 19 August audit
 * actually found broken. The point is not a score — it is that the fixes stay
 * fixed. Run it whenever; it hits the live site, so it tells you what a
 * crawler would see right now, not what the repo says should be true.
 *
 *   node scripts/seo-dashboard.mjs            # writes seo-dashboard.html
 *   node scripts/seo-dashboard.mjs --json     # machine-readable, for CI
 *
 * Deliberately NOT included: clicks, impressions, positions, indexation
 * counts. Those live in Search Console behind a Google login this script has
 * no access to. Showing a stale copy of them would be worse than sending you
 * to the real thing.
 */
import { writeFileSync } from 'node:fs';
import { readFileSync, existsSync, statSync } from 'node:fs';

const SITE = 'https://photoresizer.click';
const JSON_OUT = process.argv.includes('--json');

const checks = [];
const add = (area, name, status, detail, why) =>
  checks.push({ area, name, status, detail, why });

const get = async (path, opts = {}) => {
  const res = await fetch(`${SITE}${path}`, { redirect: 'follow', ...opts });
  return { status: res.status, headers: res.headers, body: await res.text() };
};

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
   .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&times;/g, '×')
   .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const titleOf = (h) => decode((h.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '');
const descOf = (h) => {
  const tag = (h.match(/<meta[^>]*name="description"[^>]*>/) || [])[0] || '';
  return decode((tag.match(/content="([\s\S]*?)"/) || [])[1] || '');
};

/* ------------------------------------------------------------ the checks -- */

async function run() {
  // 1. The invented review rating. Removed 19 Aug — the thing that could have
  //    cost a manual action, so it is checked first.
  //
  //    Checked in source, not in the served HTML. This schema is injected by
  //    React after hydration, so it never appears in the response body and a
  //    fetch-based check would report a comfortable pass whether or not the
  //    rating was there. The source file is where the truth is.
  try {
    const schema = readFileSync('seo/schema.ts', 'utf8');
    const live = /^\s*aggregateRating\s*:/m.test(schema);
    add('Policy', 'No invented review rating',
      live ? 'fail' : 'pass',
      live ? 'aggregateRating is back in seo/schema.ts' : 'no aggregateRating in seo/schema.ts',
      'A self-assigned rating with no visible reviews is what spammy-markup manual actions target.');
  } catch (e) {
    add('Policy', 'No invented review rating', 'error', e.message, '');
  }

  // 2. Soft-404. Any unknown path returned 200 + index,follow, which lets
  //    Google collect unlimited duplicate copies of the homepage.
  try {
    const junk = await get('/definitely-not-a-real-page-' + 'x'.repeat(12));
    const robots = (junk.body.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/) || [])[1] || '';
    const indexable = /index/.test(robots) && !/noindex/.test(robots);
    const bad = junk.status === 200 && indexable;
    add('Indexing', 'Unknown URLs are not indexable',
      bad ? 'fail' : 'pass',
      `HTTP ${junk.status}, robots: ${robots || 'none'}`,
      'A 200 with index,follow on any path manufactures duplicate pages without limit.');
  } catch (e) {
    add('Indexing', 'Unknown URLs are not indexable', 'error', e.message, '');
  }

  // 3. Deploy config that should not be public.
  try {
    const vj = await get('/vercel.json');
    const exposed = vj.status === 200 && /"rewrites"|"headers"/.test(vj.body);
    add('Hygiene', 'Deploy config not publicly served',
      exposed ? 'fail' : 'pass',
      exposed ? '/vercel.json returns 200 with rewrite rules' : `/vercel.json → HTTP ${vj.status}`,
      'Not a secret, but build configuration has no reason to be fetchable.');
  } catch (e) {
    add('Hygiene', 'Deploy config not publicly served', 'error', e.message, '');
  }

  // 4. Prerender must give each route its own body, not the homepage's.
  //    A crawler that does not run JS was getting the homepage H1 under a
  //    tool page's title.
  try {
    const home = await get('/');
    const tool = await get('/tools/passport-photo');
    const h1 = (h) => decode(((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]*>/g, '').trim());
    const same = h1(home.body) && h1(home.body) === h1(tool.body);
    add('Rendering', 'Tool pages have their own H1 without JS',
      same ? 'fail' : 'pass',
      same ? `both serve "${h1(home.body).slice(0, 50)}"` : `tool H1: "${h1(tool.body).slice(0, 50) || '(none)'}"`,
      'prerender.mjs rewrites head tags only; the body stayed the homepage\'s.');
  } catch (e) {
    add('Rendering', 'Tool pages have their own H1 without JS', 'error', e.message, '');
  }

  // 5. Listing lengths on the pages that carry the traffic.
  const pages = ['/', '/nicl-photo-signature-size.html', '/ssc-photo-signature-size.html', '/jobs'];
  for (const p of pages) {
    try {
      const r = await get(p);
      const t = titleOf(r.body), d = descOf(r.body);
      const tOk = t.length >= 50 && t.length <= 60;
      const dOk = d.length >= 120 && d.length <= 160;
      add('Listings', `${p} title & description`,
        tOk && dOk ? 'pass' : 'warn',
        `title ${t.length} chars${tOk ? '' : ' (want 50-60)'}, description ${d.length}${dOk ? '' : ' (want 120-160)'}`,
        'Outside these windows the result gets truncated or padded in the listing.');
    } catch (e) {
      add('Listings', `${p} title & description`, 'error', e.message, '');
    }
  }

  // 6. Sitemap still resolves and everything in it is reachable.
  try {
    const sm = await get('/sitemap.xml');
    const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    let broken = 0;
    for (const u of locs) {
      const res = await fetch(u, { method: 'HEAD', redirect: 'follow' });
      if (!res.ok) broken++;
    }
    add('Indexing', 'Every sitemap URL resolves',
      broken ? 'fail' : 'pass',
      `${locs.length} URLs, ${broken} not returning 200`,
      'A sitemap advertising dead URLs wastes the crawl budget it was meant to direct.');
  } catch (e) {
    add('Indexing', 'Every sitemap URL resolves', 'error', e.message, '');
  }

  // 7. The guide pages must be linked from somewhere React does not erase.
  //    This is a source check: the rendered-DOM count needs a browser, but if
  //    the section stops being imported eagerly the links are at risk again.
  try {
    const home = readFileSync('pages/Home.tsx', 'utf8');
    const eager = /^import GuideLinksSection from/m.test(home);
    const mounted = /<GuideLinksSection\s*\/>/.test(home);
    const guides = readFileSync('data/guides.ts', 'utf8');
    const count = (guides.match(/href: '/g) || []).length;
    const ok = eager && mounted && count > 0;
    add('Linking', 'Guide pages are linked after hydration',
      ok ? 'pass' : 'fail',
      `${count} guides, imported eagerly: ${eager}, mounted: ${mounted}`,
      'Their only links used to sit in the block createRoot wipes, leaving them orphaned.');
  } catch (e) {
    add('Linking', 'Guide pages are linked after hydration', 'error', e.message, '');
  }

  // 8. Image weight budget.
  try {
    const imgs = ['public/og-image.png'];
    const over = imgs.filter((f) => existsSync(f) && statSync(f).size > 100 * 1024);
    add('Hygiene', 'Key images under 100 KB',
      over.length ? 'warn' : 'pass',
      over.length ? over.map((f) => `${f} ${(statSync(f).size / 1024).toFixed(0)} KB`).join(', ') : 'within budget',
      'Recommended ceiling; over it costs load time on the mobile connections most of this traffic uses.');
  } catch (e) {
    add('Hygiene', 'Key images under 100 KB', 'error', e.message, '');
  }
}

/* ---------------------------------------------------------------- output -- */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(results, when) {
  const n = (s) => results.filter((r) => r.status === s).length;
  const areas = [...new Set(results.map((r) => r.area))];
  const dot = { pass: '#1baf7a', fail: '#d03b3b', warn: '#eda100', error: '#898781' };

  const rows = areas.map((area) => `
    <section>
      <h2>${esc(area)}</h2>
      ${results.filter((r) => r.area === area).map((r) => `
        <div class="row ${r.status}">
          <span class="dot" style="background:${dot[r.status]}"></span>
          <div class="body">
            <div class="name">${esc(r.name)}</div>
            <div class="detail">${esc(r.detail)}</div>
            ${r.why && r.status !== 'pass' ? `<div class="why">${esc(r.why)}</div>` : ''}
          </div>
          <span class="status" style="color:${dot[r.status]}">${r.status}</span>
        </div>`).join('')}
    </section>`).join('');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>photoresizer.click — site health</title>
<style>
  :root{--bg:#fcfcfb;--fg:#0b0b0b;--mut:#52514e;--faint:#898781;--line:rgba(11,11,11,.1);--card:#fff}
  @media(prefers-color-scheme:dark){:root{--bg:#1a1a19;--fg:#f0efec;--mut:#c3c2b7;--faint:#898781;--line:rgba(255,255,255,.1);--card:#212120}}
  *{box-sizing:border-box}
  body{margin:0;padding:2rem 1.25rem;background:var(--bg);color:var(--fg);
       font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
  .wrap{max-width:820px;margin:0 auto}
  h1{font-size:22px;font-weight:500;margin:0 0 .25rem}
  .when{color:var(--faint);font-size:13px;margin:0 0 1.75rem}
  .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:10px;margin-bottom:2rem}
  .tile{background:var(--card);border:.5px solid var(--line);border-radius:12px;padding:.9rem 1rem}
  .tile .k{font-size:12px;color:var(--mut)}
  .tile .v{font-size:24px;font-weight:500;margin-top:2px}
  h2{font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:.08em;
     color:var(--mut);margin:1.75rem 0 .6rem}
  .row{display:flex;gap:12px;align-items:flex-start;background:var(--card);
       border:.5px solid var(--line);border-radius:12px;padding:.85rem 1rem;margin-bottom:8px}
  .dot{width:9px;height:9px;border-radius:50%;flex:0 0 auto;margin-top:7px}
  .body{flex:1;min-width:0}
  .name{font-size:14.5px}
  .detail{font-size:13px;color:var(--mut);margin-top:2px;word-break:break-word}
  .why{font-size:12.5px;color:var(--faint);margin-top:6px;font-style:italic}
  .status{font-size:11px;text-transform:uppercase;letter-spacing:.06em;flex:0 0 auto;margin-top:5px}
  footer{margin-top:2.5rem;padding-top:1.25rem;border-top:.5px solid var(--line);
         font-size:13px;color:var(--faint)}
  a{color:inherit}
</style></head><body><div class="wrap">
  <h1>photoresizer.click — site health</h1>
  <p class="when">Checked against the live site, ${esc(when)}</p>
  <div class="tiles">
    <div class="tile"><div class="k">Passing</div><div class="v" style="color:${dot.pass}">${n('pass')}</div></div>
    <div class="tile"><div class="k">Failing</div><div class="v" style="color:${dot.fail}">${n('fail')}</div></div>
    <div class="tile"><div class="k">Warnings</div><div class="v" style="color:${dot.warn}">${n('warn')}</div></div>
    <div class="tile"><div class="k">Errors</div><div class="v" style="color:${dot.error}">${n('error')}</div></div>
  </div>
  ${rows}
  <footer>
    Every check here is a regression test for something the 19 August audit found broken.
    <br><br>
    Traffic, rankings and indexation are deliberately absent — they live in
    <a href="https://search.google.com/search-console">Search Console</a>, behind a login this
    script cannot use. A stale copy would be worse than the real thing.
    <br><br>
    Re-run: <code>node scripts/seo-dashboard.mjs</code>
  </footer>
</div></body></html>`;
}

await run();

if (JSON_OUT) {
  console.log(JSON.stringify({ site: SITE, checks }, null, 2));
} else {
  const when = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  writeFileSync('seo-dashboard.html', html(checks, when));
  const fails = checks.filter((c) => c.status === 'fail').length;
  const warns = checks.filter((c) => c.status === 'warn').length;
  console.log(`seo-dashboard.html written — ${checks.length} checks, ${fails} failing, ${warns} warnings`);
  for (const c of checks.filter((c) => c.status !== 'pass')) {
    console.log(`  [${c.status}] ${c.name} — ${c.detail}`);
  }
  process.exitCode = fails ? 1 : 0;
}

/**
 * Post-build prerender for the Netlify static host.
 *
 * The app is a client-rendered SPA, so every deep link was served the same
 * index.html — meaning crawlers saw the homepage title/description on the tool
 * pages and /free-image-tools instead of each page's own. This writes a
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

// Same for the static guide pages in public/. These are plain .html files, not
// React routes, so the only thing that can link to them is markup we emit here.
const guidesSrc = readFileSync('data/guides.ts', 'utf8');
const gStart = guidesSrc.indexOf('GuideGroup[] = [') + 'GuideGroup[] = ['.length - 1;
const gEnd = guidesSrc.indexOf('\n];', gStart);
const GUIDE_GROUPS = eval(guidesSrc.slice(gStart, gEnd + 2));


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
    // Same content as the homepage; the app redirects it. Not indexed.
    noindex: true,
    title: 'Free Image Tools — Resize, Compress and Convert Online',
    keywords: 'free image tools, online image resizer, image compressor, convert image to WebP, remove background, image tools no upload, browser image editor',
    description: `${TOOLS.length} free browser-based image tools — resize, compress, convert to WebP/PNG/JPG, remove background, rotate and more. No uploads, no sign-up, no limits.`,
  },
  {
    path: '/blog',
    // Same content as the homepage; the app redirects it. Not indexed.
    noindex: true,
    title: 'Guides — Photo Size, Signature and Govt Exam Tips (2026)',
    keywords: 'exam photo size guide, signature size guide, UPSC photo size, SSC photo size, banking exam photo, how to resize photo for exam, government exam photo requirements',
    description: 'Simple guides on exam photo and signature sizes, KB limits and how to resize images for UPSC, SSC, banking and state government forms — free.',
  },
  {
    path: '/about',
    title: 'About PhotoResizer — Free, Private Online Image Tools',
    keywords: 'PhotoResizer about, free photo resizer, private image tools, photo and signature resizer, government exam photo resizer',
    description: 'PhotoResizer is a free, private, browser-based photo and signature resizer for government exam forms. No uploads, no sign-up, no file size limit.',
  },
  // The remaining app routes. These were missing, so a crawler asking for
  // /contact or /faq was served the homepage's title and description — and,
  // more to the point, they had no file of their own, which is what forced
  // the catch-all rewrite that turned every unknown URL into a soft 404.
  {
    path: '/faq',
    // Same content as the homepage; the app redirects it. Not indexed.
    noindex: true,
    title: 'PhotoResizer FAQ — Sizes, Formats and Privacy',
    keywords: 'PhotoResizer FAQ, photo resizer help, image size questions, exam photo FAQ, photo format FAQ',
    description: 'Answers on exam photo and signature sizes, KB limits, supported formats, and why nothing you upload ever leaves your own browser.',
  },
  {
    path: '/contact',
    title: 'Contact PhotoResizer — Corrections and Questions',
    keywords: 'contact PhotoResizer, PhotoResizer support, photo resizer help, report wrong size, image tool feedback',
    description: 'Tell us about a wrong size, a form that rejected your upload, or a tool that misbehaved. Corrections to exam specifications are especially welcome.',
  },
  {
    path: '/links',
    // Same content as the homepage; the app redirects it. Not indexed.
    noindex: true,
    title: 'Every PhotoResizer Guide and Tool in One List',
    keywords: 'PhotoResizer sitemap, all image tools, all photo guides, photo resizer index, image tool directory',
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
    // Same content as /privacy; the app redirects it. Not indexed.
    noindex: true,
    title: 'Cookie Policy — What PhotoResizer Stores Locally',
    description: 'Which cookies and local storage PhotoResizer uses, what each one is for, and how to clear them from your browser at any time.',
  },
  // One page per tool.
  ...TOOLS.map((t) => ({
    path: `/tools/${t.id}`,
    title: fitTitle(t.name, TOOL_TITLE_SUFFIXES),
    keywords: `${t.name}, free ${t.name.toLowerCase()}, online ${t.name.toLowerCase()}, ${t.name.toLowerCase()} no upload, ${t.group ? t.group.toLowerCase() + ' image' : 'image tool'}, browser image tool`,
    description: fitDescription(t.blurb),
    // Every tool page is the same three-step boilerplate around a name and a
    // one-line blurb, so none is indexed; see scripts/generate-sitemap.mjs.
    noindex: true,
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

/**
 * The site-wide link footer.
 *
 * Every internal link on this site used to live inside #root: either in the
 * .seo-fallback block, which createRoot wipes the instant React mounts, or in
 * GuideLinksSection, which renders only on the home tab and only after a lazy
 * chunk resolves. A crawler that runs JavaScript sees the fallback destroyed;
 * one that snapshots before the chunk lands sees nothing put back. Either way
 * the guide pages and /tools/* routes end up with no discoverable incoming
 * link and get reported as orphans, reachable from sitemap.xml alone.
 *
 * This block sits outside #root, so React never touches it, and it is written
 * into every prerendered document. The links are therefore present in the raw
 * HTML and still present after hydration — the two cases a crawler can be in.
 *
 * It is generated from data/guides.ts and data/tools.ts rather than written by
 * hand, so adding a guide or a tool cannot silently leave it stale.
 */
const linkList = (links) =>
  links.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('');

const linkColumn = (heading, links) =>
  `<div><h2>${esc(heading)}</h2><ul>${linkList(links)}</ul></div>`;

const SITE_LINKS = [
  ...GUIDE_GROUPS.map((g) => linkColumn(g.heading, g.links)),
  linkColumn(
    'Free image tools',
    TOOLS.map((t) => ({ href: `/tools/${t.id}`, label: t.name })),
  ),
  linkColumn('Pages', [
    { href: '/', label: 'Photo & signature resizer' },
    { href: '/free-image-tools', label: 'All free image tools' },
    { href: '/links', label: 'Every guide and tool' },
    { href: '/blog', label: 'Guides and articles' },
    { href: '/faq', label: 'Frequently asked questions' },
    { href: '/about', label: 'About PhotoResizer' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms of use' },
    { href: '/cookies', label: 'Cookie policy' },
  ]),
].join('');

const SITE_LINKS_HTML = `
<nav class="site-links" aria-label="All guides and tools">
  <style>
    .site-links {
      max-width: 1180px; margin: 0 auto; padding: 34px 18px 44px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      border-top: 1px solid #d9dfec; color: #5a6683; font-size: 13px; line-height: 1.55;
    }
    html.dark .site-links { border-top-color: #1b2540; color: #9aa6c2; }
    .site-links > div {
      display: grid; gap: 22px 28px;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    }
    .site-links h2 {
      font-size: 12px; text-transform: uppercase; letter-spacing: .06em;
      color: #111a33; margin: 0 0 8px; font-weight: 700;
    }
    html.dark .site-links h2 { color: #e7ebf5; }
    .site-links ul { list-style: none; margin: 0; padding: 0; }
    .site-links li { margin: 0 0 5px; }
    .site-links a { color: inherit; text-decoration: none; }
    .site-links a:hover { color: #d6006e; text-decoration: underline; }
    html.dark .site-links a:hover { color: #ff2e97; }
  </style>
  <div>${SITE_LINKS}</div>
</nav>
`;

const withSiteLinks = (html) => html.replace('</body>', `${SITE_LINKS_HTML}</body>`);

const template = withSiteLinks(readFileSync(join(DIST, 'index.html'), 'utf8'));

// The homepage is not in `routes` (it is the template itself), so it has to be
// written back explicitly or it would be the one page missing the links.
writeFileSync(join(DIST, 'index.html'), template);


/*
  Static bodies for the four info pages. The homepage template carries the
  homepage's own text in <main class="seo-fallback">, so /about, /contact,
  /privacy and /terms used to ship that same text under four different titles.
  A crawler that does not run JavaScript saw four duplicates of the homepage.
  These mirror the copy in pages/static/{About,Contact,Privacy,Terms}.tsx; if
  you change the wording there, change it here too.
*/
const sec = (h, ...paras) => `<h2>${h}</h2>${paras.map((t) => `<p>${t}</p>`).join('')}`;
const page = (h1, sub, body, updated) =>
  `<main class="seo-fallback"><h1>${h1}</h1><p class="sub">${sub}</p>${updated ? `<p>Last updated ${updated}.</p>` : ''}${body}` +
  `<p><a href="/">Back to the photo &amp; signature resizer</a> · <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></p></main>`;

const PAGE_BODIES = {
  '/about': page(
    'About PhotoResizer',
    'A small tool with one job: make sure the photograph and signature you attach to a government exam form are accepted the first time you upload them.',
    '<p>Application portals reject images for reasons they rarely explain well. The photo is four kilobytes too large. The signature is the right size but the wrong aspect ratio. The form wants 200×230 pixels and your phone produced 3024×4032. Each rejection costs another attempt at a portal that is usually under load on the last day.</p>' +
      '<p>PhotoResizer removes that loop. Choose the exam, and the pixel dimensions and file-size window from that notification are applied automatically. Add your photograph and signature, and the tool resizes, crops and compresses until the output lands inside the allowed range, then tells you whether it passed.</p>' +
      sec('What we care about',
        '<strong>Nothing is uploaded.</strong> Every resize, crop and compression happens on your own device using the canvas API. There is no upload endpoint, so there is no file to leak.',
        '<strong>Numbers, not guesses.</strong> Each preset stores a pixel and kilobyte range, and every output is measured against it before you download. Guides marked with a notification link and date were checked against that notice; the rest show typical ranges, so always confirm on your own notification.',
        '<strong>Built for form-filling day.</strong> The tool assumes you are in a cyber cafe queue with ten minutes left. It works on a slow phone and does not ask you to sign up.',
        '<strong>Free and independent.</strong> PhotoResizer is not affiliated with any recruitment board. We read the notifications, encode the requirements, and keep the tool free.') +
      sec('How it is built', 'The site is a React application with no backend for image handling. Images are decoded into a canvas, resized with the requested fit mode, and re-encoded as JPEG at a quality the tool searches for until the file lands inside the size window. Quality checks for sharpness, exposure, background uniformity and ink coverage run on the same canvas data.') +
      sec('Who runs it', 'PhotoResizer is built and maintained by Akshay Mahajan, an independent developer in India. It is a personal project, not a company, and it is not affiliated with any recruitment board. You can reach the owner through the <a href="/contact">contact page</a>.') +
      sec('How the size guides are checked', 'A guide that says “Checked against the official notice” links the notice and shows the date it was read. Guides without that line give general ranges that many exams use; treat them as a starting point and compare with your own notification before you upload.') +
      sec('Corrections', 'Notifications change and boards occasionally revise their requirements mid-cycle. If a preset here disagrees with the notification you are reading, the notification is right — please tell us through the <a href="/contact">contact page</a> and we will correct it.'),
  ),
  '/contact': page(
    'Contact PhotoResizer',
    'Wrong size in a preset, a broken download, or an exam you want added — tell us and we will fix it.',
    sec('Ways to reach us',
      'Email: <a href="mailto:hello@photoresizer.click">hello@photoresizer.click</a>',
      'WhatsApp: <a href="https://wa.me/917600885080">message us</a>') +
      sec('Report a wrong size', 'Use the form on this page. It opens your email app with the message filled in — nothing is stored here. If a size is wrong, please include the exam name and a link to the notification.') +
      sec('What to write about', 'A wrong exam size, a request to add an exam, a bug report, or anything else. Corrections to exam specifications are especially welcome.'),
  ),
  '/privacy': page(
    'Privacy policy',
    'The short version: your photographs and signatures are processed on your own device and are never sent to us.',
    sec('Images you process', 'When you add a photograph or signature, the file is read by your browser and drawn into a canvas element in the page. Resizing, cropping, rotation, compression and the quality checks all run there. No copy is transmitted to our servers or to any third party, and we have no image storage of any kind. Closing the tab discards everything.') +
      sec('What is stored on your device', 'We keep a small amount of state in your browser’s local storage so the tool remembers your preferences between visits: the interface language, the light or dark theme, the exam you last selected, and a short list of recent results shown in the history panel. This never leaves your device, and clearing your browser data removes it.') +
      sec('Analytics', 'We use Google Analytics to understand which exams are being used and where the tool is failing. It records page views, approximate region, device type and referring site. It does not receive your images or the contents of any form field. You can block it with any standard content blocker without affecting the tool.') +
      sec('Advertising', 'Some pages carry advertising to keep the tool free. We use Google AdSense. Google and its partners, as third-party vendors, use cookies (including the DoubleClick cookie) to serve ads based on your visits to this and other websites. You can opt out of personalised advertising in <a href="https://adssettings.google.com" rel="noopener noreferrer">Google Ads Settings</a> or at <a href="https://www.aboutads.info" rel="noopener noreferrer">aboutads.info</a>. Read how Google uses data from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>. We do not share any information about your images with advertisers, because your images never leave your browser.') +
      sec('Third-party links', 'The site links to official recruitment portals, notification PDFs and job listings. Those sites have their own privacy practices, and this policy does not cover them.') +
      sec('Children', 'The tool is intended for people applying to examinations and is not directed at children under 13. We do not knowingly collect personal information from them.') +
      sec('Your choices', 'Because we hold no account and no image data, there is no profile to export or delete on our side. To remove local preferences, clear site data for this domain in your browser settings. For anything else, write to hello@photoresizer.click.') +
      sec('Changes', 'If this policy changes materially, the updated date at the top of this page will change and the revised version will be posted here.'),
    '18 July 2026',
  ),
  '/terms': page(
    'Terms of use',
    'Plain terms for a free tool: use it for lawful purposes, and check the official notification before you submit.',
    sec('Using the tool', 'PhotoResizer is provided free of charge for personal use in preparing images for examination and recruitment forms. You may use it as often as you like. You may not resell access to it, present it as your own service, or use automated means to overload it.') +
      sec('Your content', 'You keep every right in the images you process. Because processing happens in your browser, we never receive them and therefore claim no licence over them. You are responsible for having the right to use any image you upload, and for the accuracy of anything you submit to a recruitment portal.') +
      sec('No affiliation, no guarantee',
        'PhotoResizer is an independent tool. It is not affiliated with, endorsed by, or operated by UPSC, SSC, IBPS, RRB, any State Public Service Commission, or any other recruitment body. Names of examinations are used only to identify the requirements published for them.',
        'The size presets are transcribed from official notifications and are checked periodically, but notifications are revised and portals sometimes apply additional rules. The tool cannot guarantee that a given portal will accept a given file. Always read the notification you are applying under, and verify the output before you submit it. We are not responsible for a rejected application, a missed deadline, or any loss arising from use of the tool.') +
      sec('Availability', 'The service is offered as-is and as-available. We may change, suspend or discontinue any part of it, including individual presets and tools, without notice.') +
      sec('Limitation of liability', 'To the maximum extent permitted by law, our liability arising out of or relating to your use of the site is limited to zero, reflecting the fact that the service is provided free of charge. Nothing here excludes liability that cannot lawfully be excluded.') +
      sec('Governing law', 'Any dispute relating to these terms is subject to the laws of India.') +
      sec('Contact', 'Questions about these terms can be sent to hello@photoresizer.click.'),
    '18 July 2026',
  ),
};

let n = 0;
for (const route of routes) {
  const url = `${SITE}${route.path}`;
  const t = esc(route.title);
  const d = esc(route.description);
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${d}" />`);
  if (route.keywords) html = html.replace(/<meta name="keywords"[^>]*>/, `<meta name="keywords" content="${esc(route.keywords)}" />`);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${d}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta property="twitter:title"[^>]*>/, `<meta property="twitter:title" content="${t}" />`);
  html = html.replace(/<meta property="twitter:description"[^>]*>/, `<meta property="twitter:description" content="${d}" />`);
  if (route.noindex) html = html.replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow" />');
  if (PAGE_BODIES[route.path]) {
    html = html.replace(/<main class="seo-fallback">[\s\S]*?<\/main>/, () => PAGE_BODIES[route.path]);
  }

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
    '<meta name="description" content="That page does not exist. The photo and signature resizers and the exam size guides are all still here." />',
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
        </ul>
      </main>`,
  );

writeFileSync(join(DIST, '404.html'), notFound);
console.log('prerendered 404.html (noindex)');

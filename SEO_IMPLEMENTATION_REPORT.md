# SEO implementation report — Photo Resizer

Implemented 2026-10-04 on branch `claude/seo-toolkit`.

## What was added

| File | Purpose |
|---|---|
| `scripts/seo-validate.mjs` | Zero-dependency validator for the build output: titles, descriptions, duplicates, canonicals, robots/googlebot directives, headings, Open Graph/Twitter, images without `alt`, JSON-LD validity and pitfalls, sitemap consistency (noindex pages, missing files, wrong host, collapse), broken internal links, orphan pages, `robots.txt`, `ads.txt`, important pages being indexable. Exit code 1 on errors. |
| `scripts/gsc-analyze.mjs` | Reads Search Console CSV exports and writes `reports/gsc-opportunities.md`: branded vs non-branded, low-CTR, positions 5–20, zero-click, question and long-tail queries, declining pages (with a previous export), cannibalisation and intent mismatches (with `QueryPage.csv`). |
| `scripts/seo-report.mjs` | Builds a self-contained local dashboard `reports/seo-dashboard.html` from the two reports. No server, no credentials, not deployed. |
| `seo.config.json` | Origin, build folder, important pages, sitemap floor, brand terms. |
| `.github/workflows/seo.yml` | Runs the validator in CI on every PR and on `main`. |
| `SEO_*.md` | These four documents. |
| `package.json` | `seo:validate`, `seo:gsc`, `seo:report` scripts. |
| `.gitignore` | `reports/` and `seo-data/` (generated output and private exports) are not committed. |

## Site changes in this pass

- `public/nicl-photo-signature-size.html`: `<title>` shortened.

## Validation

Command: `npm run build && node scripts/seo-validate.mjs`

- 75 pages scanned (35 indexable, 40 noindex), 35 sitemap URLs.
- **0 errors**, 0 warnings, 0 notes (full list in `SEO_AUDIT_REPORT.md`).
- Production build passes.
- Lighthouse (local baseline) is recorded in `SEO_AUDIT_REPORT.md`; no improvement is claimed from this PR because it does not change performance.

## Remaining technical issues

- The existing `scripts/seo-dashboard.mjs` checks the **live** site; the new `scripts/seo-validate.mjs` checks the **build output** in CI. They are complementary, not duplicates.
- ~135 KiB unused JavaScript and a 3,365-element DOM on the home page; code-split the heavy tools.
- Only 35 indexable pages: growth depends on adding genuinely distinct guides, not templated size variants.

## Search Console setup

1. Open <https://search.google.com/search-console> and add a **Domain** property for `photoresizer.click` (DNS TXT verification) so http/https/www variants are all covered. A URL-prefix property for `https://photoresizer.click/` also works.
2. **Sitemaps** → submit `https://photoresizer.click/sitemap.xml`. Status should read "Success"; compare "Discovered URLs" with the sitemap count above.
3. **Settings → Users and permissions**: add any tool/service account that needs read access.
4. **Pages (Indexing)**: for each excluded reason, compare with the intended `noindex` pages. "Crawled – currently not indexed" on a page you care about is a content-quality signal; improve the page, then use **URL Inspection → Request indexing** (about 10 per day).
5. Export data for the analyser: **Performance → Search results**, date range last 3–6 months, **Export → Download CSV**; unzip into `seo-data/current/`. For a decline comparison export the previous equal period into `seo-data/previous/`.
6. Run `npm run seo:gsc` (or `node scripts/gsc-analyze.mjs`), then `npm run seo:report` and open `reports/seo-dashboard.html`.
7. Optional: **Links**, **Core Web Vitals** and **Enhancements** (breadcrumbs, FAQ, etc.) should show no errors; fix any that appear.

## Recommended next steps

See `SEO_ACTION_PLAN_90_DAYS.md`.

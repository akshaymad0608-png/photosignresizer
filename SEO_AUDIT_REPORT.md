# SEO audit report — Photo Resizer

Audited 2026-10-04. Origin: https://photoresizer.click

## Scope and method

- **Stack:** Vite + React SPA with `prerender.mjs`, `scripts/generate-sitemap.mjs`, a live-site health script (`scripts/seo-dashboard.mjs`) and exam-vacancy injection; deployed on Vercel (a duplicate Netlify copy was deleted).
- **Static validation:** `scripts/seo-validate.mjs` over the production build (what a crawler sees without running JavaScript).
- **Lab performance:** Lighthouse 12 (mobile preset, simulated throttling), Chromium headless, against a plain local static server serving the build. A plain `python3 -m http.server` does **not** gzip/brotli, so the "enable text compression" findings and the absolute LCP are pessimistic compared with production hosting. Treat the numbers as a baseline to compare against after changes, not as field data.
- **Not verified here:** indexing status, rankings and Core Web Vitals field data (INP is only measurable in the field). Those come from Search Console.
- Search Console data for this property is not available to the tooling in this environment; use the CSV workflow.

## Results at a glance

| Pages built | Indexable | `noindex` | Sitemap URLs | Errors | Warnings | Notes |
|---|---|---|---|---|---|---|
| 75 | 35 | 40 | 35 | 0 | 0 | 0 |

### Validator findings (after this PR's fixes)

_No findings._

### Lighthouse (mobile, local baseline)

| Category | Score |
|---|---|
| Performance | 79 |
| Accessibility | 97 |
| Best practices | 96 |
| SEO | 100 |

Lab metrics (home page): LCP **3.5 s**, FCP 3.5 s, TBT 240 ms, CLS 0.

## Issues found and fixed so far

- Earlier work (PRs #8–#9) set the 40 tool/templated guide pages to `noindex`, cut the sitemap from 75 to 35 URLs and added a `noindex` header to the duplicate Netlify deploys (which were later deleted).
- This pass: shortened the `/nicl-photo-signature-size` title from 69 to under 65 characters.

## Issues still open

- The existing `scripts/seo-dashboard.mjs` checks the **live** site; the new `scripts/seo-validate.mjs` checks the **build output** in CI. They are complementary, not duplicates.
- ~135 KiB unused JavaScript and a 3,365-element DOM on the home page; code-split the heavy tools.
- Only 35 indexable pages: growth depends on adding genuinely distinct guides, not templated size variants.

## What this audit deliberately does not claim

- No ranking, traffic or indexing improvement is promised. Rankings depend on content quality, links and competition.
- Structured data uses only facts visible on the site; no review/rating markup is emitted without real reviews.

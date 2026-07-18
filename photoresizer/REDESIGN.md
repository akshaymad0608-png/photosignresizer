# PhotoResizer — redesign notes

## Design direction: "Ink & Measure"

The old site was a generic red/blue SaaS layout. The new one takes its language
from the thing the product actually serves: an Indian government exam form.

- **Palette** — fountain-pen indigo (`#101a33`) on ledger paper (`#edf0f6`),
  with rani pink (`#d6006e`) as the single action colour. Pass/warn/fail states
  are green / amber / red and are used *only* for verdicts, never decoration.
  Dark mode is the same ink inverted (`#080d1a` paper, `#ff3d96` signal).
- **Type** — Bricolage Grotesque for display, IBM Plex Sans for body (with Noto
  Sans Devanagari for Hindi), IBM Plex Mono for every number. Since this whole
  product is dimensions and file sizes, the numbers get their own face.
- **Signature element** — the **requirement sheet**: a tear-off docket with a
  perforated edge and dotted-leader spec rows, restating the exam's limits the
  way an admit card would. It is the sticky left rail on desktop.
- **Hero** — a live dimension callout with caliper marks, redrawn from whichever
  exam is selected, so the page opens by stating the reader's actual problem
  rather than a generic value proposition.

All colours are CSS custom properties, so dark mode is a variable swap. No
`dark:` variants are needed in markup any more.

## New features

| Feature | Where |
|---|---|
| Form checks — dimensions, file size, sharpness (Laplacian variance), exposure, background uniformity, signature ink contrast | `utils/analyze.ts`, `components/ComplianceChecklist.tsx` |
| File-size band gauge showing the accepted window as a tolerance zone | `components/SizeGauge.tsx` |
| Searchable exam picker that also matches on numbers ("350x450", "50kb") | `components/ExamDropdown.tsx` |
| Unit switcher — px / mm / cm / inch with adjustable DPI | `components/SpecTicket.tsx`, `utils/units.ts` |
| Photo + signature combined into one JPG | `utils/sheets.ts` |
| 4×6 inch print sheet at 300 DPI, true size, with cut guides | `utils/sheets.ts` |
| Working English / Hindi toggle (the Hindi strings existed but were unreachable) | `components/Navbar.tsx`, `constants.ts` |
| Drag-and-drop and clipboard paste for uploads | `components/ImageUploader.tsx` |
| Ctrl/Cmd + Enter to process | `pages/Home.tsx` |
| Last-used exam, language and theme remembered | `pages/Home.tsx` |
| No-flash dark mode (theme applied before first paint) | `index.html` |

## Bugs fixed

A previous find-and-replace pass (`fix-colors.cjs`, `simplify-colors.cjs`) had
stripped words out of class names and left broken fragments across 30 files:

- `backdrop-` with no value — every blur on the site was dead
- `bg-gradient-` with no direction, and `dark:` with no class after it
- orphaned `100px]` from deleted `blur-[100px]`
- `hover:shadow-sm hover:shadow-sm hover:shadow-sm` repeated up to three times
- broken links: `/tools/jpg-`, `/tools/pdf-`
- invisible controls: white text on a white card in the share widget, the
  newsletter button, the tool-category icons (their colours had been emptied)

Those scripts have been deleted so they cannot run again. Orphaned components
(`Header.tsx`, `StepCard.tsx`) were removed.

## Accessibility

Visible focus rings, `prefers-reduced-motion` respected, `aria-expanded` /
`aria-pressed` / `aria-current` on interactive controls, and the layout is
usable down to 320px.

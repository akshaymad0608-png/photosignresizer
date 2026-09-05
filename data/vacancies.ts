/**
 * Vacancy listings.
 *
 * IMPORTANT — how links work here:
 * Every URL below must be a real, official portal. If a link is unknown, leave
 * the field OUT entirely rather than using "#" or a guess. The UI renders a
 * missing link as plain, non-clickable text with a "Link soon" badge, so a
 * blank field degrades honestly instead of producing a dead link.
 *
 * `portal` is the board's official homepage and is used as a safe fallback.
 * `apply` / `result` / `admitCard` should point at the specific notification
 * page when you have it — these are DIFFERENT pages and must not be shared.
 */

export type VacancyCategory = 'Central Govt' | 'State Govt' | 'Banking' | 'Railway' | 'Defence';

/** Date this list was last checked against public listings. Shown in the UI. */
export const AS_OF = '5 September 2026';

export interface Vacancy {
  id: string;
  board: string;
  post: string;
  vacancies: string;
  lastDate: string;
  qualification: string;
  category: VacancyCategory;
  state: string;
  /** Official board homepage — safe fallback when a specific page is unknown. */
  portal?: string;
  /** True when the post, count and last date were checked against public
   *  listings on AS_OF. False/absent means the entry is unverified legacy data. */
  verified?: boolean;
  links?: {
    apply?: string;
    result?: string;
    admitCard?: string;
  };
}

export const VACANCIES: Vacancy[] = [
  // ---- Verified against public listings on 14 August 2026 -----------------

  {
    id: 'v-railway-section',
    board: 'RRB',
    post: 'Section Controller',
    vacancies: '119',
    lastDate: '14-Aug-2026',
    qualification: 'Graduate',
    category: 'Railway',
    state: 'All India',
    verified: true,
    portal: 'https://www.rrbapply.gov.in/',
    links: { apply: 'https://www.rrbapply.gov.in/' },
  },
  {
    id: 'v-rrc-cr-sports',
    board: 'RRC Central Railway',
    post: 'Sports Quota',
    vacancies: '59',
    lastDate: '14-Aug-2026',
    qualification: 'Various',
    category: 'Railway',
    state: 'Maharashtra',
    verified: true,
    portal: 'https://www.rrccr.com/',
  },
  {
    id: 'v-nfr-apprentice',
    board: 'Northeast Frontier Railway (NFR)',
    post: 'Act Apprentice',
    vacancies: '6777',
    lastDate: '19-Aug-2026',
    qualification: '10th / ITI',
    category: 'Railway',
    state: 'North East',
    verified: true,
    portal: 'https://nfr.indianrailways.gov.in/',
  },

  // ---- Gujarat: read off ojas.gujarat.gov.in on 19 August 2026 ------------
  // Post names and last dates come straight from the OJAS advertisement table,
  // which is the official portal for these boards — so `verified` is set.
  // Neither the table nor the board pages state a vacancy count or a
  // qualification for these three, so both read "As per notification" rather
  // than carrying a number nobody published.
  {
    id: 'v-seb-htat',
    board: 'SEB',
    post: 'Head Teachers Aptitude Test (HTAT) — promotion to Head Teacher',
    vacancies: 'Multiple',
    lastDate: '25-Aug-2026',
    qualification: 'As per notification',
    category: 'State Govt',
    state: 'Gujarat',
    verified: true,
    portal: 'https://ojas.gujarat.gov.in/',
  },
  {
    id: 'v-gsssb-municipal-accountant',
    board: 'GSSSB',
    post: 'Municipal Accountant',
    vacancies: 'Multiple',
    lastDate: '21-Aug-2026',
    qualification: 'As per notification',
    category: 'State Govt',
    state: 'Gujarat',
    verified: true,
    portal: 'https://ojas.gujarat.gov.in/',
  },
  {
    id: 'v-gsssb-sanitary-inspector',
    board: 'GSSSB',
    post: 'Sanitary Inspector',
    vacancies: 'Multiple',
    lastDate: '31-Aug-2026',
    qualification: 'As per notification',
    category: 'State Govt',
    state: 'Gujarat',
    verified: true,
    portal: 'https://ojas.gujarat.gov.in/',
  },

  // ---- From a third-party listing, 19 August 2026 -------------------------
  // Dates below were copied from an aggregator, not read off the board's own
  // site, so `verified` is deliberately omitted and the UI marks them as
  // needing confirmation. Only boards whose official portal was already known
  // here are included — the rest are left out rather than linked on a guess.
  {
    id: 'v-rrb-je-cen04',
    board: 'RRB',
    post: 'Junior Engineer (CEN 04/2026)',
    vacancies: '4029', // was 3993; revised count per FreeJobAlert, 4 Sep 2026
    lastDate: '13-Sep-2026',
    qualification: 'As per notification',
    category: 'Railway',
    state: 'All India',
    portal: 'https://www.rrbapply.gov.in/',
  },
  {
    id: 'v-mpesb-patwari',
    board: 'MPESB',
    post: 'Group 2 Sub Group 4 — Patwari and other posts',
    vacancies: 'Multiple',
    lastDate: '23-Aug-2026',
    qualification: 'As per notification',
    category: 'State Govt',
    state: 'Madhya Pradesh',
    portal: 'https://esb.mp.gov.in/',
  },
  {
    id: 'v-mpesb-sub-engineer',
    board: 'MPESB',
    post: 'Group 3 Sub Engineer and other posts',
    vacancies: 'Multiple',
    lastDate: '01-Sep-2026',
    qualification: 'As per notification',
    category: 'State Govt',
    state: 'Madhya Pradesh',
    portal: 'https://esb.mp.gov.in/',
  },
  {
    id: 'v-uppsc-asst-professor-gdc',
    board: 'UPPSC',
    post: 'Assistant Professor GDC (Mains)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'As per notification',
    category: 'State Govt',
    state: 'Uttar Pradesh',
    portal: 'https://uppsc.up.nic.in/',
  },

  // ---- Major recurring national exams (added 04 Aug 2026) -----------------
  // Not checked against a live listing, so `verified` is intentionally omitted
  // and counts/dates read "As per notification" — every entry links to the
  // official portal where the current notification, count and last date live.
  {
    id: 'v-ssc-cgl',
    board: 'SSC',
    post: 'Combined Graduate Level (CGL)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://ssc.gov.in/',
  },
  {
    id: 'v-ssc-chsl',
    board: 'SSC',
    post: 'Combined Higher Secondary Level (CHSL, 10+2)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://ssc.gov.in/',
  },
  {
    id: 'v-ssc-mts',
    board: 'SSC',
    post: 'Multi Tasking Staff (MTS) & Havaldar',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10th',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://ssc.gov.in/',
  },
  {
    // New entry — not tracked before. From FreeJobAlert (4 Sep 2026), not yet
    // checked against ssc.gov.in directly.
    id: 'v-ssc-je',
    board: 'SSC',
    post: 'Junior Engineer (JE)',
    vacancies: '1748',
    lastDate: '22-Sep-2026',
    qualification: 'Diploma/Degree in Engineering',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://ssc.gov.in/',
  },
  {
    id: 'v-ssc-gd',
    board: 'SSC',
    post: 'General Duty (GD) Constable — CAPF · notification due 30 Sep 2026',
    vacancies: 'To be announced',
    lastDate: 'As per notification',
    qualification: '10th',
    category: 'Central Govt',
    state: 'All India',
    verified: true,
    portal: 'https://ssc.gov.in/',
  },
  {
    id: 'v-rrb-ntpc',
    board: 'RRB',
    post: 'Non-Technical Popular Categories (NTPC)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th / Graduate',
    category: 'Railway',
    state: 'All India',
    portal: 'https://indianrailways.gov.in/',
    links: { apply: 'https://www.rrbapply.gov.in/' },
  },
  {
    id: 'v-rrb-groupd',
    board: 'RRB',
    post: 'Group D (Level 1)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10th / ITI',
    category: 'Railway',
    state: 'All India',
    portal: 'https://indianrailways.gov.in/',
    links: { apply: 'https://www.rrbapply.gov.in/' },
  },
  {
    id: 'v-sbi-po',
    board: 'SBI',
    post: 'Probationary Officer (PO)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://sbi.co.in/web/careers',
  },
  {
    id: 'v-sbi-clerk',
    board: 'SBI',
    post: 'Junior Associate (Customer Support & Sales) — 7680 regular + 1444 backlog',
    vacancies: '9124',
    lastDate: '31-Aug-2026',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    verified: true,
    portal: 'https://sbi.bank.in/web/careers/current-openings',
    links: { apply: 'https://sbi.bank.in/web/careers/current-openings' },
  },
  {
    id: 'v-ibps-clerk',
    board: 'IBPS',
    post: 'Customer Service Associate — Clerk (CRP CSA-XVI), 11 public sector banks',
    vacancies: '11403',
    lastDate: '21-Aug-2026',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    verified: true,
    portal: 'https://www.ibps.in/',
    links: { apply: 'https://www.ibps.in/' },
  },
  {
    id: 'v-ibps-rrb',
    board: 'IBPS',
    // Notification is out — was "due Sep 2026" / "To be announced". Post name,
    // count and date below are from FreeJobAlert (4 Sep 2026), not yet checked
    // against ibps.in directly, so `verified` is left off rather than kept
    // true from the old, weaker claim.
    post: 'RRB CRP XV — Officer & Office Assistant',
    vacancies: '13706',
    lastDate: '21-Sep-2026',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://www.ibps.in/',
  },
  {
    id: 'v-rbi-assistant',
    board: 'RBI',
    post: 'Assistant',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://www.rbi.org.in/',
    links: { apply: 'https://opportunities.rbi.org.in/' },
  },

  // ---- Insurance PSUs (added 19 Aug 2026) --------------------------------
  // Portals confirmed by loading each site on that date. NICL and NIACL are
  // two different companies that both recruit AOs and Assistants — National
  // Insurance Company Limited and The New India Assurance Company Limited —
  // and are listed separately so their recruitment pages do not get crossed.
  // Recurring exams, so no fixed date is claimed.
  {
    id: 'v-lic-aao-ado',
    board: 'LIC',
    post: 'AAO / ADO (Assistant Administrative Officer, Apprentice Development Officer)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://licindia.in/web/guest/careers',
  },
  {
    id: 'v-nicl-ao-assistant',
    board: 'NICL',
    post: 'Administrative Officer (AO) & Assistant',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://nationalinsurance.nic.co.in/recruitment',
  },
  {
    id: 'v-niacl-ao-assistant',
    board: 'NIACL',
    post: 'Administrative Officer (AO) & Assistant',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'Banking',
    state: 'All India',
    portal: 'https://www.newindia.co.in/recruitment/list',
  },
  {
    id: 'v-indiapost-gds',
    board: 'India Post',
    // Was "Multiple" / "As per notification" — real count and date below are
    // from FreeJobAlert (4 Sep 2026), not yet checked against indiapost.gov.in
    // directly.
    post: 'Gramin Dak Sevak (GDS)',
    vacancies: '23757',
    lastDate: '21-Sep-2026',
    qualification: '10th',
    category: 'Central Govt',
    state: 'All India',
    portal: 'https://www.indiapost.gov.in/',
    links: { apply: 'https://indiapostgdsonline.gov.in/' },
  },
  {
    id: 'v-iaf-agniveer',
    board: 'Indian Air Force',
    post: 'Agniveer Vayu',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10+2',
    category: 'Defence',
    state: 'All India',
    portal: 'https://indianairforce.nic.in/',
    links: { apply: 'https://agnipathvayu.cdac.in/' },
  },

  // ---- State government exams (added 05 Aug 2026) --------------------------
  // Unverified against a live listing — counts/dates read "As per notification"
  // and each links to the official state board where current details live.
  {
    id: 'v-uppsc-pcs',
    board: 'UPPSC',
    post: 'Combined State / Upper Subordinate Services (PCS)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Uttar Pradesh',
    portal: 'https://uppsc.up.nic.in/',
  },
  {
    id: 'v-uppolice-constable',
    board: 'UP Police (UPPRPB)',
    post: 'Constable',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th',
    category: 'State Govt',
    state: 'Uttar Pradesh',
    portal: 'https://uppbpb.gov.in/',
  },
  {
    id: 'v-bpsc-cce',
    board: 'BPSC',
    post: 'Combined Competitive Exam (CCE)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Bihar',
    portal: 'https://bpsc.bih.nic.in/',
  },
  {
    id: 'v-biharpolice-constable',
    board: 'Bihar Police (CSBC)',
    post: 'Constable',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th',
    category: 'State Govt',
    state: 'Bihar',
    portal: 'https://csbc.bih.nic.in/',
  },
  {
    id: 'v-mppsc-sse',
    board: 'MPPSC',
    post: 'State Service Examination',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Madhya Pradesh',
    portal: 'https://mppsc.mp.gov.in/',
  },
  {
    id: 'v-mp-esb-police',
    board: 'MP Police (ESB)',
    post: 'Constable',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '12th',
    category: 'State Govt',
    state: 'Madhya Pradesh',
    portal: 'https://esb.mp.gov.in/',
  },
  {
    id: 'v-rpsc-ras',
    board: 'RPSC',
    post: 'RAS — State & Subordinate Services',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Rajasthan',
    portal: 'https://rpsc.rajasthan.gov.in/',
  },
  {
    id: 'v-mpsc-rajyaseva',
    board: 'MPSC',
    post: 'Rajyaseva (State Services)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Maharashtra',
    portal: 'https://mpsc.gov.in/',
  },
  {
    id: 'v-wbpsc-wbcs',
    board: 'WBPSC',
    post: 'WBCS (Executive)',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'West Bengal',
    portal: 'https://wbpsc.gov.in/',
  },
  {
    id: 'v-tnpsc-group',
    board: 'TNPSC',
    post: 'Group I / II / IV Services',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate / 10th+',
    category: 'State Govt',
    state: 'Tamil Nadu',
    portal: 'https://www.tnpsc.gov.in/',
  },
  {
    id: 'v-kpsc-kas',
    board: 'KPSC',
    post: 'KAS — Gazetted Probationers',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: 'Graduate',
    category: 'State Govt',
    state: 'Karnataka',
    portal: 'https://www.kpsc.kar.nic.in/',
  },
  {
    id: 'v-rajpolice-constable',
    board: 'Rajasthan Police',
    post: 'Constable',
    vacancies: 'Multiple',
    lastDate: 'As per notification',
    qualification: '10th / 12th',
    category: 'State Govt',
    state: 'Rajasthan',
    portal: 'https://police.rajasthan.gov.in/',
  },
];

/** Resolve the best available URL for a given link kind. */
export function resolveLink(job: Vacancy, kind: 'apply' | 'result' | 'admitCard') {
  const specific = job.links?.[kind];
  if (specific) return { href: specific, exact: true };
  if (job.portal) return { href: job.portal, exact: false };
  return null;
}

/** Parse "22-Jul-2026" into a Date so deadlines can be compared. */
export function parseLastDate(value: string): Date | null {
  const m = /^(\d{2})-([A-Za-z]{3})-(\d{4})$/.exec(value.trim());
  if (!m) return null;
  const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  const month = months.indexOf(m[2].toLowerCase());
  if (month < 0) return null;
  return new Date(Number(m[3]), month, Number(m[1]));
}

/** True when the last date has already passed. */
export function isExpired(job: Vacancy, now = new Date()): boolean {
  const d = parseLastDate(job.lastDate);
  if (!d) return false;
  return d.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}
